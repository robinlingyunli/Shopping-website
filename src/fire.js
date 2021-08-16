import firebase from "firebase";

  var firebaseConfig = {
    apiKey: "AIzaSyDCvltDt9iM3VXKIQ4AV8wsuwukkhKI_tM",
    authDomain: "sports-apparel-store.firebaseapp.com",
    projectId: "sports-apparel-store",
    storageBucket: "sports-apparel-store.appspot.com",
    messagingSenderId: "282081221772",
    appId: "1:282081221772:web:96ce2dbe6b1c1d5e4cefa9"
  };
 
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;