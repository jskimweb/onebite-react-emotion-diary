import "./App.css";
import { useReducer, useRef, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";
import { MOCK_DATA } from "./utils/constants.ts";

export interface Item {
  id?: number;
  createdDate: number;
  emotionId: number;
  content: string;
}

interface CreateAction {
  type: "CREATE";
  data: Item;
}

interface UpdateAction {
  type: "UPDATE";
  data: Item;
}

interface DeleteAction {
  type: "DELETE";
  data: { id: number };
}

type Action = CreateAction | UpdateAction | DeleteAction;

interface DiaryDispatchContext {
  onCreate: (item: Item) => void;
  onUpdate: (item: Item) => void;
  onDelete: (id: number) => void;
}

function reducer(state: Item[], action: Action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.data.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext<Item[]>([]);
export const DiaryDispatchContext = createContext<DiaryDispatchContext>({
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
});

function App() {
  const [items, dispatch] = useReducer(reducer, MOCK_DATA);
  const id = useRef(4);

  const onCreate = ({ createdDate, emotionId, content }: Item) => {
    dispatch({
      type: "CREATE",
      data: {
        id: id.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = ({ id, createdDate, emotionId, content }: Item) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id: number) => {
    dispatch({
      type: "DELETE",
      data: { id },
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={items}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
