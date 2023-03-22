/**
 * 获取钉钉 access token
 */
export async function getAccessToken() {
  const key = process.env.APP_KEY
  const secret = process.env.APP_SECRET
  try {
    const res = await fetch(`https://oapi.dingtalk.com/gettoken?appkey=${key}&appsecret=${secret}`, { method: 'GET' })
    const data = await res.json()
    return {
      accessToken: data.access_token,
      expire: data.expires_in,
    }
  } catch (error) {
    console.error(error)
    return {
      accessToken: '',
      expire: 0,
    }
  }
}
/**
 * 获取用户信息
 */

export async function getUserByCode(code: string) {
  try {
    const form = new FormData()
    form.append('code', code)
    const { accessToken } = await getAccessToken()
    const data = await fetch(`https://oapi.dingtalk.com/topapi/v2/user/getuserinfo?access_token=${accessToken}`, {
      method: 'POST',
      body: form,
    })
    const { result } = await data.json()
    const userid = result.userid
    const data2 = await fetch(`https://oapi.dingtalk.com/topapi/v2/user/get?access_token=${accessToken}`, {
      method: 'POST',
      body: JSON.stringify({ userid })
    })
    const { result: result2 } = await data2.json()
    const user: User = {
      userId: result2.userid,
      avatar: result2.avatar,
      name: result2.name,
      email: result2.email,
      title: result2.title
    }
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
