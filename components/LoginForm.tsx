'use client';

import { useActionState } from 'react';
import { authenticate, type LoginState } from '@/app/login/actions';

const initialState: LoginState = {};

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, action, pending] = useActionState(authenticate, initialState);

  return (
    <form className="meeting-editor login-form" action={action}>
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <label className="form-field" htmlFor="username">
        Username
        <input id="username" name="username" autoComplete="username" required />
      </label>
      <label className="form-field" htmlFor="password">
        Password
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.error && <p className="form-status" role="alert">{state.error}</p>}
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={pending}>
          {pending ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}
