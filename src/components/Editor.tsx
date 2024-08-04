import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const getStringedDate = (date: Date) => {
  const year = String(date.getFullYear());
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());

  if (Number(month) < 10) {
    month = "0" + month;
  }

  if (Number(day) < 10) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
};

const Editor = ({
  onSubmit,
}: {
  onSubmit: (input: {
    createdDate: Date;
    emotionId: number;
    content: string;
  }) => void;
}) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 1,
    content: "",
  });
  const nav = useNavigate();

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: name === "createdDate" ? new Date(value) : value,
    });
  };

  const onClickSubmit = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date-section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          type="date"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
        />
      </section>
      <section className="emotion-section">
        <h4>오늘의 감정</h4>
        <div className="emotion-list-wrapper">
          {EMOTION_LIST.map((item) => (
            <EmotionItem
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
            />
          ))}
        </div>
      </section>
      <section className="content-section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button-section">
        <Button text={"취소하기"} onClick={() => nav(-1)} />
        <Button text={"작성완료"} type={"POSITIVE"} onClick={onClickSubmit} />
      </section>
    </div>
  );
};

export default Editor;
