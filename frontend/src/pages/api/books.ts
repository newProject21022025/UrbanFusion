import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { bookId } = req.query; // отримуємо bookId з URL шляху

  try {
    const client = await clientPromise;
    const db = client.db('test-intl-redux');
    const booksCollection = db.collection('books');

    if (method === 'GET') {
      const books = await booksCollection.find({}).toArray();
      const parsedBooks = books.map(book => ({
        ...book,
        _id: book._id.toString(),
      }));
      return res.status(200).json(parsedBooks);
    }

    if (method === 'POST') {
      const { title, description, image } = req.body;
      const newBook = { title, description, image, createdAt: new Date() };
      const result = await booksCollection.insertOne(newBook);
      return res.status(201).json({ message: 'Книгу успішно додано', bookId: result.insertedId });
    }

    if (method === 'DELETE') {
      // Видалення книги за її ID
      if (!bookId) return res.status(400).json({ error: 'Book ID is required' });

      // Конвертуємо ID у правильний формат ObjectId
      const result = await booksCollection.deleteOne({ _id: new ObjectId(bookId as string) });

      if (result.deletedCount === 1) {
        return res.status(200).json({ message: 'Book deleted successfully' });
      } else {
        return res.status(404).json({ error: 'Book not found' });
      }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
