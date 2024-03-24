import { connectDB, insertDocument } from '../../helpers/db-util';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
            return;
        }

        let client;

        try {
            client = await connectDB();
        } catch (error) {
            res.status(500).json({ message: 'Failed to connect to the database.' });
            return;
        }

        try {
            await insertDocument(client, 'newsletter', { email });
            client.close();
        } catch (error) {
            res.status(500).json({ message: 'Failed to insert data.' });
            return;
        }

        res.status(201).json({ message: 'Signed up!' });
    }
};

export default handler;
