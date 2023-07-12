import axios from "axios";

export async function getServerData(url) {
  const data = await (await axios.get(url)).data;
  console.log("data", data);
  return data;
}

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

export async function deleteAllServerData(url) {
  axios.delete(url);
}
