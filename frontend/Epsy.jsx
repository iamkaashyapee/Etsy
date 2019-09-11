import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from "./components/root";
import { fetchSearchProducts } from './actions/search_products_actions';


document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById('root');
    
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    // TESTING START
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // TESTING END

    ReactDOM.render(<Root store={store}/>, root);
    
});

window.fetchSearchProducts = fetchSearchProducts;