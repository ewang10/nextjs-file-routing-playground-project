import { connectDB, getAllDocuments, insertDocument } from '../../../helpers/db-util';

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
    let client;

    try {
        client = await connectDB();
    } catch (error) {
        res.status(500).json({ message: 'Failed to connect to the database.' });
        return;
    }

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (isDataInvalid(email, name, text)) {
            res.status(422).json({ message: 'Invalid input.' });
            client.close();
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        };
        let result;

        try {
            result = await insertDocument(client, 'comments', newComment);
            
            newComment._id = result.insertedId;

            res.status(201).json({ message: 'Comment added!', newComment });
        } catch (error) {
            res.status(500).json({ message: 'Failed to insert data.' });
        }
    }

    if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(client, 'comments', { _id: -1 }, { eventId });

            res.status(200).json({ comments: documents });
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch documents.' });
        }   
    }

    client.close();
};

export default handler;
