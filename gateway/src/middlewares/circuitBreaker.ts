import { IncomingMessage } from 'http';

export const withCircuitBreaker = async (
  handler: () => Promise<IncomingMessage>
): Promise<{ data: string; status: number }> => {
  try {
    const proxyRes = await handler();

    // Leer los datos del flujo de IncomingMessage
    const data = await new Promise<string>((resolve, reject) => {
      let body = '';
      proxyRes.on('data', (chunk) => (body += chunk));
      proxyRes.on('end', () => resolve(body));
      proxyRes.on('error', (err) => reject(err));
    });

    return {
      data, // Contenido del cuerpo como string
      status: proxyRes.statusCode || 500, // Código de estado HTTP
    };
  } catch (error) {
    console.error('Error en Circuit Breaker:', error);
    throw error;
  }
};
