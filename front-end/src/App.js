
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArticleCard from './Comp/ArticleCard';
import SlideCard from './Comp/SlideCard';


export default function App() {


  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Fashion",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Electronic",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Cars",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Home & Garden",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Gifts",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Music",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Health & Beauty",
    },
    {
      cateImg: "./images/category/cat8.png",
      cateName: "Pets",
    },
    {
      cateImg: "./images/category/cat9.png",
      cateName: "Baby Toys",
    },
    {
      cateImg: "./images/category/cat10.png",
      cateName: "Groceries",
    },
    {
      cateImg: "./images/category/cat11.png",
      cateName: "Books",
    },
  ]
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".navbar")
    search.classList.toggle("active", window.scrollY > 100)
  })

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                  <a className="nav-link" href='/'><li className='bi bi-person-add'></li> Se Connecter</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className='HomeSection'>
        <div className='category'>
          {data.map((value, index) => {
            return (
              <div className='box f_flex' key={index}>
                <img src={value.cateImg} alt='' />
                <span>{value.cateName}</span>
              </div>
            )
          })}
        </div>
        <div className='SlideSection'>
          <section className='homeSlide contentWidth'>
            <div className='container'>
              <SlideCard
                title="Your slide title"
                content="Your slide content"
                image="https://www.kindacode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-27-at-15.59.27.jpg"
              />
            </div>
            </section>
        </div>


      </div>
      <div className='ArticelSection'>
        <ArticleCard
          title="Your article title"
          content="Your article content"
          image="https://www.kindacode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-27-at-15.59.27.jpg"
        />
        <ArticleCard
          title="Your article title"
          content="Your article content"
          image="https://www.kindacode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-27-at-15.59.27.jpg"
        />
        <ArticleCard
          title="Your article title"
          content="Your article content"
          image="https://www.kindacode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-27-at-15.59.27.jpg"
        />
        <ArticleCard
          title="Your article title"
          content="Your article content"
          image="https://www.kindacode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-27-at-15.59.27.jpg"
        />
        <ArticleCard
          title="Your article title"
          content="Your article content"
          image="https://www.kindacode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-27-at-15.59.27.jpg"
        />
        <ArticleCard
          title="Your article title"
          content="Your article content"
          image="https://www.kindacode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-27-at-15.59.27.jpg"
        />
        <ArticleCard
          title="Your article title"
          content="Your article content"
          image="https://www.kindacode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-27-at-15.59.27.jpg"
        />
        <ArticleCard
          title="Your article title"
          content="Your article content"
          image="https://www.kindacode.com/wp-content/uploads/2021/08/Screen-Shot-2021-08-27-at-15.59.27.jpg"
        />
      </div>


      <footer>
        <p>&copy; 2023 All rights reserved</p>
      </footer>
    </div>
  );
}


