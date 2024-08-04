import { getEmtionImages } from "../utils/get-emotion-images";
import Button from "./Button";
import "./DiaryItem.css";
import { type Item } from "../App";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotionId, createdDate, content }: Item) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem" onClick={() => nav(`/diary/${id}`)}>
      <div className={`img-section img-section-${emotionId}`}>
        <img src={getEmtionImages(emotionId)} />
      </div>
      <div className="info-section">
        <div className="created-date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button-section">
        <Button
          text={"수정하기"}
          onClick={(e) => {
            e.stopPropagation();
            nav(`/edit/${id}`);
          }}
        />
      </div>
    </div>
  );
};

export default DiaryItem;
