import React, { Component } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "./NavbarMap.css";

export default class NavbarMap extends Component {
  render() {
    return (
      <div>
        <Navbar bg="white" variant="white">
          <Container className="ms-5">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/LogoStracker.png"
                width="200"
                height="50"
                className="d-inline-block align-top"
              />{" "}
              {/* by Easy shipping */}
            </Navbar.Brand>
            <Nav className="ms-5 me-auto">
              <div id="ref" class="d-flex flex-row">
                <div class="p-1 text-white">REF :</div>
                <input
                  id="inputRef"
                  className="rounded-right"
                  type="text"
                  onchange="myFunction()"
                />
              </div>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
