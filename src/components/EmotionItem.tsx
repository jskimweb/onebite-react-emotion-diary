import "./EmotionItem.css";
import { getEmtionImages } from "../utils/get-emotion-images";

const EmotionItem = ({
  emotionId,
  emotionName,
  isSelected,
  onClick,
}: {
  emotionId: number;
  emotionName: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`EmotionItem ${
        isSelected ? `EmotionItem-on-${emotionId}` : ""
      } `}
      onClick={onClick}
    >
      <img className="emotion-img" src={getEmtionImages(emotionId)} />
      <div className="emotion-name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
