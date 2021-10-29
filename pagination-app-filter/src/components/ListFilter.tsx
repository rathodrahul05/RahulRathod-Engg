import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filter } from "../Redux/Actions/filterAction";
function ListFilter() {
  const dispatch = useDispatch();
  const [text, settext] = useState("");
  return (
    <div>
      <input 
      className="m-1"
        type="text"
        value={text}
        placeholder="search by title or created_at"
        onChange={(e) => {
          settext(e.target.value);
          dispatch(filter(e.target.value));
        }}
      />
    </div>
  );
}

export default ListFilter;
