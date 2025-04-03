import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

// User operations
export const getUserById = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Startup operations
export const createStartup = async (data: any) => {
  try {
    const startupsRef = collection(db, 'startups');
    const docRef = await addDoc(startupsRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating startup:', error);
    throw error;
  }
};

export const getStartupById = async (startupId: string) => {
  try {
    const startupDoc = await getDoc(doc(db, 'startups', startupId));
    if (startupDoc.exists()) {
      return { id: startupDoc.id, ...startupDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting startup:', error);
    throw error;
  }
};

export const getStartupsByUserId = async (userId: string) => {
  try {
    const startupsRef = collection(db, 'startups');
    const q = query(startupsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting startups by user:', error);
    throw error;
  }
};

export const updateStartup = async (startupId: string, data: any) => {
  try {
    const startupRef = doc(db, 'startups', startupId);
    await updateDoc(startupRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating startup:', error);
    throw error;
  }
};

export const deleteStartup = async (startupId: string) => {
  try {
    await deleteDoc(doc(db, 'startups', startupId));
    return true;
  } catch (error) {
    console.error('Error deleting startup:', error);
    throw error;
  }
};

// Investment operations
export const createInvestment = async (data: any) => {
  try {
    const investmentsRef = collection(db, 'investments');
    const docRef = await addDoc(investmentsRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating investment:', error);
    throw error;
  }
};

export const getInvestmentById = async (investmentId: string) => {
  try {
    const investmentDoc = await getDoc(doc(db, 'investments', investmentId));
    if (investmentDoc.exists()) {
      return { id: investmentDoc.id, ...investmentDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting investment:', error);
    throw error;
  }
};

export const getInvestmentsByInvestorId = async (investorId: string) => {
  try {
    const investmentsRef = collection(db, 'investments');
    const q = query(investmentsRef, where('investorId', '==', investorId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting investments by investor:', error);
    throw error;
  }
};

export const getInvestmentsByStartupId = async (startupId: string) => {
  try {
    const investmentsRef = collection(db, 'investments');
    const q = query(investmentsRef, where('startupId', '==', startupId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting investments by startup:', error);
    throw error;
  }
};

// Request operations
export const createRequest = async (data: any) => {
  try {
    const requestsRef = collection(db, 'requests');
    const docRef = await addDoc(requestsRef, {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating request:', error);
    throw error;
  }
};

export const getRequestById = async (requestId: string) => {
  try {
    const requestDoc = await getDoc(doc(db, 'requests', requestId));
    if (requestDoc.exists()) {
      return { id: requestDoc.id, ...requestDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting request:', error);
    throw error;
  }
};

export const getRequestsByStartupId = async (startupId: string) => {
  try {
    const requestsRef = collection(db, 'requests');
    const q = query(requestsRef, where('startupId', '==', startupId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting requests by startup:', error);
    throw error;
  }
};

export const getRequestsByInvestorId = async (investorId: string) => {
  try {
    const requestsRef = collection(db, 'requests');
    const q = query(requestsRef, where('investorId', '==', investorId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting requests by investor:', error);
    throw error;
  }
};

export const updateRequestStatus = async (requestId: string, status: string) => {
  try {
    const requestRef = doc(db, 'requests', requestId);
    await updateDoc(requestRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating request status:', error);
    throw error;
  }
};

// Helper function to convert Firestore timestamps to JavaScript dates
export const convertTimestamps = (data: any) => {
  if (!data) return data;
  
  const result = { ...data };
  
  Object.keys(result).forEach(key => {
    if (result[key] instanceof Timestamp) {
      result[key] = result[key].toDate();
    } else if (typeof result[key] === 'object' && result[key] !== null) {
      result[key] = convertTimestamps(result[key]);
    }
  });
  
  return result;
}; 