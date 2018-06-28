import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDxTlIkdXOedjyWx5UNz4F3ebviPSUyxOE",
  authDomain: "nba-full-16b6c.firebaseapp.com",
  databaseURL: "https://nba-full-16b6c.firebaseio.com",
  projectId: "nba-full-16b6c",
  storageBucket: "nba-full-16b6c.appspot.com",
  messagingSenderId: "912870666678"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
  const data = [];

  snapshot.forEach( childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    })
  })

  return data;
}

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper
}