 
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import App from './App'; 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( 
    <App /> 
); 
