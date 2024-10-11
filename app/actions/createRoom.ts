'use server';
import { createAdminClient } from '@/config/appwrite';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';
import checkAuth from './checkAuth';

async function createRoom(previousState: any, formdata: any) {
  // Get databases instance
  const data = await createAdminClient();
  const databases = data?.databases;
  const storage = data?.storage;

  try {
    const userData = await checkAuth();
    const user = userData?.user;

    if (!user) {
      return {
        error: 'You must be authenticated to create a room',
      };
    }

    if (
      !databases ||
      !storage ||
      !process.env.NEXT_PUBLIC_APPWRITE_DATABASE ||
      !process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
    ) {
      return;
    }

    // Uploading image
    let imageID: any;
    const image = formdata.get('image');

    if (image && image.size > 0 && image.name !== undefined) {
      try {
        // Upload
        const response = await storage.createFile('rooms', ID.unique(), image);
        imageID = response?.$id;
      } catch (error) {
        console.log('Error uploading image', error);
        return {
          error: 'Error uploading image',
        };
      }
    } else {
      console.log('No image file found');
      return {
        error: 'Please provide valid image file',
      };
    }

    // Create the room
    const newRoom = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      ID.unique(),
      {
        user_id: user.id,
        name: formdata.get('name'),
        description: formdata.get('description'),
        sqft: formdata.get('sqft'),
        capacity: formdata.get('capacity'),
        location: formdata.get('location'),
        address: formdata.get('address'),
        availability: formdata.get('availability'),
        price_per_hour: formdata.get('price_per_hour'),
        amenities: formdata.get('amenities'),
        image: imageID,
      }
    );
    revalidatePath('/', 'layout');
    return {
      success: true,
    };
  } catch (error: any) {
    console.log(error);
    const errMsg = error?.response?.message || 'An unexpected error';
    return {
      error: errMsg,
    };
  }
}

export default createRoom;
