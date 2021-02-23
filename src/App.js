
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Body from './Body/Body'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
