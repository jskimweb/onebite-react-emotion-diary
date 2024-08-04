import { getEmtionImages } from "../utils/get-emotion-images";
import "./Viewer.css";
import { EMOTION_LIST } from "../utils/constants";

const Viewer = ({
  emotionId,
  content,
}: {
  emotionId: number;
  content: string;
}) => {
  const emotionItem = EMOTION_LIST.find((item) => item.emotionId === emotionId);

  return (
    <div className="Viewer">
      <section className="img-section">
        <h4>오늘의 감정</h4>
        <div className={`emotion-img-wrapper emotion-img-wrapper-${emotionId}`}>
          <img src={getEmtionImages(emotionId)} />
          <div>{emotionItem?.emotionName}</div>
        </div>
      </section>
      <section className="content-section">
        <h4>오늘의 일기</h4>
        <div className="content-wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
