import "./EmotionItem.css";
import { getEmtionImages } from "../utils/get-emotion-images";

const EmotionItem = ({
  emotionId,
  emotionName,
  isSelected,
}: {
  emotionId: number;
  emotionName: string;
  isSelected: boolean;
}) => {
  return (
    <div className={`EmotionItem ${isSelected ? `EmotionItem-on-${emotionId}` : ""} `}>
      <img className="emotion-img" src={getEmtionImages(emotionId)} />
      <div className="emotion-name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
