import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    if (e === "") setValue("");
    else setValue(e.target.value);
  };

  return [value, onChange];
};

export default useInput;
