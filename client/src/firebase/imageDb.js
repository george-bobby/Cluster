import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyDkVhiNAhOvQ0Cy1Him-2KYDwRHI2dgEtU",
//   authDomain: "cluster-2dcc1.firebaseapp.com",
//   projectId: "cluster-2dcc1",
//   storageBucket: "cluster-2dcc1.appspot.com",
//   messagingSenderId: "762247224471",
//   appId: "1:762247224471:web:a1e6fc464d4a03dbe15dd2",
//   measurementId: "G-FVZBVCWLKC"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC19wc5JvKg50qrMRJyCSum_BwM4P8AyBU",
  authDomain: "cluster-9e20e.firebaseapp.com",
  projectId: "cluster-9e20e",
  storageBucket: "cluster-9e20e.appspot.com",
  messagingSenderId: "391561948239",
  appId: "1:391561948239:web:023dabdda95f7599068e3a"
};


const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
