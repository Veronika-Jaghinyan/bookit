'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function cancelBooking(bookingId: any) {
  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const data = await createSessionClient(sessionCookie.value);

    const databases = data?.databases;
    const account = data?.account;

    // Get user's id
    const user = await account?.get();
    const userId = user?.$id;

    // Fetch user's bookings
    if (
      !databases ||
      !userId ||
      !process.env.NEXT_PUBLIC_APPWRITE_DATABASE ||
      !process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS
    )
      return;

    // Fetch bookings
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal('user_id', userId)]
    );

    // Find booking to cancel
    const bookingToCancel = bookings.find((booking: any) => booking.$id === bookingId);

    // Cancel the booking
    if (bookingToCancel) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
        bookingToCancel.$id
      );

      revalidatePath('/bookings', 'layout');
      revalidatePath('/', 'layout');
      return {
        success: true,
      };
    } else {
      return {
        error: 'Booking not found',
      };
    }
  } catch (error) {
    console.log('Failed to cancel the booking');
    return {
      error: 'Failed to cancel the booking'
    }
  }
}

export default cancelBooking;
