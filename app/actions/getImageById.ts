function getImageById(image: any) {
  if (!image) return '/images/no-image.jpg';

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${image}/view?project=${projectId}`;

  return imageUrl;
}

export default getImageById;
