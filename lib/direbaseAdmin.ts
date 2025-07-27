// lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK only if it hasn't been initialized yet
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    // You might need to add a databaseURL if you're using Realtime Database
    // databaseURL: "https://your-project-id.firebaseio.com"
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
// Export other admin services as needed, e.g., admin.storage(), admin.messaging()
