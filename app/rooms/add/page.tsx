'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import createRoom from '@/app/actions/createRoom';
import Heading from '@/components/Heading';

const AddRooms = ({}) => {
  const [state, formAction] = useFormState(createRoom, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    } else if (state?.success) {
      toast.success('Successfully added');
      router.push('/');
    }
  }, [state]);

  return (
    <>
      <Heading title='Add Room' />
      <div className='w-full rounded-lg bg-white p-6 shadow-lg'>
        <form action={formAction}>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='mb-2 block font-bold text-gray-700'
            >
              Room Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='w-full rounded border px-3 py-2'
              placeholder='Enter a name (Large Conference Room)'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='description'
              className='mb-2 block font-bold text-gray-700'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              className='h-24 w-full rounded border px-3 py-2'
              placeholder='Enter a description for the room'
              required
            ></textarea>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='sqft'
              className='mb-2 block font-bold text-gray-700'
            >
              Square Feet
            </label>
            <input
              type='number'
              id='sqft'
              name='sqft'
              className='w-full rounded border px-3 py-2'
              placeholder='Enter room size in ft'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='capacity'
              className='mb-2 block font-bold text-gray-700'
            >
              Capacity
            </label>
            <input
              type='number'
              id='capacity'
              name='capacity'
              className='w-full rounded border px-3 py-2'
              placeholder='Number of people the room can hold'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='price_per_hour'
              className='mb-2 block font-bold text-gray-700'
            >
              Price Per Hour
            </label>
            <input
              type='number'
              id='price_per_hour'
              name='price_per_hour'
              className='w-full rounded border px-3 py-2'
              placeholder='Enter price per hour'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='address'
              className='mb-2 block font-bold text-gray-700'
            >
              Address
            </label>
            <input
              type='text'
              id='address'
              name='address'
              className='w-full rounded border px-3 py-2'
              placeholder='Enter full address'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='location'
              className='mb-2 block font-bold text-gray-700'
            >
              Location
            </label>
            <input
              type='text'
              id='location'
              name='location'
              className='w-full rounded border px-3 py-2'
              placeholder='Location (Building, Floor, Room)'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='availability'
              className='mb-2 block font-bold text-gray-700'
            >
              Availability
            </label>
            <input
              type='text'
              id='availability'
              name='availability'
              className='w-full rounded border px-3 py-2'
              placeholder='Availability (Monday - Friday, 9am - 5pm)'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='amenities'
              className='mb-2 block font-bold text-gray-700'
            >
              Amenities
            </label>
            <input
              type='text'
              id='amenities'
              name='amenities'
              className='w-full rounded border px-3 py-2'
              placeholder='Amenities CSV (projector, whiteboard, etc.)'
              required
            />
          </div>

          {/* <!-- Image Upload --> */}
          <div className='mb-8'>
            <label
              htmlFor='image'
              className='mb-2 block font-bold text-gray-700'
            >
              Image
            </label>

            <input
              type='file'
              id='image'
              name='image'
              className='w-full rounded border px-3 py-2'
            />
          </div>

          <div className='flex flex-col gap-5'>
            <button
              type='submit'
              className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRooms;
