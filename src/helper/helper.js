import axios from "axios";

export async function postServerData(url) {
  axios
    .post(url)
    .then(function (response) {
      console.log("response", response);
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

export async function putServerData(url) {
  axios
    .put(url)
    .then(function (response) {
      console.log("response", response);
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

export async function deleteAllServerData(url) {
  axios.delete(url);
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
