import { doc, serverTimestamp, setDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

export const recordFileUsage = async ({ user, bytes, filename }) => {
  if (!user?.uid || typeof bytes !== 'number') {
    return;
  }

  const usageRef = doc(db, 'storageUsage', user.uid);

  await setDoc(
    usageRef,
    {
      email: user.email || '',
      totalBytes: increment(bytes),
      filesUploaded: increment(1),
      lastFileName: filename,
      lastFileSize: bytes,
      lastUploadedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
