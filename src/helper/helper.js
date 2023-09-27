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
    const responseObj = await response.json();
    throw new Error(`error thown: ${responseObj.error}`);
  }
}

export async function markToDoIncomplete(id) {
  const response = await fetch(`${apiBaseUrl}/todos/${id}/incomplete`, {
    method: "put",
  });

  if (!response.ok) {
    const responseObj = await response.json();
    throw new Error(`error thown: ${responseObj.error}`);
  }
}

export async function getIncompleteToDos(searchField) {
  const response = await fetch(
    `${apiBaseUrl}/todos/incomplete?searchTerm=${searchField}`,
    {
      method: "get",
    }
  );

  if (!response.ok) {
    throw new Error("Unknown error getting incomplete todos");
  }

  const responseObj = await response.json();
  return responseObj;
}

export async function getCompletedToDos(searchField) {
  const response = await fetch(
    `${apiBaseUrl}/todos/done?searchTerm=${searchField}`,
    {
      method: "get",
    }
  );

  if (!response.ok) {
    throw new Error("Unknown error getting completed todos");
  }

  const responseObj = await response.json();
  return responseObj;
}
