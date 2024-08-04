import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

export interface Item {
  id?: number;
  createdDate: number;
  emotionId: number;
  content: string;
}

interface InitAction {
  type: "INIT";
  data: Item[];
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

type Action = InitAction | CreateAction | UpdateAction | DeleteAction;

interface DiaryDispatchContext {
  onCreate: (item: Item) => void;
  onUpdate: (item: Item) => void;
  onDelete: (id: number) => void;
}

function reducer(state: Item[], action: Action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      nextState = [action.data, ...state];
      break;
    case "UPDATE":
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    case "DELETE":
      nextState = state.filter(
        (item) => String(item.id) !== String(action.data.id)
      );
      break;
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext<Item[]>([]);
export const DiaryDispatchContext = createContext<DiaryDispatchContext>({
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, dispatch] = useReducer(reducer, []);
  const id = useRef(1);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");

    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData: Item[] = JSON.parse(storedData);
    let maxId = 0;

    parsedData.forEach((item: Item) => {
      if (item.id! > maxId) {
        maxId = item.id!;
      }
    });

    id.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

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

  if (isLoading) {
    return <div>데이터 로딩중입니다 ...</div>;
  }

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
