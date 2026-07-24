import { createRoot } from 'react-dom/client';

import App from './App';

import './index.css';
import { registerServiceWorker } from './registerServiceWorker';

createRoot(document.getElementById('root')!).render(<App />);

// Register Service Worker for offline availability and performance in low-connectivity areas
registerServiceWorker();
