'use client'; //Next.js 13버전부터 App Router에서 도입된 'client Component' 선언문

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';  //홈으로 클릭시 메인으로 돌아각 위함
// import axios from 'axios';

const RegisterPage = () => {

  // 상태변수
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  // 홈으로 메뉴 클리깃 메인으로 돌가기 위해 router설정
  const router = useRouter();

  // 값 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // const handleSubmit=async(e)=>{
  //   e.preventDefault();
  //   if(form.username==='' || form.password===''){
  //     return alert('아이디, 비밀번호를 입력해주세요');
  //   }
  //   try{
  //     const {data} = await axios.post('/api/register',form);
  //     alert('회원가입 성공 홈으로 이동합니다.');
  //     router.push('/');
  //   }catch(err){
  //     alert('오류발생'+err);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form), //form객체를 json 문자열로 변환하여 전송을 한다.
    });

    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      data = { message: '서버 응답이 올바르지 않습니다.' };
    }

    if (res.ok) {
      alert('회원가입이 완료되었습니다.');
      setForm({ username: '', password: '' });
      router.push('/'); //메인페이지로 이동
    } else {
      alert(data.message);  //서버가 보낸 메세지를 출력한다.
    }
  }

  return (
    <>
      <section>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor='username'>아이디: </label>
            <input type='text' id='username' name='username' placeholder='아이디' required onChange={handleChange} value={form.username} />
          </p>

          <p>
            <label>비밀번호</label>
            <input type='password' id='password' name='password' placeholder='비밀번호' required onChange={handleChange} value={form.password} />
          </p>

          <p>
            <input type='submit' value='가입하기' />
            <Link href='/' title='홈'>홈으로</Link>&#10072;&nbsp;
            <Link href='/login' title='로그인'>로그인</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default RegisterPage;