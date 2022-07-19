import React from "react";
import { ACTIONS } from "../App";
function OperatorsBtns({ operator, dispatch, opDisplay }) {
  return (
    <button
      onClick={() => {
        dispatch({ action: ACTIONS.CHOOSE_OP, payload: {operator} });
      }}
    >
      {opDisplay}
    </button>
  );
}

export default OperatorsBtns;
