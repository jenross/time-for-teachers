import React from 'react'
// import './Footer.css'

// export default function Footer() {
//     return (
//       <footer>
//         <div className='footer-content'>
//           <p>
//             © 2019
//           </p>
//         </div>
//       </footer>
//     )
// }

// reactstrap components
import { Container } from "reactstrap";

// core components

function Footer() {
  return (
    <>
      <footer className="footer">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  href="#"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/register"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="/login"
                >
                  Sign In
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, &nbsp;
            <a
              href="https://github.com/jenross"
              target="_blank"
            >
              Jennifer Ross
            </a> and &nbsp;
            <a
              href="https://github.com/plake492"
              target="_blank"
            >
               Patrick Lake
            </a>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
