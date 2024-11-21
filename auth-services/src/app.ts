import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.post('/auth/login', (req: Request, res: Response): void => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password required.' });
    return; // Importante para evitar rutas no controladas
  }
  res.status(200).json({ token: 'fake-jwt-token', username });
});

app.get('/auth/status', (req: Request, res: Response): void => {
  res.status(200).json({ status: 'Authenticated' });
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
});
