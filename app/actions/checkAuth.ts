'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

async function checkAuth() {
  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    return {
      isAuthenticated: false,
    };
  }

  try {
    const accountObj = await createSessionClient(sessionCookie.value);
    const account = accountObj?.account;
    if (!account) return;
    const user = await account.get();

    return {
      isAuthenticated: true,
      user: {
        id: user.$id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.log('Auth error', error)
    return {
      isAuthenticated: false,
    };
  }
}

export default checkAuth;
