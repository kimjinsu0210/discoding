import { useState } from "react";

const useInput = () => {
const [value, setValue] = useState('');

const handler = (e) => {
    if(e==="") setValue("")
    else setValue(e.target.value);
}

return [value, handler];
};

export default useInput;