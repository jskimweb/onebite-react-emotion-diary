import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import { useParams, useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../utils/get-stringed-date";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();
  const currDiaryItem = useDiary(Number(params.id));

  if (!currDiaryItem) return <div>데이터 로딩중...!</div>;

  const { createdDate, emotionId, content } = currDiaryItem;

  return (
    <div>
      <Header
        title={getStringedDate(new Date(createdDate))}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"수정하기"} onClick={() => nav(`/edit/${params.id}`)} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
