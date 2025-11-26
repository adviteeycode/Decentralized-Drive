import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import Spinner from '../components/Spinner';

const bytesToReadable = (bytes = 0) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(2)} ${sizes[i]}`;
};

const Profile = () => {
  const { user } = useAuth();
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    const usageRef = doc(db, 'storageUsage', user.uid);
    const unsubscribe = onSnapshot(usageRef, (snapshot) => {
      setUsage(snapshot.exists() ? snapshot.data() : null);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const lastUpdated = usage?.lastUploadedAt?.toDate?.();

  return (
    <div className="mx-auto max-w-4xl rounded-3xl bg-gray-900/70 p-10 text-white shadow-2xl">
      <h1 className="text-4xl font-bold">Your Profile</h1>
      <p className="mt-1 text-gray-300">Review your decentralized storage footprint.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-gray-800/70 p-6">
          <p className="text-sm uppercase tracking-wide text-gray-400">Account</p>
          <p className="mt-2 text-2xl font-semibold">{user?.email}</p>
          <p className="mt-4 text-sm text-gray-400">
            UID: <span className="font-mono text-gray-200">{user?.uid}</span>
          </p>
          {lastUpdated && (
            <p className="mt-4 text-sm text-gray-400">
              Last activity: {lastUpdated.toLocaleString()}
            </p>
          )}
        </div>

        <div className="rounded-2xl bg-gray-800/70 p-6">
          <p className="text-sm uppercase tracking-wide text-gray-400">Storage usage</p>
          {loading ? (
            <div className="mt-4 flex items-center gap-3">
              <Spinner size="h-5 w-5" />
              <span>Loading usage...</span>
            </div>
          ) : usage ? (
            <>
              <p className="mt-2 text-3xl font-bold">{bytesToReadable(usage.totalBytes || 0)}</p>
              <p className="text-sm text-gray-400">Across all uploads</p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="rounded-xl bg-gray-900/60 p-4">
                  <p className="text-2xl font-semibold">{usage.filesUploaded || 0}</p>
                  <p className="text-xs uppercase tracking-widest text-gray-400">Files</p>
                </div>
                <div className="rounded-xl bg-gray-900/60 p-4">
                  <p className="text-xl font-semibold">{bytesToReadable(usage.lastFileSize || 0)}</p>
                  <p className="text-xs uppercase tracking-widest text-gray-400">Last Upload</p>
                </div>
              </div>
            </>
          ) : (
            <p className="mt-4 text-gray-300">No uploads logged yet. Start by adding your first file.</p>
          )}
        </div>
      </div>

      {usage?.lastFileName && (
        <div className="mt-8 rounded-2xl bg-gray-800/70 p-6">
          <p className="text-sm uppercase tracking-wide text-gray-400">Recent file</p>
          <p className="mt-2 text-lg font-semibold text-emerald-300">{usage.lastFileName}</p>
          <p className="text-sm text-gray-400">Size: {bytesToReadable(usage.lastFileSize || 0)}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
