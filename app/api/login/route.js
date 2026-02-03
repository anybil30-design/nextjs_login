// import { NextResponse } from 'next/server';
import db from "@/lib/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req){
  const {username, password} = await req.json();
  const SECRET_KEY = 'test';

  const [users] = await db.query('SELECT * FROM users WHERE username=?', [username]);

  // 3. 같은 아이디가 존재하지 않는다면 메세지 띄우기
  if(users.length===0){
    return new Response(JSON.stringify(
      {message:'존재하는 아이디가 없습니다.'}
    ),
    {status:404});
  }

  const user = users[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    return new Response(JSON.stringify(
      {message:'비밀번호가 일치하지 않습니다. 다시 확인하세요.'}
    ),{status:401});
  }

  const token = jwt.sign({id:user.id, username:user.username}, SECRET_KEY, {expiresIn:'1h'});

  return new Response(JSON.stringify({token}),
  {status:200});
}