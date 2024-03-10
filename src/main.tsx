import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Используйте Provider из RTK Query
import App from './App.tsx'; // Поменяйте на ваш файл ProductPage.tsx
import { store } from './store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
