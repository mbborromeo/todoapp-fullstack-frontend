import "./App.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function App() {
  /* functions to call backend API */
  const addToDo = () => {
    console.log("click add to do");
  };

  const deleteAllTasks = () => {
    console.log("click delete all tasks");
  };

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
        <Link component="button" variant="text" onClick={deleteAllTasks}>
          Delete all tasks
        </Link>
      </Box>

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
            <FormControlLabel control={<Checkbox />} label="Task 1" />
            <FormControlLabel control={<Checkbox />} label="Task 2" />
          </FormGroup>
        </Box>

        <Box component="div" sx={{ width: "47%" }}>
          <h3>Done</h3>
          <hr />
          <FormGroup>
            <FormControlLabel control={<Checkbox checked />} label="Task 3" />
            <FormControlLabel control={<Checkbox checked />} label="Task 4" />
          </FormGroup>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
