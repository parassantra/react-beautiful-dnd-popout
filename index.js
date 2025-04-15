// @flow

import { createRoot } from 'react-dom/client';
import Index from './pages/index';
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Index />);
}
