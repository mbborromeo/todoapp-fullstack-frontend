import { useState, useEffect, useCallback } from "react";

import "./App.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ControlledCheckbox from "./ControlledCheckbox";

import {
  getServerData,
  postServerData,
  deleteAllServerData,
  putServerData,
} from "../helper/helper";

function App() {
  const [addField, setAddField] = useState("");
  const [searchField, setSearchField] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [serverError, setServerError] = useState(false);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleOnChangeAdd = (text) => {
    setAddField(text);
  };

  const handleChangeCheckbox = (element, ev, toggleCheck, done) => {
    const taskId = element["_id"];
    // const done = element["doneAt"];
    // const done = ev.target.checked;
    console.log("handleChangeCheckbox done=", done);

    if (done) {
      putToDoIncomplete(taskId);
    } else {
      putToDoDone(taskId);
    }

    toggleCheck(!done);
  };

  const handleChangeSearch = (text) => {
    console.log("handleChangeSearch");
    // future to do: wait a couple of seconds until user stopped typing
    setSearchField(text);
  };

  const handleServerError = (err) => {
    console.log("App.js: handleServerError:", err);

    if (err.name === "AxiosError") {
      // handle this error and display feedback to user
      setServerError(true);
    } else {
      // pass error forward so we have more details
      throw err;
    }
  };

  /* functions to call backend API */
  const deleteAllTasks = async () => {
    handleCloseAlert();

    try {
      await deleteAllServerData("http://localhost:5000/api/todos");
      // success, so no server error
      setServerError(false);
      updateLists();
    } catch (error) {
      handleServerError(error);
    }
  };

  const addToDo = async () => {
    if (addField) {
      try {
        await postServerData(
          `http://localhost:5000/api/todos?task=${addField}`
        );
        // success, so no server error
        setServerError(false);
        setAddField("");
        updateLists();
      } catch (error) {
        handleServerError(error);
      }
    }
  };

  const putToDoDone = async (id) => {
    try {
      await putServerData(`http://localhost:5000/api/todos/${id}/done`);
      // success, so no server error
      setServerError(false);
      updateLists();
    } catch (error) {
      handleServerError(error);
    }
  };

  const putToDoIncomplete = async (id) => {
    try {
      await putServerData(`http://localhost:5000/api/todos/${id}/incomplete`);
      // success, so no server error
      setServerError(false);
      updateLists();
    } catch (error) {
      handleServerError(error);
    }
  };

  const updateLists = useCallback(async () => {
    // Promise.resolve: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve#examples

    try {
      const responseToDos = await getServerData(
        `http://localhost:5000/api/todos/incomplete?searchTerm=${searchField}`
      );
      // success, so no server error
      setServerError(false);
      setToDoList(responseToDos);
    } catch (error) {
      handleServerError(error);
    }

    try {
      const responseDone = await getServerData(
        `http://localhost:5000/api/todos/done?searchTerm=${searchField}`
      );
      // success, so no server error
      setServerError(false);
      setDoneList(responseDone);
    } catch (error) {
      handleServerError(error);
    }
  }, [searchField]);

  useEffect(() => {
    // fetch API data initially
    updateLists();
  }, [updateLists]);

  return (
    <Box
      component="div"
      sx={{
        margin: "0 30px 30px",
      }}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Marvelous v2.0</h1>
        <Link
          component="button"
          variant="text"
          onClick={() => {
            setOpenAlert(true);
          }}
        >
          Delete all tasks
        </Link>
      </Box>

      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete All Tasks?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By clicking on Agree, this will delete all of your tasks in both the
            To Do and Done columns.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Disagree</Button>
          <Button onClick={deleteAllTasks} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Container
        fixed
        sx={{
          maxWidth: "100% !important",
          width: "100%",
          height: "",
          padding: "0 !important",
          margin: "0 0 30px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            sx={{
              ".MuiInputBase-input": {
                padding: "8px",
              },
            }}
            value={addField}
            onChange={(e) => {
              handleOnChangeAdd(e.target.value);
            }}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                addToDo();
              }
            }}
          />
          <Button
            variant="contained"
            sx={{ marginLeft: "8px", textTransform: "capitalize" }}
            onClick={addToDo}
          >
            Add
          </Button>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Search..."
            value={searchField}
            onChange={(e) => {
              handleChangeSearch(e.target.value);
            }}
            sx={{
              ".MuiInputBase-input": {
                padding: "8px",
              },
            }}
          />
        </div>
      </Container>

      {serverError ? (
        <div style={{ color: "red" }}>Server error occured!</div>
      ) : (
        <Container
          fixed
          sx={{
            maxWidth: "100% !important",
            padding: "0 !important",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box component="div" sx={{ width: "47%" }}>
            <h3>To Do</h3>
            <hr />
            <FormGroup>
              {toDoList &&
                toDoList.length > 0 &&
                toDoList.map((item, i) => (
                  <FormControlLabel
                    key={item._id}
                    control={
                      <ControlledCheckbox
                        onChangeHandler={handleChangeCheckbox}
                        item={item}
                      />
                    }
                    label={item.content}
                  />
                ))}
            </FormGroup>
          </Box>

          <Box component="div" sx={{ width: "47%" }}>
            <h3>Done</h3>
            <hr />
            <FormGroup>
              {doneList &&
                doneList.length > 0 &&
                doneList.map((item, i) => (
                  <FormControlLabel
                    key={item._id}
                    control={
                      <ControlledCheckbox
                        defaultChecked={true}
                        onChangeHandler={handleChangeCheckbox}
                        item={item}
                      />
                    }
                    label={item.content}
                  />
                ))}
            </FormGroup>
          </Box>
        </Container>
      )}
    </Box>
  );
}

export default App;
