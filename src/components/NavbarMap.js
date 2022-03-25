import React, { Component } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "./NavbarMap.css";

export default class NavbarMap extends Component {
  render() {
    return (
      <div>
        <Navbar bg="white" variant="white">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/logo512.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Stracker
            </Navbar.Brand>
            <Nav className="me-auto">
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
