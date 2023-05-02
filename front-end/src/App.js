
import './App.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArticleCard from './Comp/ArticleCard';
import SlideCard from './Comp/SlideCard';
import NavBar from './includes/NavBar';


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
      <NavBar/>
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


