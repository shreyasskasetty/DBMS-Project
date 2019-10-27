import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
const settings = {timestampsInSnapshots: true};
var firebaseConfig = {
    apiKey: "AIzaSyDEFUaFT8Wqtg805wmCB5LiwA9s8z4TCf8",
    authDomain: "supermarket-942e6.firebaseapp.com",
    databaseURL: "https://supermarket-942e6.firebaseio.com",
    projectId: "supermarket-942e6",
    storageBucket: "supermarket-942e6.appspot.com",
    messagingSenderId: "638613966800",
    appId: "1:638613966800:web:b87c055097d2bf34a2f3d5",
    measurementId: "G-K5VD20EBCB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings(settings);
  export default firebase;