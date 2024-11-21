import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get('/users', (req: Request, res: Response): void => {
  res.status(200).json({ users: [{ id: 1, name: 'John Doe' }] });
});

app.post('/users', (req: Request, res: Response): void => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'Name is required.' });
    return; // Evitar caminos no controlados
  }
  res.status(201).json({ id: Date.now(), name });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`User service running on http://localhost:${PORT}`);
});
