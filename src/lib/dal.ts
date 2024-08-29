import 'server-only'
import { cache } from 'react';

import { cookies } from 'next/headers';
import { decrypt } from './session';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

export const verifySession = async () => {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: session.userId.toString() };
}

// redundant considering getUserData ?
export const getUser = cache(async () => {
  // duplicate see /actions.ts
  const session = await verifySession();
  if (!session) return null;

  try {
    // needs validation?
    const result = await sql`SELECT id FROM Users WHERE id = ${session.userId}`;
    const user = result.rows[0];
    return user;
  } catch (error) {
    console.error(error);
  }
})