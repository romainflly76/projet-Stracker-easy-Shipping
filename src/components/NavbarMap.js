import React, { useState } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

import { useFetchMission } from "../Hook/useFetchMission";
import "./NavbarMap.css";

// Condition si l'objet n'existe pas (undefiened ou null et qu'il n'a pas de clé)
const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;

// Fonction Format Date
function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  let d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

export default function NavbarMap() {
  // useState objet vide
  const [inputValue, setInputValue] = useState("");

  // Fonction du hook FetchMission
  const { mission, fetchMission } = useFetchMission();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMission(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  console.log(mission);
  console.log(isEmpty(mission));
  // const Submit = (data) => {
  //   console.log("data");
  // };

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
                className="d-flex flex-row"
                action="submit"
                onSubmit={handleSubmit}
              >
                <div className="p-1 text-white">REF :</div>
                <input
                  id="inputRef"
                  className="rounded-right"
                  type="text"
                  // *************  recuperation de la valeur ***************//
                  // value={inputValue}
                  // onChange={(e) => handleSubmit(e.target.value)}
                  onChange={handleChange}
                />
                <button id="validation" className="" type="submit">
                  Valider
                </button>
              </form>

              {/*************  recuperation de la valeur ***************/}
              {!isEmpty(mission) && (
                <div>
                  <div className="p-1 text-dark">
                    <span>{convertDate(mission.start_date)}</span>
                    <span>{mission.startaddress.street}</span>
                    <span>
                      {mission.startaddress.zipcode +
                        " " +
                        mission.startaddress.city}
                    </span>
                  </div>
                  <div className="p-1 text-dark">
                    <span>{convertDate(mission.end_date)}</span>
                    <span>{mission.endaddress.street}</span>
                    <span>
                      {mission.endaddress.zipcode +
                        " " +
                        mission.endaddress.city}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
