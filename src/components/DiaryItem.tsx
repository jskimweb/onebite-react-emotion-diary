import { getEmtionImages } from "../utils/get-emotion-images";
import Button from "./Button";
import "./DiaryItem.css";

const DiaryItem = () => {
  const emotionId = 1;

  return (
    <div className="DiaryItem">
      <div className={`img-section img-section-${emotionId}`}>
        <img src={getEmtionImages(emotionId)} />
      </div>
      <div className="info-section">
        <div className="created-date">{new Date().toLocaleDateString()}</div>
        <div className="content">일기 컨텐츠</div>
      </div>
      <div className="button-section">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
