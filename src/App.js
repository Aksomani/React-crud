import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Create from './components/create/Create';
import Read from './components/read/Read';
import Update from './components/update/Update';
import Login from './components/Login';

function App() {
  return (
    <Router>
          <Routes>
           <Route path='/' element={<Login/>}/>
            <Route path='/read' element={<Read/>}/>
            <Route path='/create' element={<Create/>}/>
            <Route path='/update' element={<Update/>}/>
          </Routes>
        
    
    </Router>
    
  );
  
}

export default App;
