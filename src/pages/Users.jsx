import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollectionRef = collection(db, 'USERS');
        const querySnapshot = await getDocs(usersCollectionRef);
        const usersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewClick = (docId) => {
    // console.log('Document ID:', docId);
    navigate(`/home/user/${docId}`)
    
  };

  return (
    <div className="p-6 space-y-4">
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.id}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-lg flex items-center justify-between"
          >
            <div>
              <h4 className="text-lg font-semibold">{user.name}</h4>
              <p className="text-gray-500">{user.email}</p>
            </div>
            {/* <button
              onClick={() => handleViewClick(user.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              View
            </button> */}
            <button
            onClick={() => handleViewClick(user.id)}
              className="p-16-semibold flex gap-4 p-4 group font-semibold rounded-md bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
            >
              View
            </button>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No users found</div>
      )}
    </div>
  );
}

export default Users;
