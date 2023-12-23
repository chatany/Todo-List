import logo from './logo.svg';
import './App.css';
import Login from './component/login';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Register from './component/Register';
import List from './component/list';

function App() {
  return (<>
  <BrowserRouter>
  <Routes>
    <Route path='/' Component={Login}></Route>
    <Route path='/register' Component={Register}></Route>
    <Route path='/list' Component={List}></Route>
    </Routes>
    </BrowserRouter>
  </> 
  );
}

export default App;
