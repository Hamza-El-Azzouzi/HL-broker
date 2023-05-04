import { Link ,BrowserRouter} from 'react-router-dom'
export default function NavBar() {

  return (
    <>
    <BrowserRouter>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">Go</button>
        </div>
        <div className='link-profile'>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href='/'><li className='bi bi-cart'></li> Panier</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='login'><li className='bi bi-person-add'></li> Se Connecter</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </BrowserRouter>
    </>


  )
}