import "../../mrv-styles/mrvAllStyles.css";

import { useImmer, useImmerReducer } from "use-immer";

import { Outlet } from "react-router";

function Exchanges() {
  const [exchSession, setExchSession] = useImmer({
    activePanels: {
      left: null,
      main: null,
      right: null,
      mainClassName: "something"
    },
  });


  return (
    <section className={`mrv-top`}>
      <Outlet
        context={{
          exchSession: exchSession,
          setExchSession: setExchSession,
        }}
      />
    </section>
  );
}

export default Exchanges;


/*

  const [todos, dispatchTodos] = useImmerReducer(
    (draft, action) => {
      switch (action.type) {
        case "toggle":
          const todo = draft.find((todo) => todo.id === action.id);
          todo.done = !todo.done;
          break;
        case "add":
          draft.push({
            id: action.id,
            title: "A new todo",
            done: false,
          });
          break;
        default:
          break;
      }
    },
    [
      {
        id: 12345,
        title: "A new todo",
        done: false,
      },
    ]
  );

*/