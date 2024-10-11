import BookingCard from '@/components/BookingsCard';
import Heading from '@/components/Heading';
import getMyBookings from '../actions/getMyBookings';

const Bookings = async () => {
  const bookings = await getMyBookings();

  return (
    <>
      <Heading title='Bookings' />
      {bookings?.length ? (
        bookings.map((booking: any) => <BookingCard booking={booking} key={booking.$id} />)
      ) : (
        <p className='text-center'>Nothing to show</p>
      )}
    </>
  );
};

export default Bookings;
