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
  
  auth = getAuth(app);
  
  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const ua = window.navigator.userAgent.toLowerCase();
    // Detect major search bots and performance tests
    const isBot = /googlebot|lighthouse|chrome-lighthouse|bingbot|baiduspider|yandexbot|slurp|duckduckbot|mediapartners-google/i.test(ua);
    
    // Detect if we are in the Firebase Studio or local dev environment
    const isStudio = window.location.hostname.includes('idx.google.com') || window.location.hostname.includes('localhost');

    // CRITICAL: Disable Firestore for external bots to prevent XHR errors in GSC.
    // Allow for Studio and Local Dev to prevent the "white screen" phenomenon.
    if (!isBot || isStudio) {
      if (!db) {
        try {
          db = getFirestore(app);
        } catch (e) {
          console.warn("MirbInvestments: Firestore silent initialization bypass.");
        }
      }
      
      // Enable performance monitoring only for real users in production
      if (process.env.NODE_ENV === 'production' && !isBot) {
        try {
          getPerformance(app);
        } catch (e) {
          // Silently fail performance init
        }
      }
    }
  } else {
    // Server-side initialization for SSR metadata
    if (!db) {
      db = getFirestore(app);
    }
  }
  
  return { app, auth, db };
}
