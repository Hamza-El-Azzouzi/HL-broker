import '../style/ArticleCard.css'
export default function ArticleCard(props) {
    return (
        <div className="article-card">
      <img src={props.image} alt={props.title} />
      <div className="article-card-content">
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <button>Read More</button>
      </div>
    </div>


    )
}