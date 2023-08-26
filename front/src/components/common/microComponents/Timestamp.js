const Timestamp = ({ createdAt, className }) => {
  const currentTime = new Date(); // 현재 시간
  const createdAtgg = new Date(createdAt); // 주어진 시간

  const timeDifference = currentTime.getTime() - createdAtgg.getTime(); // 밀리초 단위의 차이

  const minutesPassed = Math.floor(timeDifference / (1000 * 60));
  const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60)); // 시간으로 변환
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 일자로 변환

  return (
    <div className="text-timestamp comment__timestamp">
      {minutesPassed < 1 && "방금 전"}
      {minutesPassed < 60 && minutesPassed > 0 && `${minutesPassed}분 전`}
      {minutesPassed >= 60 && hoursPassed < 24 && `${hoursPassed}시간 전`}
      {minutesPassed >= 60 && hoursPassed >= 24 && `${daysPassed}일 전`}
    </div>
  );
};

export default Timestamp;
