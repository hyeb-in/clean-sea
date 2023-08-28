import { FOOTER_HEIGHT } from "../../../constants";

function Footer() {
  const footerStyle = {
    background: "#4B89DC",
    color: "#FFFFFF",
    fontFamily: "Arial, sans-serif",
    // position: "relative",
    // transform: "translateY(-100%)",
    width: "100%",
    //   minWidth: "833px",
    display: "flex",
    //   justifyContent: "center",
    alignItems: "center",
  };

  const contentStyle = {
    width: "1000px",
    height: `${FOOTER_HEIGHT}px`,
    padding: "30px",
  };

  const textStyle = {
    fontSize: "15px",
    marginBottom: "10px",
  };

  const linkStyle = {
    fontSize: "12px",
    fontWeight: "520",
    marginRight: "20px",
  };

  return (
    <div style={footerStyle}>
      <div style={contentStyle}>
        <div style={textStyle}>
          명칭: DATATEAM2 | 대표 태양인 | 사업자등록번호 120-87-09965
        </div>
        <div style={textStyle}>주소: 여러부우운 저 많이 보고 시퍼써어어어</div>
        <div style={textStyle}>
          전화 1577-2479 | 이메일 yeoleobun@missyou.me
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={linkStyle}>서비스 이용약관</span>
          <span style={linkStyle}>개인정보처리방침</span>
          <span style={linkStyle}>업데이트</span>
          <span style={linkStyle}>고객 문의</span>
          <span style={linkStyle}>Contact Us</span>
        </div>
        <div style={{ fontSize: "12px", color: "#FFFFFF", marginTop: "10px" }}>
          Copyright ⓒ 2023-2023 DATATEAM2 Inc. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
