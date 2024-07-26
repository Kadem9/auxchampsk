import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import fruitDuMois from './fruitMois.json';
import "./css/FruitDuMois.css";

function FruitDuMois(){

    const key = Math.random();

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            arrows={false}
            itemClass="carousel-item-padding-40-px"
        >
            {fruitDuMois.map((fruit) => (
                <div id={fruit.id} key={key} className="fruit-item">
                    <img className="preview-image-carousel" src={`/assets/img/products/${fruit.image_url}`} alt={fruit.nom} />
                    <h3 className="mt-3">{fruit.nom}</h3>
                    <p>{fruit.description}</p>
                </div>
            ))}

        </Carousel>
    )
}

export default FruitDuMois;