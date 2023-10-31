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
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.add({ content }); // Adding content to the database
    await tx.done;
    console.info('Content saved to IndexedDB');
  } catch (error) {
    console.error('Error saving to IndexedDB:', error);
  }
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const allItems = await store.getAll();
    
    // Assuming the content is stored in the latest record
    const latestItem = allItems[allItems.length - 1];
    return latestItem ? latestItem.content : null;
  } catch (error) {
    console.error('Error retrieving from IndexedDB:', error);
    return null;
  }
};

initdb();
