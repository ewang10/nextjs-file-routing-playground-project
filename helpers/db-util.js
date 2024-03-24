import { MongoClient } from 'mongodb';

const connectDB = async () => {
    const client = await MongoClient.connect('mongodb+srv://ericDB:ewh2elgoTw8jabyH@cluster0.lidjonx.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0');

    return client;
};

const insertDocument = async (client, collection, document) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);

    return result;
};

const getAllDocuments = async (client, collection, sort, filter = {}) => {
    const db = client.db();
    const documents = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .toArray();

    return documents;
};

export {
    connectDB,
    insertDocument,
    getAllDocuments
};
