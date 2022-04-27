
import { useState } from "react";

export const useFetchMission = () => {
  
  //Ustate = initialiser  à Objet vide
  const [mission, setMission] = useState({})
  const fetchMission = async (data) => {
    let oAuth = "C6H4SZYIPPOS87MPDN4LDA" //await useAuth.getOAuthToken();
    let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5lbWluZWFsaUBnbWFpbC5jb20iLCJleHAiOjE2NTE3Njg4NzMsImlkIjoiN2UzZTdjNDktMTY5Ny00MTE1LTlmNmQtM2JhZjgwNzlmNGRlIiwibmFtZSI6IkplYW4gZGUgbGEgRm9udGFpbmUgIiwicm9sZSI6IlNISVBQRVIifQ.UClv3-mDKKTGzrIQIiUBXibHt-d4iL4_nl72HI7CvkA"//await useAuth.getAccessToken();
    
    
    let response = await fetch(`https://api.sandbox.easyshipping.fr/restricted/v1/my/missions/skip/0/limit/100/PENDING`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${oAuth}`,
        jwtToken: `Bearer ${accessToken}`,
      },
      method: "GET",
    })
    const json = await response.json()
    // console.log(json);

    //conditionneal Chaining
    const firstMission = json?.missions[0];
    
    // console.log(firstMission);
   
    setMission(firstMission);
  };

  return {
      mission,
      fetchMission
  }
}

