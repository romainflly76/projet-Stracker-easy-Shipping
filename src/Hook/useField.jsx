import { useAuth } from "../Hook/useAuth";
import { FieldData } from "../api/Field";

export const useFieldData = () => {
  const { getAuthorization, getAccessToken, getOAuthToken } = useAuth();

  const addField = async () => {
    let oAuth = await getOAuthToken();
    let accessToken = await getAccessToken();
    let dataField = await FieldData(oAuth, accessToken);
    if (dataField.status === 403) {
      return await getAuthorization().then(async () => await addField());
    }
    return await dataField;
  };

  return {
      addField
  }
}

