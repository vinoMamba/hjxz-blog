import type { NextApiRequest, NextApiResponse } from 'next'
import { Result, UserInfo } from '../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<UserInfo|null>>
) {
  req.headers['Content-Type'] = 'application/json'
  if(req.method ==='POST'){
    const token = await getAccessToken()
    const result = await  fetch(`https://oapi.dingtalk.com/topapi/v2/user/getuserinfo?access_token=${token}`,{
      method:'POST',
      body:req.body,
     })
    const userData = await result.json()
    if(userData.errcode === 0){
      res.status(200).json({errcode:0,message:'获取用户信息成功',data:{userId:userData.result.userid,name:userData.result.name}})
    }else{
      res.status(500).json({errcode:1,message:'获取用户信息失败',data:null})
    }
  }
}


async function getAccessToken(){
  const key= process.env.APP_KEY
  const secret = process.env.APP_SECRET
  const res = await fetch(`https://oapi.dingtalk.com/gettoken?appkey=${key}&appsecret=${secret}`,{method:'GET'})
  const data = await res.json()
  return data.access_token
}
