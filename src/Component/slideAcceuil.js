import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
  return (
    <Carousel data-bs-theme="dark" style={{width:"100%",margin:'auto'}}>
      <Carousel.Item slide={false}>
        <img
          className="d-block w-100"
          src={require("../photos/logo1.jpg")}
          alt="First slide"
          style={{
          height:"20em"
          }}
       
        />
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../photos/logo2.jpg")}
          alt="Second slide"
          style={{
            height:"20em"
            }}
         
        />
        {/* <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../photos/logo5.jpg")}
          alt="Third slide"
          style={{
            height:"20em"
            }}
         
        />
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;