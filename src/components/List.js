import React from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function List({ heading, array, defaultChecked, handleCheck }) {
  return (
    <Box component="div" sx={{ width: "47%" }}>
      <h3>{heading}</h3>
      <hr />
      <FormGroup>
        {array &&
          array.length > 0 &&
          array.map((item) => (
            <FormControlLabel
              key={item._id}
              control={
                <Checkbox
                  id={`checkbox-${item._id}`}
                  defaultChecked={defaultChecked}
                  onChange={(e) => {
                    handleCheck(item, e.target.checked);
                  }}
                />
              }
              label={item.content}
            />
          ))}
      </FormGroup>
    </Box>
  );
}

export default List;
