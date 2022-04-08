import React, { useState, useEffect } from "react";
// import { FieldData } from "../api/Field";

import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import { FieldData, sendPackageRef } from "../api/Field";
import { useFieldData } from "../Hook/useField";
import "./NavbarMap.css";

export default function NavbarMap() {
  const [inputValue, setInputValue] = useState("");

  // const { fieldData } = useFieldData();
  const { addField } = useFieldData();

  // const handleSubmit = () => {
  //   // console.log("inputValue :", inputValue);
  //   // sendPackageRef(accessToken, OAuth, inputValue);
  //   // fieldData(inputValue);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    addField(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

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
            <div id="ref">
              <form
                class="d-flex flex-row"
                action="submit"
                onSubmit={handleSubmit}
              >
                <div class="p-1 text-white">REF :</div>
                <input
                  id="inputRef"
                  className="rounded-right"
                  type="text"
                  // *************  recuperation de la valeur ***************//
                  value={inputValue}
                  // onChange={(e) => Field(e.target.value)}
                  onChange={handleChange}
                />
                <button id="validation" className="" type="submit">
                  Valider
                </button>
              </form>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
