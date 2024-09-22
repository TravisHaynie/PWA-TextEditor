import { openDB } from 'idb';

// Initialize the IndexedDB
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

// Logic to add content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  
  // Open the jate database
  const jateDb = await openDB('jate', 1);

  // Create a transaction with readwrite access
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open the jate object store
  const store = tx.objectStore('jate');

  // Add or update the content in the object store
  const request = store.put({ content });

  // Get the result from the request
  const result = await request;
  console.log('Data saved to the database', result);
};

// Logic to retrieve all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open the jate database
  const jateDb = await openDB('jate', 1);

  // Create a transaction with readonly access
  const tx = jateDb.transaction('jate', 'readonly');

  // Open the jate object store
  const store = tx.objectStore('jate');

  // Get all the content from the object store
  const request = store.getAll();

  // Get the result from the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

// Initialize the database
initdb();
