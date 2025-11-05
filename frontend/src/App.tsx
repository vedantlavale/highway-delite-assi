import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient, persister } from './lib/queryClient';
import { Home } from './components/Home';
import { Details } from './components/Experiecnes';
import { Checkout } from './components/Checkout';
import { Result } from './components/Result';

function App() {
  return (
    <PersistQueryClientProvider 
      client={queryClient}
      persistOptions={{ 
        persister,
        maxAge: 24 * 60 * 60 * 1000, 
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}

export default App;