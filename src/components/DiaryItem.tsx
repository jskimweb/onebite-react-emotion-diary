import { getEmtionImages } from "../utils/get-emotion-images";
import Button from "./Button";
import "./DiaryItem.css";
import { type Item } from "../App";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotionId, createdDate, content }: Item) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <div
        className={`img-section img-section-${emotionId}`}
        onClick={() => nav(`/diary/${id}`)}
      >
        <img src={getEmtionImages(emotionId)} />
      </div>
      <div className="info-section" onClick={() => nav(`/edit/${id}`)}>
        <div className="created-date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button-section">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
