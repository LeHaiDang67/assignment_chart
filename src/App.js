import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js'
import {Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Route path='/' exact>
           <Home/>
      </Route>
    
    </div>
  );
}

export default App;
