import { MongoClient } from 'mongodb';

const isDataInvalid = (email, name, text) => {
    return (
        !email ||
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !text ||
        text.trim() === ''
    );
};

const handler = async (req, res) => {
    const { eventId } = req.query;

    const client = await MongoClient.connect('mongodb+srv://ericDB:ewh2elgoTw8jabyH@cluster0.lidjonx.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (isDataInvalid(email, name, text)) {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        };

        const result = await db.collection('comments').insertOne(newComment);

        newComment.id = result.insertedId;

        res.status(201).json({ message: 'Comment added!', newComment });
    }

    if (req.method === 'GET') {
        const documents = await db
        .collection('comments')
        .find()
        .sort({ _id: -1 })
        .toArray();

        res.status(200).json({ comments: documents });
    }
    
    client.close();
};

export default handler;
