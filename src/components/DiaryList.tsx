import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { type Item } from "../App";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }: { data: Item[] }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState<"latest" | "oldest">("latest");

  const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as "latest" | "oldest");
  };

  const getSortedData = () => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      if (sortType === "latest") {
        return Number(b.createdDate) - Number(a.createdDate);
      } else {
        return Number(a.createdDate) - Number(b.createdDate);
      }
    });

    return sortedData;
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu-bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
          onClick={() => nav("/new")}
        />
      </div>
      <div className="list-wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
