// import { useAuth } from "../Hook/useAuth";
import { useAuth } from "../Hook/useAuth";

// *******************  Connexion à l'API *********************//

const api_url = process.env.REACT_APP_API_URL;
export const FieldData = async (oAuth, accessToken) => {
  let resp = await fetch(`${api_url}/restricted/v1/my/vehicles`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${oAuth}`,
      jwtToken: `Bearer ${accessToken}`,
    },
    method: "GET",
  });
  if (resp.status === 403) return await resp;
  return await resp.json();
};

export const sendPackageRef = async (accessToken, oAuth, packageRef) => {
  let resp = await fetch(`${api_url}/restricted/v1/my/add-vehicles`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${oAuth}`,
      jwtToken: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(packageRef),
  });
  if (resp.status === 403) return await resp;
  return await resp.json();
};
