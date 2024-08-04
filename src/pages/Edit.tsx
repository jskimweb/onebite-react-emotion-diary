import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext, type Item } from "../App";
import useDiary from "../hooks/useDiary";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const currDiaryItem = useDiary(Number(params.id));

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(Number(params.id));
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input: {
    createdDate: Date;
    emotionId: number;
    content: string;
  }) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate({
        id: Number(params.id),
        createdDate: input.createdDate.getTime(),
        emotionId: input.emotionId,
        content: input.content,
      });
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button
            text={"삭제하기"}
            type={"NEGATIVE"}
            onClick={() => onClickDelete()}
          />
        }
      />
      <Editor initData={currDiaryItem as Item} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
