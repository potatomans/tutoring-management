import ReactDOM from 'react-dom/client';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import { UserContextProvider } from './UserContext';
import { SuperUserContextProvider } from './SuperUserContext';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <SuperUserContextProvider>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </SuperUserContextProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

