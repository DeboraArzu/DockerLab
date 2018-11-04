import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Products from './components/Products/Products';
import About from './components/About/About';
import Home from './components/Home/Home';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Redirect from="/" to="home" />
            <Route component={App} />
            <Route path={"/home"} component={Home} />
        </div>
        <div className="products"><Route path={"/Products"} component={Products} /></div>
        <div className="about"><Route path={"/About"} component={About} /></div>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
