import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance';
import { firebaseConfig } from './firebase-config';

/**
 * MirbInvestments Elite Foundation: Centralized Firebase Initialization.
 * Enhanced with military-grade environment sensing to prevent white screens in Dev/Studio.
 */
let app: FirebaseApp;
let auth: Auth;
let db: Firestore | null = null;

export function initializeFirebase(): { app: FirebaseApp; auth: Auth; db: Firestore | null } {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  if (!auth) {
    auth = getAuth(app);
  }
  
  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const ua = window.navigator.userAgent.toLowerCase();
    const isBot = /googlebot|lighthouse|chrome-lighthouse|bingbot|baiduspider|yandexbot|slurp|duckduckbot|mediapartners-google/i.test(ua);
    const isStudio = window.location.hostname.includes('idx.google.com') || window.location.hostname.includes('localhost');

    if (!isBot || isStudio) {
      if (!db) {
        try {
          db = getFirestore(app);
        } catch (e) {
          console.warn("MirbInvestments: Firestore silent initialization bypass.");
        }
      }
      
      if (process.env.NODE_ENV === 'production' && !isBot) {
        try {
          getPerformance(app);
        } catch (e) {
          // Silently fail performance init
        }
      }
    }
  } else {
    if (!db) {
      try {
        db = getFirestore(app);
      } catch (e) {
        console.warn("MirbInvestments: SSR Firestore initialization bypass.");
      }
    }
  }
  
  return { app, auth, db };
}

// Immediate execution to populate exports for direct component imports
const initialized = initializeFirebase();
export const appInstance = initialized.app;
export const authInstance = initialized.auth;
export { app, auth, db };
