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

const handler = (req, res) => {
    const { eventId } = req.query;

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (isDataInvalid(email, name, text)) {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }

        const newComment = {
            id: new Date().toISOString(),
            email,
            name,
            text
        };

        res.status(201).json({ message: 'Comment added!', newComment });
    }

    if (req.method === 'GET') {
        const dummyComments = [
            { id: 'c1', name: 'test1', text: 'test text 1' },
            { id: 'c2', name: 'test2', text: 'test text 2' }
        ];

        res.status(200).json({ comments: dummyComments });
    }
};

export default handler;
