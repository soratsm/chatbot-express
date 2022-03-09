require("dotenv").config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const app = express();

// 外部アクセスの許可
app.use(
  cors({
    // アクセス許可するオリジン
    origin: process.env.ORIGIN,
    // レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    credentials: true,
    // レスポンスstatusを200に設定
    optionsSuccessStatus: 200,
  })
);

// バックエンドのフレームワーク等の隠蔽
app.disable("x-powered-by");

// リクエストのbodyをパースする設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const prisma = new PrismaClient();

// Get all chats
app.get("/api/v1/chats", async (req, res) => {
  const allChats = await prisma.questions.findMany({
    where: {
      deleted: false,
    },
    include: {
      answers: {
        select: {
          content: true,
          nextId: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!allChats) {
    res.status(404).send({ error: "Not Found!" });
  } else {
    res.status(200).json(allChats);
  }
});

const port = process.env.PORT || 3000;

app.listen(port);

console.log("Liste on port: " + port);
