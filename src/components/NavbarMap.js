import React, { Component, useState, useEffect } from "react";
// import { FieldData } from "../api/Field";

import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FieldData } from "../api/Field";
import "./NavbarMap.css";

// const [newData, setNewData] = useState("");

const Field = (data) => {
  if (data.length > 9) {
    console.log(data);
  }
};

// const handleSubmit = () => {};

// useEffect(() => {
//   console.log(newData);
// }, [newData]);

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
                {/* <button
                  id="validation"
                  className=""
                  type="submit"
                  // onClick={handleSubmit}
                >
                  Valider
                </button> */}
              </div>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
