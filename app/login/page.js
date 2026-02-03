'use client';

import React,{useState} from 'react';
import Link from 'next/link';

const LoginPage = () => {

  const [form, setForm] = useState({
    username:'',
    password:''
  });

  const handleChange=(e)=>{
    const { name, value } = e.target;
    setForm((prev)=>({
      ...prev,
      [name]:value
    }));
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const res = await fetch('/api/login',{
      method:'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(form),
    });
  
    const data = await res.json();
    if(res.ok){
      alert('로그인 성공!');
      //토큰 저장
      localStorage.setItem('token', data.token);

      window.location.href='/';
    }else{
      alert(data.message||'로그인 실패');
    }
  }
  return (
    <>
      <section>
        <h2>로그인 폼</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor='username'>아이디 :</label>
            <input type='text' id='username' name='username' required placeholder='아이디' onChange={handleChange} value={form.username} />
          </p>

          <p>
            <label htmlFor='password'>패스워드: </label>
            <input type='password' id='password' name='password' placeholder='패스워드' required onChange={handleChange} value={form.password} />
          </p>

          <p>
            <input type='submit' value='로그인' />
          </p>

          <Link href='/idsearch'>아이디 찾기</Link> &#10072; &nbsp;
          <Link href='/pwsearch'>비밀번호 찾기</Link> &#10072; &nbsp;
          <Link href='/register'>회원가입</Link>
          
        </form>
      </section>
    </>
  );
};

export default LoginPage;