import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

const ControlledCheckbox = ({
  onChangeHandler,
  item,
  defaultChecked = false,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <Checkbox
      checked={checked}
      onChange={(e) => {
        onChangeHandler(item, e, setChecked, checked);
      }}
    />
  );
};

export default ControlledCheckbox;
