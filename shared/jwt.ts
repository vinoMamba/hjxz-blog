import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const secret = process.env.JWT_SECRET || 'secret';

export async function sign(payload: JWTPayload,): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24; // one hour

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string): Promise<any> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
}
