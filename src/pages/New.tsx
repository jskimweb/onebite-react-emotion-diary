import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();
  usePageTitle("새 일기 쓰기");

  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = "새 일기 쓰기";
  }, []);

  const onSubmit = (input: {
    createdDate: Date;
    emotionId: number;
    content: string;
  }) => {
    onCreate({
      createdDate: input.createdDate.getTime(),
      emotionId: input.emotionId,
      content: input.content,
    });
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
