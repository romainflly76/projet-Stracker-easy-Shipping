import { useAuth } from "../Hook/useAuth";
import {
  readPlacebyName,
  readPlacebyPlaceId,
  getSuggestedPrice,
  addMission,
  requestCarrier,
  filterMyMissions,
  getMyssion,
  getAvailableMissions,
  respondCarrier,
  respondShipper,
  requestMissionToShipper,
  deleteMission,
  getQRCode
} from "../api/mission";
import { missionPacketsState } from "../Store/mission";
import { useRecoilValue } from "recoil";

export const useMission = () => {
  const { getAuthorization, getAccessToken, getOAuthToken } = useAuth();

  const getPlaceByName = async place => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const places = await readPlacebyName(place, oAuth, accessToken);
    if (places.status === 403) {
      return await getAuthorization().then(async () => await getPlaceByName(place));
    }
    return await places?.results?.predictions;
  };

  const getPlaceByPlaceId = async id => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const res = await readPlacebyPlaceId(id, oAuth, accessToken);
    if (res.status === 403) {
      return await getAuthorization().then(async () => await getPlaceByPlaceId(id));
    }
    return await res?.results.results[0]
  }

  const suggestedPrice = async metter => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const resp = await getSuggestedPrice(metter, oAuth, accessToken);
    if (resp.status === 403) {
      return await getAuthorization().then(async () => await suggestedPrice(metter));
    }
    return resp.price
  }

  const missionPackets = useRecoilValue(missionPacketsState)

  const submitMission = async mission => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();

    if (mission) {
      let newMission = { ...mission }
      newMission.packets = [...missionPackets].flatMap(p => Array(p.qty).fill({
        board: p.board,
        height: p.height,
        length: p.length,
        name: p.name,
        nature_id: p.nature_id,
        weight: p.weight,
        width: p.width
      }))

      const resp = await addMission(newMission, oAuth, accessToken);
      if (resp.status === 403) {
        return await getAuthorization().then(async () => await submitMission(mission));
      }

      return resp
    }
  }

  const handleRequestCarrier = async (mission_id, favorite_id) => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const resp = await requestCarrier(mission_id, favorite_id, oAuth, accessToken)
    if (resp.status === 403) {
      return await getAuthorization().then(async () => await handleRequestCarrier(mission_id, favorite_id));
    }
    return resp
  }
  const handleRequestMissionToShipper = async (mission_id) => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const resp = await requestMissionToShipper(mission_id, oAuth, accessToken)
    if (resp.status === 403) {
      return await getAuthorization().then(async () => await handleRequestMissionToShipper(mission_id));
    }
    return resp
  }

  const handleRespondCarrier = async (mission_id, reply) => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const resp = await respondCarrier(mission_id, oAuth, accessToken, reply)
    if (resp.status === 403) {
      return await getAuthorization().then(async () => await handleRespondCarrier(mission_id, reply));
    }
    return resp
  }

  const handleRespondShipper = async (mission_id, reply, carrier_id) => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const resp = await respondShipper(mission_id, oAuth, accessToken, reply, carrier_id)
    if (resp.status === 403) {
      return await getAuthorization().then(async () => await handleRespondShipper(mission_id, reply, carrier_id));
    }
    return resp
  }

  const handleFilterMyMissions = async (status, skip, limit) => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const resp = await filterMyMissions(skip, limit, status, oAuth, accessToken)
    if (resp.status === 403) {
      return await getAuthorization().then(async () => await handleFilterMyMissions(status, skip, limit));
    }
    return resp
  }

  const handleAvailableMissions = async (skip, limit) => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const resp = await getAvailableMissions(skip, limit, oAuth, accessToken)
    if (resp.status === 403) {
      return await getAuthorization().then(async () => await handleAvailableMissions(skip, limit));
    }
    return resp
  }

  const handleGetMyssion = async id => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const resp = await getMyssion(id, oAuth, accessToken)
    if (resp.status === 403) {
      return await getAuthorization().then(async () => await handleGetMyssion(id));
    }
    return resp
  }

  const handleDeleteMission = async id => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const resp = await deleteMission(id, oAuth, accessToken)
    if (resp.status === 403) {
      return await getAuthorization().then(async () => await handleDeleteMission(id));
    }
    return resp
  }

  const handleGetQRCode = async id => {
    const oAuth = await getOAuthToken();
    const accessToken = await getAccessToken();
    const resp = await getQRCode(id, oAuth, accessToken)
    if (resp && resp.status === 403) {
      return await getAuthorization().then(async () => await handleGetQRCode(id));
    }
    return resp
  }

  return {
    getPlaceByName,
    getPlaceByPlaceId,
    suggestedPrice,
    submitMission,
    handleRequestCarrier,
    handleFilterMyMissions,
    handleGetMyssion,
    handleAvailableMissions,
    handleRespondCarrier,
    handleRespondShipper,
    handleRequestMissionToShipper,
    handleDeleteMission,
    handleGetQRCode
  }
}