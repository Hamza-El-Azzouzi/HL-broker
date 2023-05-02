
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import NavBar from './includes/NavBar';
import Footer from './includes/Footer';
import HomePage from './HomePage';
import HomeVendeur from './Vendeur/HomeVendeur';


export default function App() {



  window.addEventListener("scroll", function () {
    const search = document.querySelector(".navbar")
    search.classList.toggle("active", window.scrollY > 100)
  })

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <NavBar />
      </nav>
      <>
        <BrowserRouter>
          <Switch>
            <Route path='/Home' index>{<HomePage/>}</Route>
            <Route path='/HomeVendeur'>{<HomeVendeur />}</Route>
          </Switch>
        </BrowserRouter>

      </>


      <footer>
        <Footer />
      </footer>

    </div>
  );
}


