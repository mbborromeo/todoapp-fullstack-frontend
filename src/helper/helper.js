import axios from "axios";

export async function postServerData(url) {
  try {
    const response = await axios.post(url);
    console.log("getServerData response", response);
    return response;
  } catch (error) {
    console.log("postServerData error", error);
    throw error;
  }
}

export async function putServerData(url) {
  try {
    const response = await axios.put(url);
    console.log("getServerData response", response);
    return response;
  } catch (error) {
    console.log("putServerData error", error);
    throw error;
  }
}

export async function deleteAllServerData(url) {
  try {
    const response = await axios.delete(url);
    console.log("getServerData response", response);
    return response;
  } catch (error) {
    console.log("deleteAllServerData error", error);
    throw error;
  }
}

export async function getServerData(url) {
  try {
    const response = await axios.get(url);
    console.log("response", response);

    const data = await response.data;
    return data;
  } catch (error) {
    console.log("getServerData error", error);
    console.log("type of error is:", typeof error);
    throw error;
  }
}
