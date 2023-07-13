import axios from "axios";

export function postServerData(url) {
  return axios
    .post(url)
    .then(function (response) {
      console.log("response", response);
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

export function putServerData(url) {
  return axios
    .put(url)
    .then(function (response) {
      console.log("response", response);
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

export function deleteAllServerData(url) {
  return axios
    .delete(url)
    .then(function (response) {
      console.log("response", response);
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

export async function getServerData(url) {
  try {
    const data = await (await axios.get(url)).data;
    console.log("getServerData data", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
}
