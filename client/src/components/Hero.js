import React from 'react';
import './Hero.css'

// export default function Hero() {
//   return (
//     <section className="hero-container">
//       <div className="hero-body">
//         <div>
//           <img className='hero-img' src={Time} alt="clocks" />
//         </div>
//       </div>
//     </section>
//   )
// }

// reactstrap components
import { Row, Col } from "reactstrap";

// core components

function Hero() {
  let pageHeader = React.createRef();
  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        // let windowScrollTop = window.pageYOffset / 3;
        // pageHeader.current.style.transform =
        //   "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header page-header-large">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("./images/red-alarm.png") + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Row>
            <Col className="hero-text" md="4" lg="4" sm="4">
              <h2 className="hero-header title">Track it. Report it. Prove it.</h2>
              <h4 className="hero-subtext">
                Your time is valuable, and so are you.
              </h4> 
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Hero;