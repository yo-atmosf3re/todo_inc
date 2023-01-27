import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom/client';
import { AppWithRedux } from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';


const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);
root.render(
   <Provider store={store}>
      <AppWithRedux />
   </Provider>

);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
