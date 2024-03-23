import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
            return;
        }

        const client = await MongoClient.connect('mongodb+srv://ericDB:ewh2elgoTw8jabyH@cluster0.lidjonx.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0');
        const db = client.db();

        await db.collection('newsletter').insertOne({ email });

        client.close();

        res.status(201).json({ message: 'Signed up!' });
    }
};

export default handler;
