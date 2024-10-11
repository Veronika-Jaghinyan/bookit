import Link from 'next/link';
import CancelBookingButton from './CancelBookingButton';

type Props = {
  booking: {
    check_in: string;
    check_out: string;
    $id: string;
    room_id: {
      name: string;
      $id: string;
    };
  };
};

const BookingCard = ({ booking }: Props) => {
  const fromatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { month: 'short' };
    //@ts-expect-error TO BE FIXED!
    const month = date.toLocaleString('en-US', options, { timeZone: 'UTC' });
    // Get date
    const day = date.getUTCDate();

    // Format time to UTC 12-hour
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    };
    //@ts-expect-error TO BE FIXED!
    const time = date.toLocaleString('en-US', timeOptions);
    // Final formatted string
    return `${month} ${day} at ${time}`;
  };
  
  return (
    <div className='mt-4 flex flex-col items-start justify-between rounded-lg bg-white p-4 shadow sm:flex-row sm:items-center'>
      <div>
        <h4 className='text-lg font-semibold'>{booking.room_id.name}</h4>
        <p className='text-sm text-gray-600'>
          <strong>Check In:</strong> {fromatDate(booking.check_in)}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Check Out:</strong> {fromatDate(booking.check_out)}
        </p>
      </div>
      <div className='mt-2 flex w-full flex-col sm:mt-0 sm:w-auto sm:flex-row sm:space-x-2'>
        <Link
          href={`/rooms/${booking.room_id.$id}`}
          className='mb-2 w-full rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-700 sm:mb-0 sm:w-auto'
        >
          View Room
        </Link>
        <CancelBookingButton bookingId={booking.$id} />
      </div>
    </div>
  );
};

export default BookingCard;
