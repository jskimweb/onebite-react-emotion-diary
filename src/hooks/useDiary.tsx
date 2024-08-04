import { useContext, useState, useEffect } from "react";
import { DiaryStateContext, type Item } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id: number) => {
  const items = useContext(DiaryStateContext);
  const [currDiaryItem, setCurrDiaryItem] = useState<Item>();
  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = items.find((item) => item.id === id);

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }

    setCurrDiaryItem(currentDiaryItem);
  }, [id, items]);

  return currDiaryItem;
};

export default useDiary;
