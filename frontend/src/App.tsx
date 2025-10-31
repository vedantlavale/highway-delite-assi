import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Details } from './components/Experiecnes';
import { Checkout } from './components/Checkout';
import { Result } from './components/Result';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;