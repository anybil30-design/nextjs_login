'use client';

import { useEffect } from "react";

export default function Logout(){
  useEffect(()=>{
    // 1. localStorage에서 토큰값 삭제
    localStorage.removeItem('token');

    // 2.로그아웃 알려줌
    alert('로그아웃 되었습니다.');
    
    //3. 메인페이지로 이동(리다이렉트)
    window.location.href='/';
  },[])
  return null;
}
