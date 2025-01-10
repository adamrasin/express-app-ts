import express, { Request, Response } from 'express';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  available: boolean;
}

const app = express();
const port = 3000;

app.use(express.json());

let books: Book[] = [];

app.get('/books', (req: Request, res: Response) => {
  res.json(books);
});

app.post('/books', (req: Request, res: Response) => {
  const { title, author, year, available } = req.body;

  if (!title || !author || typeof year !== 'number' || typeof available !== 'boolean') {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const newBook: Book = {
    id: books.length + 1,
    title,
    author,
    year,
    available,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.get('/books/:id', (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
});

app.put('/books/:id', (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const { title, author, year, available } = req.body;

  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (!title || !author || typeof year !== 'number' || typeof available !== 'boolean') {
    return res.status(400).json({ message: 'Invalid data' });
  }

  books[bookIndex] = { id: bookId, title, author, year, available };
  res.json(books[bookIndex]);
});

app.delete('/books/:id', (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
