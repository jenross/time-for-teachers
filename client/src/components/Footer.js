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
 
      <footer className="footer footer-default">
        <Container>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="/about"
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
            © {new Date().getFullYear()},&nbsp;
            <a
              href="https://github.com/jenross"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jennifer Ross
            </a> and&nbsp;
            <a
              href="https://github.com/plake492"
              target="_blank"
              rel="noopener noreferrer"
            >
               Patrick Lake
            </a>
          </div>
        </Container>
      </footer>

  );
}

export default Footer;
