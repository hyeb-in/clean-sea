import mongoose from "mongoose";

const url = process.env.MONGODB_URL;

mongoose.connect("mongodb://localhost:27017/test");
const db = mongoose.connection;

db.on("connected", () =>
  console.log("✅ 정상적으로 mongoDB서버에 연결되었습니다. 👻 " + url)
);

db.on("error", (error: Error) =>
  console.log("❌ mongoDB연결에 실패하였습니다... 😢\n " + url + "\n" + error)
);
