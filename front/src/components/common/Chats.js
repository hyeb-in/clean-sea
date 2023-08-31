import { Image } from "react-bootstrap";
import TextBubble from "./microComponents/TextBubble";

const Chats = () => {
  return (
    <div className="chats-container">
      <div className="bubbles-container">
        <div className="bubbles__row">
          <TextBubble className="bubble left" text="어디로갈까" />

          <TextBubble className="bubble right" text="해번이어쩌구" />
        </div>
        <div className="bubbles__row">
          <TextBubble className="bubble left" text="어쩍구저쩌구" />

          <TextBubble className="bubble right" text="맞아" />
        </div>
      </div>
      <div className="animal-container">
        <Image
          className="seagull animal"
          src="./image/dolphin.png" // 이미지 파일 경로로 변경
        />
        <Image
          className="dolphin animal"
          src="./image/seagull.png" // 이미지 파일 경로로 변경
        />
      </div>
    </div>
  );
};

export default Chats;
