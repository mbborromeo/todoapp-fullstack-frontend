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

export async function deleteAllToDos() {
  const response = await fetch(`${apiBaseUrl}/todos`, {
    method: "delete",
  });

  if (!response.ok) {
    throw new Error("Unknown error deleting todos");
  }
}

export async function markToDoComplete(id) {
  const response = await fetch(`${apiBaseUrl}/todos/${id}/done`, {
    method: "put",
  });

  if (!response.ok) {
    throw new Error("markToDoComplete error");
  }
}

export async function markToDoIncomplete(id) {
  const response = await fetch(`${apiBaseUrl}/todos/${id}/incomplete`, {
    method: "put",
  });

  if (!response.ok) {
    throw new Error("markToDoIncomplete error");
  }
}

export async function getIncompleteToDos(searchField) {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/todos/incomplete?searchTerm=${searchField}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("getIncompleteToDos error", error);
    throw error;
  }

  // const response = await fetch(
  //   `${apiBaseUrl}/todos/incomplete?searchTerm=${searchField}`,
  //   {
  //     method: "get",
  //   }
  // );

  // if (!response.ok) {
  //   throw new Error("Unknown error getting incomplete todos");
  // }
}

export async function getCompletedToDos(searchField) {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/todos/done?searchTerm=${searchField}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("getCompletedToDos error", error);
    throw error;
  }

  // const response = await fetch(
  //   `${apiBaseUrl}/todos/done?searchTerm=${searchField}`,
  //   {
  //     method: "get",
  //   }
  // );

  // if (!response.ok) {
  //   throw new Error("Unknown error getting completed todos");
  // }
}
