import "./Styles/main.css";
import { useReducer } from "react";
import NumbersBtns from "./Components/NumbersBtns";
import OperatorsBtns from "./Components/OperatorsBtns";
import { useState } from "react";
// managing the state
export const ACTIONS = {
  ADD_DIGIT: "addDigit",
  REMOVE_DIGIT: "removeDigit",
  CHOOSE_OP: "choose",
  CLEAR: "clear",
  RESULT: "result",
};
let endOfOperation = false;
const reducer = (state, { action, payload }) => {
  switch (action) {
    case ACTIONS.ADD_DIGIT:
      if (endOfOperation) {
        state.currentOperation = "";
        endOfOperation = false;
      }
      return {
        ...state,
        currentOperation: `${state.currentOperation || ""}${payload.digit}`,
      };
    case ACTIONS.REMOVE_DIGIT:
      return {
        ...state,
        currentOperation: `${state.currentOperation.slice(0, -1) || ""}`,
      };
    case ACTIONS.CLEAR:
      return {
        currentOperation: "",
        previousOp: "",
        Operator: "",
      };
    case ACTIONS.CHOOSE_OP:
      if (state.currentOperation === "" && state.previousOp === "") {
        return state;
      }
      if (state.previousOp === "") {
        return {
          previousOp: `${state.currentOperation}`,
          Operator: `${payload.operator}`,
          currentOperation: "",
        };
      }
      if (state.previousOp && state.currentOperation === "") {
        return {
          ...state,
          Operator: `${payload.operator}`,
        };
      }
      if (state.currentOperation && state.previousOp) {
        const result = claculate(
          state.currentOperation,
          state.previousOp,
          state.Operator
        );
        return {
          currentOperation: ``,
          previousOp: `${result}`,
          Operator: `${state.Operator}`,
        };
      } else {
        return state;
      }
    case ACTIONS.RESULT:
      if (state.currentOperation && state.previousOp) {
        const result = claculate(
          state.currentOperation,
          state.previousOp,
          state.Operator
        );
        endOfOperation = true;
        return {
          currentOperation: `${result}`,
          previousOp: ``,
          Operator: ``,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
const claculate = (cur, per, op) => {
  let result = "";
  const current = parseFloat(cur);
  const previous = parseFloat(per);
  switch (op) {
    case "+":
      result = current + previous;
      break;
    case "-":
      result = previous - current;
      break;
    case "*":
      result = current * previous;
      break;
    case "/":
      result = previous / current;
      break;
    default:
      result = "";
      break;
  }
  return result;
};
function App() {
  const [theme, setTheme] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const setThemeDark = () => {
    setTheme(false);
    setIsActive(true);
  };
  const setThemeLight = () => {
    setTheme(true);
    setIsActive(false);
  };
  const [{ currentOperation, previousOp, Operator }, dispatch] = useReducer(
    reducer,
    {
      currentOperation: "",
      previousOp: "",
      Operator: "",
    }
  );
  return (
    <div className={theme ? "App App-light-theme" : "App App-dark-theme"}>
      <div className="container">
        <nav>
          <div className="themes">
            <ul>
              <div
                className={isActive ? "underline" : ""}
                onClick={setThemeDark}
              >
                <li>Dark</li>
              </div>
              <div
                className={isActive ? "" : "underline"}
                onClick={setThemeLight}
              >
                <li>Light</li>
              </div>
            </ul>
          </div>
        </nav>
        <div className="calculator">
          <div className="display">
            <p>
              {previousOp} {Operator}
            </p>
            <p>{currentOperation}</p>
          </div>
          <div className="calc-btns">
            <button
              className="span-2"
              onClick={() => {
                dispatch({ action: ACTIONS.CLEAR });
              }}
            >
              AC
            </button>
            <button
              onClick={() => {
                dispatch({ action: ACTIONS.REMOVE_DIGIT });
              }}
            >
              DEL
            </button>
            <OperatorsBtns dispatch={dispatch} operator={"/"} opDisplay={"÷"} />
            <NumbersBtns dispatch={dispatch} digit={1} />
            <NumbersBtns dispatch={dispatch} digit={2} />
            <NumbersBtns dispatch={dispatch} digit={3} />
            <OperatorsBtns dispatch={dispatch} operator={"*"} opDisplay={"×"} />
            <NumbersBtns dispatch={dispatch} digit={4} />
            <NumbersBtns dispatch={dispatch} digit={5} />
            <NumbersBtns dispatch={dispatch} digit={6} />
            <OperatorsBtns dispatch={dispatch} operator={"+"} opDisplay={"+"} />
            <NumbersBtns dispatch={dispatch} digit={7} />
            <NumbersBtns dispatch={dispatch} digit={8} />
            <NumbersBtns dispatch={dispatch} digit={9} />
            <OperatorsBtns dispatch={dispatch} operator={"-"} opDisplay={"−"} />
            <NumbersBtns dispatch={dispatch} digit={"."} />
            <NumbersBtns dispatch={dispatch} digit={0} />
            <button
              className="span-2"
              onClick={() => {
                dispatch({ action: ACTIONS.RESULT });
              }}
            >
              =
            </button>
          </div>
        </div>
        <footer>
          <span>Made by 8xMohab</span>
          <span>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://twitter.com/8xMohab"
            >
              <i className="fa-brands fa-twitter fa-2x"></i>
            </a>
          </span>
          <span>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/8xMohab/"
            >
              <i className="fa-brands fa-github fa-2x"></i>
            </a>
          </span>
          <span>vmargx@gmail.com</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
