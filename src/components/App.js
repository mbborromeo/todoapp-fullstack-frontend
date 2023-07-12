import { useState, useEffect, useCallback } from "react";

import "./App.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  getServerData,
  postServerData,
  deleteAllServerData,
} from "../helper/helper";

function App() {
  const [addField, setAddField] = useState("");
  const [searchField, setSearchField] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleOnChangeAdd = (text) => {
    setAddField(text);
  };

  /* functions to call backend API */
  const deleteAllTasks = () => {
    console.log("click delete all tasks");
    handleCloseAlert();
    deleteAllServerData("http://localhost:5000/api/todos");
  };

  const addToDo = () => {
    if (addField) {
      postServerData(`http://localhost:5000/api/todos?task=${addField}`);
      setAddField("");
    }
  };

  const getToDos = useCallback(() => {
    console.log("getToDos");
    return getServerData(
      `http://localhost:5000/api/todos/incomplete?searchTerm=${searchField}`
    );
  }, [searchField]);

  const getDone = useCallback(() => {
    console.log("getDone items");
    return getServerData(
      `http://localhost:5000/api/todos/done?searchTerm=${searchField}`
    );
  }, [searchField]);

  useEffect(() => {
    console.log("useEffect toDoList", toDoList);

    // fetch API data initially
    getToDos().then((response) => setToDoList(response));
    getDone().then((response) => setDoneList(response));
  }, [getToDos, toDoList]);

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
            sx={{
              ".MuiInputBase-input": {
                padding: "8px",
              },
            }}
          />
        </div>
      </Container>

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
                  key={i}
                  control={<Checkbox />}
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
                  key={i}
                  control={<Checkbox checked />}
                  label={item.content}
                />
              ))}
          </FormGroup>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
