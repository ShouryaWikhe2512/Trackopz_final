import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // 1. Get token from cookies
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // 2. Verify JWT
  let payload: any;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // 3. Find operator by phone (from JWT payload)
  const operator = await prisma.operator.findUnique({
    where: { phone: payload.phone },
    select: { username: true, profileImage: true }
  });

  if (!operator) {
    return NextResponse.json({ error: 'Operator not found' }, { status: 404 });
  }

  // 4. Return user info
  return NextResponse.json({
    username: operator.username,
    profileImage: operator.profileImage
  });
} 