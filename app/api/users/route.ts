// app/api/users/route.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, phone, city, userType } = await req.json();

  if (!name || !phone || !city || !userType) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name,
      phone,
      city,
      userType,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'User created', id: docRef.id });
  } catch (error) {
    console.error('Firestore error:', error);
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
