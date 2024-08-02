import "./Button.css";

interface Props {
  text: string;
  type?: "DEFAULT" | "POSITIVE" | "NEGATIVE";
  onClick: () => void;
}

const Button = ({ text, type = "DEFAULT", onClick }: Props) => {
  return (
    <button className={`Button Button_${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
