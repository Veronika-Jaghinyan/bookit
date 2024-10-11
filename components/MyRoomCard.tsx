import Link from 'next/link';
import { FaEye } from 'react-icons/fa';
import DeleteRoomButton from './DeleteRoomButton';

type Props = {
  roomName: string;
  roomId: string;
};

const MyRoomCard = ({ roomName, roomId }: Props) => {
  return (
    <div className='mt-4 flex flex-col items-center justify-between rounded-lg bg-white p-4 shadow sm:flex-row'>
      <div className='flex flex-col'>
        <h4 className='text-lg font-semibold'>{roomName}</h4>
      </div>
      <div className='mt-2 flex w-full flex-col sm:mt-0 sm:w-auto sm:flex-row sm:space-x-2'>
        <Link
          href={`/rooms/${roomId}`}
          className='mb-2 w-full rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-700 sm:mb-0 sm:w-auto'
        >
          <FaEye className='mr-1 inline' /> View
        </Link>

        <DeleteRoomButton roomId={roomId} />
      </div>
    </div>
  );
};

export default MyRoomCard;
