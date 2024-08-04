import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";

const EMOTION_LIST = [
  {
    emotionId: 1,
    emotionName: "완전 좋음",
  },
  {
    emotionId: 2,
    emotionName: "좋음",
  },
  {
    emotionId: 3,
    emotionName: "그럭저럭",
  },
  {
    emotionId: 4,
    emotionName: "나쁨",
  },
  {
    emotionId: 5,
    emotionName: "끔찍함",
  },
];

const Editor = () => {
  const emotionId = 1;

  return (
    <div className="Editor">
      <section className="date-section">
        <h4>오늘의 날짜</h4>
        <input type="date" />
      </section>
      <section className="emotion-section">
        <h4>오늘의 감정</h4>
        <div className="emotion-list-wrapper">
          {EMOTION_LIST.map((item) => (
            <EmotionItem
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content-section">
        <h4>오늘의 일기</h4>
        <textarea placeholder="오늘은 어땠나요?" />
      </section>
      <section className="button-section">
        <Button text={"취소하기"} />
        <Button text={"작성완료"} type={"POSITIVE"} />
      </section>
    </div>
  );
};

export default Editor;
