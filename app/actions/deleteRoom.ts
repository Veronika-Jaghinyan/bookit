'use server';
import { createAdminClient, createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function deleteRoom(roomId: any) {
  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const data = await createSessionClient(sessionCookie.value);
    const storageData = await createAdminClient();

    const databases = data?.databases;
    const account = data?.account;
    const storage = storageData?.storage;

    // Get user's id
    const user = await account?.get();
    const userId = user?.$id;

    // Fetch user's rooms
    if (
      !databases ||
      !userId ||
      !process.env.NEXT_PUBLIC_APPWRITE_DATABASE ||
      !process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
    )
      return;

    // Fetch rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal('user_id', userId)]
    );

    // Find room to delete
    const roomToDelete = rooms.find((room: any) => room.$id === roomId);

    // Delete the room
    if (roomToDelete) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        roomToDelete.$id
      );
      if (roomToDelete.image && storage) {
        try {
          // Deleting image
          await storage.deleteFile('rooms', roomToDelete.image);
        } catch (error) {
          console.log('Error deleting image', error);
          return {
            error: 'Error deleting image',
          };
        }
      } else {
        console.log('No image file found');
      }

      revalidatePath('/rooms/my', 'layout');
      revalidatePath('/', 'layout');
      return {
        success: true,
      };
    } else {
      return {
        error: 'Room not found',
      };
    }
  } catch (error) {
    console.log('Failed to delete the room');
    return {
      error: 'Failed to delete the room'
    }
  }
}

export default deleteRoom;
