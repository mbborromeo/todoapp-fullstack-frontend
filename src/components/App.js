import React, { useState, useEffect, useCallback } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import List from "./List";

import {
  addToDo,
  deleteAllToDos,
  markToDoComplete,
  markToDoIncomplete,
  getCompletedToDos,
  getIncompleteToDos,
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

  const handleServerError = (err) => {
    if (err) {
      // handle this error and display feedback to user
      setServerError(true);
    } else {
      // pass error forward so we have more details
      throw err;
    }
  };

  /* Functions to call backend API */
  const updateLists = useCallback(async () => {
    // https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/
    try {
      const [incompleteToDos, completedToDos] = await Promise.all([
        getIncompleteToDos(searchField),
        getCompletedToDos(searchField),
      ]);

      setServerError(false);
      setToDoList(incompleteToDos);
      setDoneList(completedToDos);
    } catch (error) {
      handleServerError(error);
    }
  }, [searchField]);

  const putToDoDone = async (id) => {
    try {
      await markToDoComplete(id);
      setServerError(false);
      updateLists();
    } catch (error) {
      console.log(error);
      handleServerError(error);
    }
  };

  const putToDoIncomplete = async (id) => {
    try {
      await markToDoIncomplete(id);
      setServerError(false);
      updateLists();
    } catch (error) {
      console.log(error);
      handleServerError(error);
    }
  };

  const deleteAllTasks = async () => {
    handleCloseAlert();

    try {
      await deleteAllToDos();

      setServerError(false);
      updateLists();
    } catch (error) {
      handleServerError(error);
    }
  };

  /* Event Handlers for form */
  const handleChangeCheckboxCompleted = (element, checked) => {
    // update done (checked) status after user clicks checkbox
    const taskId = element._id;

    if (checked) {
      putToDoDone(taskId);
    } else {
      putToDoIncomplete(taskId);
    }
  };

  const handleChangeInputAdd = (text) => {
    setAddField(text);
  };

  const handleChangeInputSearch = (text) => {
    // future to do: wait a couple of seconds until user stopped typing
    setSearchField(text);
  };

  const onToDoSubmit = async (event) => {
    event.preventDefault();

    if (addField) {
      try {
        await addToDo(addField);

        setServerError(false);
        setAddField("");
        updateLists();
      } catch (error) {
        handleServerError(error);
      }
    }
  };

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
        <h1>To Do list (Full Stack app)</h1>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenAlert(true);
          }}
        >
          Delete all tasks
        </Button>
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
        <form onSubmit={onToDoSubmit}>
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
              handleChangeInputAdd(e.target.value);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginLeft: "8px", textTransform: "capitalize" }}
          >
            Add
          </Button>
        </form>

        <div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Search..."
            value={searchField}
            onChange={(e) => {
              handleChangeInputSearch(e.target.value);
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
          <List
            heading="To Do"
            array={toDoList}
            defaultChecked={false}
            handleCheck={handleChangeCheckboxCompleted}
          />

          <List
            heading="Done"
            array={doneList}
            defaultChecked
            handleCheck={handleChangeCheckboxCompleted}
          />
        </Container>
      )}
    </Box>
  );
}

export default App;
