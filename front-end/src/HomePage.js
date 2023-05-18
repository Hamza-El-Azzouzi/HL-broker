import ArticleCard from './Comp/ArticleCard';
import SlideCard from './Comp/SlideCard';
import './style/HomePage.css'
export default function HomePage() {
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
  return (
    <>
      <div className='HomeSection'>
        <div className='category'>
          {data.map((value, index) => {
            return (
              <div className='box f_flex' key={index}>
                <img src={value.cateImg} alt='test' />
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
    </>
  )

}