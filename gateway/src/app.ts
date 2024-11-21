import express, { Application, Request, Response } from 'express';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { Signale } from 'signale';
import { config } from './config/config';
import { withCircuitBreaker } from './middlewares/circuitBreaker';

const app: Application = express();
const signale = new Signale();

app.use(morgan('dev'));
app.use(cors());
dotenv.config();

const PORT = config.port;

// Implementación de Circuit Breaker para los servicios
const proxyWithCircuitBreaker = (serviceURL: string) =>
    proxy(serviceURL, {
      proxyReqPathResolver: (req: Request) => req.originalUrl,
      userResDecorator: async (proxyRes, proxyResData) => {
        const result = await withCircuitBreaker(() => Promise.resolve(proxyRes));
        return result.data; // Devuelve los datos procesados como string
      },
    });
  

app.use('/api/v1/users', proxyWithCircuitBreaker(config.userServiceURL));
app.use('/api/v1/auth', proxyWithCircuitBreaker(config.authServiceURL));

app.listen(PORT, () => {
  signale.success(`API Gateway corriendo en http://localhost:${PORT}`);
});
