'use server';
import { createAdminClient } from '@/config/appwrite';
import { ID } from 'node-appwrite';

async function createUser(previousState: any, formData?: any) {
  const email = formData.email;
  const name = formData.name;
  const password = formData.password;
  const confirmPassword = formData.confirm - password;

  if (!email || !name || !email) {
    return {
      error: 'PLease fill out all the fields',
    };
  }
  if (password?.length < 8) {
    return {
      error: 'Password must be at least 8 characters long',
    };
  }
  if (password !== confirmPassword) {
    return {
      error: 'Passwords do not match ',
    };
  }

  // Get account instance
  const accountObj = await createAdminClient();
  const account = accountObj?.account;
  if (!account) return;

  try {
    // Create user
    await account.create(ID.unique(), email, password, name);

    return {
      success: true,
    };
  } catch (error) {
    console.log('Registration Error:', error);
    return {
      error: 'Could not register user',
    };
  }
}

export default createUser;
