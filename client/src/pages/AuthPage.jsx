import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatusMessage('');

    if (isRegister && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await sendEmailVerification(userCredential.user);
        await signOut(auth);
        setStatusMessage('Verification email sent! Please confirm your email before signing in.');
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        if (!userCredential.user.emailVerified) {
          await signOut(auth);
          setError('Please verify your email address before logging in.');
          return;
        }
        navigate('/');
      }
    } catch (err) {
      const message = mapFirebaseError(err, isRegister);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const mapFirebaseError = (error, registering) => {
    const code = error?.code ?? '';
    const defaultMsg = registering
      ? 'Unable to create your account right now. Please try again.'
      : 'Unable to sign you in. Please double-check your credentials.';

    const messages = {
      'auth/invalid-email': 'That email address looks incorrect. Please use a valid email.',
      'auth/user-disabled': 'This account has been disabled. Reach out to support if you believe this is an error.',
      'auth/user-not-found': 'No account exists with that email. You can create one instead.',
      'auth/wrong-password': 'That password does not match this account. Try again or reset it.',
      'auth/email-already-in-use': 'An account already exists with that email. Please sign in instead.',
      'auth/weak-password': 'Please choose a stronger password (at least 6 characters).',
      'auth/too-many-requests': 'Too many attempts. Please wait a moment before trying again.',
    };

    return messages[code] ?? defaultMsg;
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-gray-900/80 p-8 shadow-2xl backdrop-blur">
      <h2 className="text-center text-3xl font-extrabold text-white">
        {isRegister ? 'Create your account' : 'Welcome back'}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-300">
        {isRegister ? 'Unlock your decentralized storage in a few clicks.' : 'Connect to your decentralized drive securely.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/20 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-400 focus:border-indigo-400 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-white/20 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-400 focus:border-indigo-400 focus:outline-none"
            placeholder="Enter a strong password"
          />
        </div>

        {isRegister && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-white/20 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-400 focus:border-indigo-400 focus:outline-none"
              placeholder="Re-enter your password"
            />
          </div>
        )}

        {error && <p className="text-sm font-medium text-red-400">{error}</p>}
        {statusMessage && <p className="text-sm font-medium text-emerald-300">{statusMessage}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Please wait...' : isRegister ? 'Sign up' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-300">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link to={isRegister ? '/login' : '/register'} className="font-semibold text-indigo-300 hover:text-indigo-200">
          {isRegister ? 'Sign in' : 'Create one'}
        </Link>
      </p>
    </div>
  );
};

export default AuthPage;
