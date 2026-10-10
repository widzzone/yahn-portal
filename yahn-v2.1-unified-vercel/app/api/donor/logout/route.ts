import { NextResponse } from 'next/server';
export async function POST() {
  const res = NextResponse.json({ status: 'success' });
  res.cookies.set('yahn_donor_session', '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
