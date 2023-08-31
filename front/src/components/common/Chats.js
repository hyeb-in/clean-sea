import TextBubble from "./microComponents/TextBubble";

const Chats = () => {
  return (
    <div>
      <TextBubble className="speech-bubble left" text="어디로갈까"></TextBubble>
      <TextBubble
        className="speech-bubble right"
        text="해번이어쩌구"
      ></TextBubble>
      <TextBubble
        className="speech-bubble left"
        text="어쩍구저쩌구"
      ></TextBubble>
      <TextBubble className="speech-bubble right" text="맞아"></TextBubble>
    </div>
  );
};

export default Chats;
