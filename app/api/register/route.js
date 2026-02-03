import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "필수 항목 누락" },
        { status: 400 }
      );
    }

    // 중복 체크
    const [rows] = await db.query(
      "SELECT 1 FROM users WHERE username=? LIMIT 1",
      [username]
    );

    if (rows.length > 0) {
      return NextResponse.json(
        { message: "이미 사용중인 아이디입니다." },
        { status: 409 }
      );
    }

    // 비밀번호 해시 후 저장
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    return NextResponse.json(
      { message: "회원가입이 완료되었습니다." },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "서버 오류" },
      { status: 500 }
    );
  }
}
