import "./App.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function App() {
  return (
    <>
      <header>
        <h1>Marvelous v2.0</h1>
        <a href="#">Delete all tasks</a>
      </header>
      <br />
      <br />

      <TextField id="outlined-basic" variant="outlined" />

      <Button variant="contained">Add</Button>
      <br />

      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="Search..."
      />

      <h3>To Do</h3>
      <hr />
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Task 1" />
        <FormControlLabel control={<Checkbox />} label="Task 2" />
      </FormGroup>

      <h3>Done</h3>
      <hr />
      <FormGroup>
        <FormControlLabel control={<Checkbox checked />} label="Task 3" />
        <FormControlLabel control={<Checkbox checked />} label="Task 4" />
      </FormGroup>
    </>
  );
}

export default App;
