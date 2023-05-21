import Carousel from 'react-bootstrap/Carousel';
export default function ProductCarousel(props){
    return (
        <Carousel>
        <Carousel.Item>
          <img
          key={props.key}
            className="d-block w-100"
            src={props.src}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    )
}