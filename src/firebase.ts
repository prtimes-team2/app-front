import { initializeApp } from 'firebase/app';
// import { connectAuthEmulator, getAuth } from 'firebase/auth';
// import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
// import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
// import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDMMy1h2Z7IwtoGKPFGHVdhB0-ueegbAFw',
  authDomain: 'prtimes-team-2.firebaseapp.com',
  projectId: 'prtimes-team-2',
  storageBucket: 'prtimes-team-2.appspot.com',
  messagingSenderId: '168321559176',
  appId: '1:168321559176:web:1ba7e578cadb6f9aeb8d3d',
};

export const app = initializeApp(firebaseConfig);

if (process.env.NODE_ENV === 'development') {
  //   const functions = getFunctions(app);
  //   const auth = getAuth(app);
  //   const store = getFirestore();
  //   const storage = getStorage();
  //   const db = getDatabase();
  //   connectFunctionsEmulator(functions, 'localhost', 5001);
  //   connectAuthEmulator(auth, 'http://localhost:9099');
  //   connectFirestoreEmulator(store, 'localhost', 8080);
  //   connectStorageEmulator(storage, 'localhost', 9199);
  //   connectDatabaseEmulator(db, 'localhost', 9000);
}

export const storage = getStorage(app);
