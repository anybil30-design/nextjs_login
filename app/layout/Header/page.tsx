'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  return (
    <header>
      <h1>상단로고</h1>

      <p>
        {!isLogin ? (
          <>
            <Link href="/register">회원가입</Link>&#10072;&nbsp;
            <Link href="/login">로그인</Link>
          </>
        ) : (
          <Link href="/logout">로그아웃</Link>
        )}
      </p>
    </header>
  );
}
