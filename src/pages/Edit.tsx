import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext, type Item } from "../App";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const items = useContext(DiaryStateContext);
  const [currDiaryItem, setCurrDiaryItem] = useState<Item>();

  useEffect(() => {
    const currentDiaryItem = items.find(
      (item) => item.id === Number(params.id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }

    setCurrDiaryItem(currentDiaryItem);
  }, [params.id, items]);

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
