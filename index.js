const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");

let posts = []; // 글 데이터
// 파일 읽기
const readFile = fs.readFileSync("postDB.json", "utf-8");
// 오브젝트 코드로 변환
const jsonData = JSON.parse(readFile);
posts = [...jsonData];

// ejs를 view 엔진으로 설정
app.set("view engine", "ejs");

// 정적파일 경로 지정
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home
app.get("/", function (요청, 응답) {
  응답.render("pages/index.ejs", { posts });
});

// about
app.get("/about", function (req, res) {
  res.render("pages/about.ejs");
});

// 글쓰기 요청 /create
app.post("/create", (req, res) => {
  const post = req.body.post;

  // DB file에 글 저장
  posts.push(post);
  console.log(posts);
  fs.writeFileSync("postDB.json", JSON.stringify(posts));
  // 홈으로 이동
  res.redirect("/");
});

// 글삭제 요청 /delete
app.post("/delete/:id", (req, res) => {
  // id 번호
  const id = req.params.id;
  console.log(id);
  // id값에 해당하는 posts 삭제
  posts.splice(id, 1);
  fs.writeFileSync("postDB.json", JSON.stringify(posts));
  res.redirect("/");
});

const port = 3001;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
