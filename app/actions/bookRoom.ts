'use server';
import { createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { ID } from 'node-appwrite';
import checkAuth from './checkAuth';
import checkRoomAvailability from './checkRoomAvailability';

async function bookRoom(previousState: any, formData: any) {
  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }
  try {
    const data = await createSessionClient(sessionCookie.value);
    const databases = data?.databases;

    // Get user's id
    const userData = await checkAuth();
    const user = userData?.user;
    if (!user) {
      return {
        error: 'You should be authenticated to book a room',
      };
    }

    // Extract date and time from formData
    const checkInDate = formData.get('check_in_date');
    const checkOutDate = formData.get('check_out_date');

    const checkInTime = formData.get('check_in_time');
    const checkOutTime = formData.get('check_out_time');

    // Combine date and time to ISO 8601 format
    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;

    // Check if room is available
    const isAvailable = await checkRoomAvailability(
      formData.get('room_id'),
      checkInDateTime,
      checkOutDateTime
    );

    if (!isAvailable) {
      return {
        error: 'Room is not available for the selected time',
      };
    };

    const bookingData = {
      check_in: checkInDateTime,
      check_out: checkOutDateTime,
      user_id: user.id,
      room_id: formData.get('room_id'),
    };

    // Create booking
    if (
      !databases ||
      !process.env.NEXT_PUBLIC_APPWRITE_DATABASE ||
      !process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS
    )
      return;

    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      ID.unique(),
      bookingData
    );

    // Revalidate cache
    revalidatePath('/bookings', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    console.log('Failed to book the room', error);
    return {
      error: 'Something went wrong while booking the room',
    };
  }
}

export default bookRoom;
