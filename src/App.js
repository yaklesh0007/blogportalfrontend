
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Body from './Body/Body'

function App() {
  return (
    <Router>
    <div classNameName="App">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
    </Router>
  );
}

export default App;
