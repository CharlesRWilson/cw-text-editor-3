import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');

  // Establish a connection to the 'jate' database with version 1.
const jateDb = await openDB('jate', 1);

// Initiate a new transaction with read and write permissions on the 'jate' database.
const tx = jateDb.transaction('jate', 'readwrite');

// Access the 'jate' object store.
const store = tx.objectStore('jate');

// Add the content to the store with the specified ID.
const request = store.put({ content: content, id: 1 });

// Await the result of the add operation.
const result = await request;
console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  console.log('GET from the database');

  // Establish a connection to the 'jate' database with version 1.
const jateDb = await openDB('jate', 1);

// Initiate a new transaction with read-only permissions on the 'jate' database.
const tx = jateDb.transaction('jate', 'readonly');

// Access the 'jate' object store.
const store = tx.objectStore('jate');

// Retrieve the data with ID 1 from the store.
const request = store.get(1);

// Await the result of the get operation.
const result = await request;
console.log('result.value', result);
return result?.content;
};

initdb();
