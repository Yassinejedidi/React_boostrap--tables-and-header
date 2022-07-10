import './App.css';
import Header from './Components/Header';
import Contenu from './Components/Contenu';
import { Routes, Route, BrowserRouter, Router } from "react-router-dom"
import Home from './Components/Home';



function App() {
  return (
    <div className='App'>


      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/client" element={<Contenu />} />

        </Routes>
      </BrowserRouter>


    </div>

  )
}

export default App;
