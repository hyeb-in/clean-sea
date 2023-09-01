import { Image } from "react-bootstrap";
import TextBubble from "./microComponents/TextBubble";

const Chats = () => {
  return (
    <div className="chats-container">
      <div className="bubbles-container">
        <div className="bubbles__row">
          <TextBubble className="bubble left" text="좀 깨끗한 해수욕장 없을까?" />
          <TextBubble className="bubble right" text="그러게 저번에 거기 다녀오고 피부가 다 일어났어ㅠㅠ" />
        </div>
        <div className="bubbles__row">
          <TextBubble className="bubble left" text="좀 쉽고 빠르게 깨끗한 곳 찾고 싶은데.." />
          <TextBubble className="bubble right" text="어 여기 사이트 어때?" />
        </div>
        <div className="bubbles__row">
          <TextBubble className="bubble left" text="오 지도에 제일 깨끗한 지역이 바로 나오네?" />
          <TextBubble className="bubble right" text="응, 제일 깨끗한 곳도 순위별로 나와있고 후기도 남길 수 있어!" />
        </div>
        <div className="bubbles__row">
          <TextBubble className="bubble left" text="그럼 여기 참고해서 놀러갈까?" />
          <TextBubble className="bubble right" text="구래!" />
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
