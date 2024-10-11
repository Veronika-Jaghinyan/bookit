'use client';
import cancelBooking from '@/app/actions/cancelBooking';
import { toast } from 'react-toastify';

type Props = {
  bookingId: string;
};

const CancelBookingButton = ({ bookingId }: Props) => {
  const handleCancelBooking = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this booking'
    );
    if (confirmed) {
      try {
        await cancelBooking(bookingId);
        toast.success('Successfully canceled');
      } catch (error) {
        console.log('Failed to cancel the booking', error);
        toast.error('Failed to cancel the booking');
      }
    }
  };
  
  return (
    <button
      onClick={handleCancelBooking}
      className='w-full rounded bg-red-500 px-4 py-2 text-center text-white hover:bg-red-700 sm:w-auto'
    >
      Cancel Booking
    </button>
  );
};

export default CancelBookingButton;
