import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Detail from './pages/Detail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Home/>}/>
        <Route path='*' element={<NotFound/>}/>       
        <Route path='/pokemon/:name' element={<Detail/>}/>
      </Routes>
    </Router>
  );
}

export default App
