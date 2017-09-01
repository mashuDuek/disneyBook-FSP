import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { createFriendship } from './actions/friendship_actions';


document.addEventListener('DOMContentLoaded', () => {

  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser }};
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.createFriendship = createFriendship;


  window.store = store;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});


// ASK TOMMY
// - HANDLING ERRORS
// - ENTIRE USER ON THE FRONTEND ?
// - FRIENDSHIPS ?
// checlk friendship routes
// COVER PHOTO GOES BEHIND NAV BAR
