'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import bookRoom from '@/app/actions/bookRoom';
import { Room } from '@/types';

type Props = {
  room: Room;
};

const BookingForm = ({ room }: Props) => {
  const [state, formAction] = useFormState(bookRoom, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    } else if (state?.success) {
      toast.success('Room has been booked');
      router.push('/bookings');
    }
  }, [state]);

  return (
    <div className='mt-6'>
      <h2 className='text-xl font-bold'>Book this Room</h2>
      <form className='mt-4' action={formAction}>
        <input type='hidden' name='room_id' value={room.$id} />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <div>
            <label
              htmlFor='check_in_date'
              className='block text-sm font-medium text-gray-700'
            >
              Check-In Date
            </label>
            <input
              type='date'
              id='check_in_date'
              name='check_in_date'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label
              htmlFor='check_in_time'
              className='block text-sm font-medium text-gray-700'
            >
              Check-In Time
            </label>
            <input
              type='time'
              id='check_in_time'
              name='check_in_time'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label
              htmlFor='check_out_date'
              className='block text-sm font-medium text-gray-700'
            >
              Check-Out Date
            </label>
            <input
              type='date'
              id='check_out_date'
              name='check_out_date'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label
              htmlFor='check_out_time'
              className='block text-sm font-medium text-gray-700'
            >
              Check-Out Time
            </label>
            <input
              type='time'
              id='check_out_time'
              name='check_out_time'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              required
            />
          </div>
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            className='flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2'
          >
            Book Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
