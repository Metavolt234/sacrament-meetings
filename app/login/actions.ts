'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { getAdminRedirectTo } from '@/lib/auth-redirect';

export interface LoginState {
  error?: string;
}

export async function authenticate(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  formData.set('redirectTo', getAdminRedirectTo(formData.get('redirectTo')));

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid username or password.' };
    }
    throw error;
  }

  return {};
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: '/' });
}
