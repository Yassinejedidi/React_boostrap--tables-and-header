import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import '../Styles/nav.css';
import { AiOutlineFileText, AiFillSetting, AiFillBank, AiOutlineFileDone, AiOutlineUsergroupAdd, AiOutlineSetting } from "react-icons/ai";

import Logo from '../assets/up.png';



function Header() {
  const style = {
    fontSize: "1.5em"
  }
  const set = {
    fontSize: "1.3em"
  }


  return (
    <>
      <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark' id='__nav'>
        <Container>
          <Navbar.Toggle aria-controls='navbarScroll' data-bs-target='#navbarScroll' />
          <Navbar.Collapse id="navbarScroll">
            <Nav>
              <Nav.Link id='link' href='/'>
                <img src={Logo} />

              </Nav.Link>
              <Nav.Link id='link' href='/client'> <AiOutlineUsergroupAdd style={style} />Clients</Nav.Link>
              <Nav.Link id='link'><AiOutlineSetting style={set} /> Settings</Nav.Link>






            </Nav>





          </Navbar.Collapse>



        </Container>




      </Navbar>
    </>
  )
}
export default Header