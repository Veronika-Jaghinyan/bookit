'use client';
import deleteRoom from '@/app/actions/deleteRoom';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

type Props = {
    roomId: string;
  };

const DeleteRoomButton = ({roomId} : Props) => {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this room'
    );
    if (confirmed) {
      try {
        await deleteRoom(roomId);
        toast.success('Successfully deleted');
      } catch (error) {
        console.log('Failed to delete the room', error);
        toast.error('Failed to delete the room');
      }
    }
  };
  
  return (
    <button
      onClick={handleDelete}
      className='mb-2 w-full rounded bg-red-500 px-4 py-2 text-center text-white hover:bg-red-700 sm:mb-0 sm:w-auto'
    >
      <FaTrash className='mr-1 inline' /> Delete
    </button>
  );
};

export default DeleteRoomButton;
