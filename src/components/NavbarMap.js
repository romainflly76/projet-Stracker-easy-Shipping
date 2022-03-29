import React, { Component, useState } from "react";

import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "./NavbarMap.css";

// const [data, setData] = useState("");

// *************** Fonction recuperation des données tapés dans la REF ************************//
const Field = (data) => {
  console.log(data);
};

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
                  // *************  recuperation de la valeur ***************//
                  onChange={(e) => Field(e.target.value)}
                />
                <button id="validation" className="" type="submit">
                  Valider
                </button>
              </div>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
