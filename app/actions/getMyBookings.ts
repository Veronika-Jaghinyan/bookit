'use server';
import { createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import checkAuth from './checkAuth';

async function getMyBookings() {
  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }
  try {
    const data = await createSessionClient(sessionCookie.value);
    const databases = data?.databases;

    //Get user's id
    const userData = await checkAuth();
    const user = userData?.user;
    if (!user) {
      console.log('You should be authenticated to book a room');
      return;
    }

    // Fetch user's bookings
    if (
      !databases ||
      !process.env.NEXT_PUBLIC_APPWRITE_DATABASE ||
      !process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS
    )
      return;

    // Fetch bookings
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal('user_id', user.id)]
    );

    return bookings;
  } catch (error) {
    console.log("Failed to get user's bookings", error);
    redirect('/error');
  }
}

export default getMyBookings;
