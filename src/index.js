import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { ShowCartProvider } from './store/showCart-context';


const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <ShowCartProvider>
    <App />
  </ShowCartProvider>
);
