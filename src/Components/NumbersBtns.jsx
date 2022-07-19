import React from 'react'
import { ACTIONS } from "../App";
function NumbersBtns({ dispatch, digit}) {
  return (
    <button
    onClick={() => {
      dispatch({ action: ACTIONS.ADD_DIGIT, payload: {digit}});
    }}
    >{digit}</button>
  )
}

export default NumbersBtns