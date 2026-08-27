'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useAuth } from './use-auth';
import type { UserMessage } from '@/lib/types';
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
  writeBatch,
  getDocs,
} from 'firebase/firestore';

interface MessagesContextType {
  messages: UserMessage[];
  unreadCount: number;
  isLoading: boolean;
  markAllAsRead: () => Promise<void>;
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { user, db } = useAuth();
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TERMINATION LOGIC: Strictly disable listeners for bots and unauthenticated users
    const isBot = typeof window !== 'undefined' && /googlebot|lighthouse|chrome-lighthouse|bingbot|baiduspider|yandexbot/i.test(window.navigator.userAgent);
    
    if (!user || !db || isBot) {
      setMessages([]);
      setUnreadCount(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const q = query(
      collection(db, 'userMessages'),
      where('userId', '==', user.uid)
    );

    // SINGLETON LISTENER WITH CLEANUP
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const userMessages: UserMessage[] = [];
        let newUnreadCount = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const createdAtDate = (data.createdAt as Timestamp).toDate();
          
          userMessages.push({
            id: doc.id,
            userId: data.userId,
            title: data.title,
            body: data.body,
            isRead: data.isRead,
            createdAt: createdAtDate,
            dateString: createdAtDate.toLocaleString(),
            type: data.type || 'info',
          });
          if (!data.isRead) {
            newUnreadCount++;
          }
        });
        
        const sortedMessages = userMessages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        setMessages(sortedMessages);
        setUnreadCount(newUnreadCount);
        setIsLoading(false);
      },
      (error) => {
        console.error('Messages Listener Error:', error);
        setIsLoading(false);
      }
    );

    // RETURN UNSUBSCRIBE TO KILL CONNECTION ON NAVIGATE
    return () => unsubscribe();
  }, [user, db]);

  const markAllAsRead = async () => {
    if (!user || unreadCount === 0 || !db) return;

    try {
      const q = query(
        collection(db, 'userMessages'),
        where('userId', '==', user.uid),
        where('isRead', '==', false)
      );
      const querySnapshot = await getDocs(q);
      
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.update(doc.ref, { isRead: true });
      });
      await batch.commit();
      
    } catch (error) {
        console.error("Error marking messages as read: ", error);
    }
  };

  const value = { messages, unreadCount, isLoading, markAllAsRead };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};
