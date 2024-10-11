'use server';
import { createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { DateTime } from 'luxon';

// Convert date string to a Luxon DateTime object in UTC
function toUTCDateTime(dateString: string) {
  return DateTime.fromISO(dateString, { zone: 'utc' }).toUTC();
}

// Check for overlapping date ranges
function dateRangesOverlap(
  checkIn1: DateTime,
  checkOut1: DateTime,
  checkIn2: DateTime,
  checkOut2: DateTime
) {
  return checkIn1 < checkOut2 && checkOut1 > checkIn2;
}

async function checkRoomAvailability(
  roomId: string,
  checkIn: string,
  checkOut: string
) {
  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }
  try {
    const data = await createSessionClient(sessionCookie.value);
    const databases = data?.databases;

    const checkInDateTime = toUTCDateTime(checkIn);
    const checkOutDateTime = toUTCDateTime(checkOut);

    // Fetch all bookings for the given room

    if (
      !databases ||
      !process.env.NEXT_PUBLIC_APPWRITE_DATABASE ||
      !process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS
    )
      return;

    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal('room_id', roomId)]
    );

    // Loop over bookings and check for overlaps

    for (const booking of bookings) {
      const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
      const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);
      if (
        dateRangesOverlap(
          checkInDateTime,
          checkOutDateTime,
          bookingCheckInDateTime,
          bookingCheckOutDateTime
        )
      ) {
        return false; // Overlap found, do not book;
      }
    }
    // No overlap found, continue to book
    return true;
  } catch (error) {
    console.log('Failed to check availability', error);
    return {
      error: 'Failed to check availability',
    };
  }
}

export default checkRoomAvailability;
