import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/firestore';

const { REACT_APP_CART_API_KEY, REACT_APP_CART_AUTH_DOMAIN, REACT_APP_CART_PROJECT_ID, REACT_APP_CART_STORAGE_BUCKET, REACT_APP_CART_MESSAGING_SENDER_ID, REACT_APP_CART_APP_ID } = process.env;
const firebaseConfig = {
  apiKey: REACT_APP_CART_API_KEY,
  authDomain: REACT_APP_CART_AUTH_DOMAIN,
  projectId: REACT_APP_CART_PROJECT_ID,
  storageBucket: REACT_APP_CART_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_CART_MESSAGING_SENDER_ID,
  appId: REACT_APP_CART_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);