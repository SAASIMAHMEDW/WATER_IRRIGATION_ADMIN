import React, { useEffect, useState } from 'react';
import { db, auth } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc, getDoc,setDoc,deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Requests() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from Firestore where userstatus is 'pending'
    const fetchUsers = async () => {
      try {
        const usersCollectionRef = collection(db, 'REQUESTS');
        const q = query(usersCollectionRef, where('status', '==', 'pending'));
        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, email, action) => {
    try {
      const userRef = doc(db, 'REQUESTS', userId);
      const newStatus = action === 'accept' ? 'accepted' : 'rejected';
  
      if (action === 'accept') {
        // Fetch the user's data from Firestore using userId
        const userDocSnap = await getDoc(userRef);
  
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const { name, password } = userData;
  
          // Create user in Firebase Authentication with the fetched email and password
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const authId = userCredential.user.uid;
  
          // Create a new document in USERS collection with the user's ID
          const usersCollectionRef = collection(db, 'USERS');
          await setDoc(doc(usersCollectionRef, authId), {
            name,
            email,
            password,
            status: newStatus,
            authId,
          });
  
          // Delete the original request document from REQUESTS collection
          await deleteDoc(userRef);
        } else {
          console.error("No user found with the specified userId.");
        }
      } else {
        // Update user status in Firestore for rejected requests
        await updateDoc(userRef, { status: newStatus });
      }
  
      // Remove the updated user from the list
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };
  


  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6">
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg mb-4">
            <div>
              <h4 className="text-lg font-semibold">{user.name}</h4>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <div>
              <select
                onChange={(e) => handleStatusChange(user.id, user.email, e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">Select Action</option>
                <option value="accept">Accept</option>
                <option value="reject">Reject</option>
              </select>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No pending requests</div>
      )}
    </div>
  );
}

export default Requests;
