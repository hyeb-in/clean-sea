const mongoose = require("mongoose");

<<<<<<< HEAD
const url =
  process.env.MONGODB_URL ||
  // "mongodb+srv://user:user1234@cluster0.xwae34t.mongodb.net/";
  "mongodb://127.0.0.1:27017"
=======
const url = process.env.MONGODB_URL;
>>>>>>> feature/front2

mongoose.connect(url);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("✅ 정상적으로 mongoDB서버에 연결되었습니다. 👻 " + url)
);

db.on("error", (error: Error) =>
  console.log("❌ mongoDB연결에 실패하였습니다... 😢\n " + url + "\n" + error)
);
