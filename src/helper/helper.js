import axios from "axios"; // don't need to use this

const apiBaseUrl = process.env.REACT_APP_API_URL;

export async function addToDo(text) {
  const response = await fetch(`${apiBaseUrl}/todos?task=${text}`, {
    method: "post",
  });

  if (!response.ok) {
    throw new Error("Unknown error adding todo");
  }
}

export async function putServerData(url) {
  try {
    const response = await axios.put(url);
    return response;
  } catch (error) {
    console.log("putServerData error", error);
    throw error;
  }
}

export async function deleteAllToDos() {
  const response = await fetch(`${apiBaseUrl}/todos`, {
    method: "delete",
  });

  if (!response.ok) {
    throw new Error("Unknown error deleting todos");
  }
}

export async function getServerData(url) {
  try {
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("getServerData error", error);
    throw error;
  }
}
