import axios from "axios";

export async function postServerData(url) {
  try {
    const response = await axios.post(url);
    console.log("getServerData response", response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
}

export async function putServerData(url) {
  try {
    const response = await axios.put(url);
    console.log("getServerData response", response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
}

export async function deleteAllServerData(url) {
  try {
    const response = await axios.delete(url);
    console.log("getServerData response", response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
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
