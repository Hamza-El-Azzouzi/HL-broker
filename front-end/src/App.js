
import './App.css';
import { BrowserRouter, Switch, Route , Redirect } from 'react-router-dom'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import NavBar from './includes/NavBar';
import Footer from './includes/Footer';
import HomePage from './HomePage';
import HomeVendeur from './Vendeur/HomeVendeur';
import NotFound from './Exception/Comp/404';
import { useState ,useEffect } from 'react';
import NotAuthorized from './Exception/Comp/403';



export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState({
    type : 'acheteur'
  });

  useEffect(() => {
    // Simulate authentication
    setIsLoggedIn({ type : 'vendeur'}); // Change this to false to simulate a 403 error
  }, []);
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
            <Route exact path='/' component={HomePage} index />
            {isLoggedIn.type === 'vendeur' ? ( <Route path='/HomeVendeur' component={HomeVendeur} />):
            (
              <NotAuthorized/>
            ) }
           
           <Route path="/NotFound" component={NotFound} />
            <Redirect to="/NotFound" />
          </Switch>
        </BrowserRouter>

      </>


      <footer>
        <Footer />
      </footer>

    </div>

  )
}




