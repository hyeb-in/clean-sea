const mongoose = require("mongoose");
require('dotenv').config();
const url = process.env.MONGODB_URL;
mongoose.connect(url);
const db = mongoose.connection;
db.on("connected", () => console.log("✅ 정상적으로 mongoDB서버에 연결되었습니다. 👻 " + url));
db.on("error", (error) => console.log("❌ mongoDB연결에 실패하였습니다... 😢\n " + url + "\n" + error));
//# sourceMappingURL=index.js.map