import { NextRequest, NextResponse } from "next/server";

const responseBank = [
  "你确定你不是已经知道答案了吗？",
  "如果你不问这个问题，你会少一些痛苦吗？",
  "那你想从谁那儿得到肯定呢？",
  "你是想验证什么，还是想逃避什么？",
  "那如果我不回答，你会自己去思考吗？",
  "你在问我，还是在问你自己？",
  "如果没人回应你，你还会继续追问吗？",
  "你确定世界欠你一个回答吗？",
  "你在期待答案，还是在期待一个共鸣？",
  "你说这不是一个伪命题吗？",
  "你问的是『{input}』，但你真正想知道的，是不是别的什么？",
  "当你说『{input}』的时候，你期待的是答案，还是一种回应？",
  "如果没人回应你这个『{input}』的问题，你还会继续追问吗？",
  "你问『{input}』，可你真的准备好面对它的答案了吗？",
  "问题是『{input}』，那你有没有试着问问自己——你在逃避什么？",
];

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  const pick = () => responseBank[Math.floor(Math.random() * responseBank.length)];
  const answer = `${pick()}（关于你说的：“${question}”）`;

  return NextResponse.json({ answer });
}
