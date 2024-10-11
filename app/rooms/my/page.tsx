import getMyRooms from '@/app/actions/getMyRooms';
import Heading from '@/components/Heading';
import MyRoomCard from '@/components/MyRoomCard';

const MyRooms = async () => {
  const rooms = await getMyRooms();

  return (
    <>
      <Heading title='My Room Listings' />
      {rooms?.length ? (
        rooms.map((room: any) => (
          <MyRoomCard roomId={room.$id} roomName={room.name} key={room.$id} />
        ))
      ) : (
        <p className='text-center'>Nothing to show</p>
      )}
    </>
  );
};

export default MyRooms;
