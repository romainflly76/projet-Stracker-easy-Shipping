import { useAuth } from "../Hook/useAuth";

import { sendPackageRef } from "../api/Field";

export const useFieldData = () => {
  const { getAuthorization, getAccessToken, getOAuthToken } = useAuth();

  const addField = async (data) => {
    let oAuth = await getOAuthToken();
    let accessToken = await getAccessToken();
    let dataField = await sendPackageRef(accessToken, oAuth, data);
    if (dataField.status === 403) {
      return await getAuthorization().then(async () => await addField());
    }
    return await dataField;
  };

  return {
      addField
  }
}

