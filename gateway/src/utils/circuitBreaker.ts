/* 
Circuit Breaker:
Problema: Fallos recurrentes en servicios pueden colapsar el sistema.
Solución: Monitoreo y desconexión temporal para servicios fallidos.
*/

import { AxiosResponse } from 'axios';

interface CircuitBreakerState {
  failures: number;
  lastFailureTime: number;
}

const THRESHOLD = 3; // Máximo de fallos permitidos.
const TIMEOUT = 5000; // Tiempo de espera antes de reintentar.

const circuitBreakerState: CircuitBreakerState = {
  failures: 0,
  lastFailureTime: 0,
};

export const withCircuitBreaker = (fn: () => Promise<AxiosResponse<any>>) => {
  return async () => {
    const now = Date.now();

    // Verifica si el Circuit Breaker está abierto
    if (
      circuitBreakerState.failures >= THRESHOLD &&
      now - circuitBreakerState.lastFailureTime < TIMEOUT
    ) {
      return {
        status: 503,
        data: { message: 'Service unavailable. Circuit breaker is open.' },
      };
    }

    try {
      const response = await fn();
      // Reinicia el estado en caso de éxito
      circuitBreakerState.failures = 0;
      return response;
    } catch (error: any) {
      // Incrementa el contador de fallos
      circuitBreakerState.failures++;
      circuitBreakerState.lastFailureTime = now;
      return {
        status: 500,
        data: { message: 'Service call failed.', error: error.message },
      };
    }
  };
};
