import React, { useEffect, useState } from 'react';
import { db, auth } from '../config/firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';

function AUser() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from Firestore
    const fetchUserData = async () => {
      const userDocRef = doc(db, 'USERS', uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        setUser(userSnapshot.data());
      } else {
        console.error("No such user exists!");
        navigate(-1); // Go back if user not found
      }
    };

    fetchUserData();
  }, [uid, navigate]);

  const handleGoBack = () => {
    navigate(-1); // Navigate back
  };

  const handleDeleteUser = async () => {
    try {
      // Delete the user document from Firestore
      await deleteDoc(doc(db, 'USERS', uid));

      // Delete the user from Firebase Authentication
      const user = auth.currentUser;
      if (user && user.uid === uid) {
        await deleteUser(user);
      }

      alert('User deleted successfully');
      navigate('/home/users'); // Navigate back to users list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className='flex justify-between'>
        <button
          className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
          type="button"
          onClick={handleGoBack}
        >
          <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
              <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000"></path>
              <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000"></path>
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>

        <button
          className="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
          onClick={handleDeleteUser}
        >
          <svg
            viewBox="0 0 1.625 1.625"
            class="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
            height="15"
            width="15"
          >
            <path
              d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"
            ></path>
            <path
              d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"
            ></path>
            <path
              d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"
            ></path>
          </svg>
          <svg
            width="16"
            fill="none"
            viewBox="0 0 39 7"
            class="origin-right duration-500 group-hover:rotate-90"
          >
            <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
            <line
              stroke-width="3"
              stroke="white"
              y2="1.5"
              x2="26.0357"
              y1="1.5"
              x1="12"
            ></line>
          </svg>
          <svg width="16" fill="none" viewBox="0 0 33 39" class="">
            <mask fill="white" id="path-1-inside-1_8_19">
              <path
                d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
              ></path>
            </mask>
            <path
              mask="url(#path-1-inside-1_8_19)"
              fill="white"
              d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
            ></path>
            <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
            <path stroke-width="4" stroke="white" d="M21 6V29"></path>
          </svg>
        </button>
      </div>

      <div className="card m-auto text-gray-300 w-[60%] h-[70%] hover:brightness-90 transition-all cursor-pointer group bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 rounded-lg overflow-hidden relative">
        <div className="px-8 py-10">
          <div className="bg-orange-500 w-10 h-10 rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-red-900 transition-all"></div>
          <div className="uppercase font-bold text-xl">
            {user ? user.name : 'Loading...'}
          </div>
          <div className="text-gray-300 uppercase tracking-widest">
            {user ? user.email : ''}
          </div>
          <div className="text-gray-400 mt-8">
            <p className="font-bold">User Info</p>
            <p>Data from Firebase</p>
          </div>
        </div>
        <div className="h-2 w-full bg-gradient-to-l via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
        <div className="h-0.5 group-hover:w-full bg-gradient-to-l via-yellow-950 group-hover:via-yellow-500 w-[70%] m-auto rounded transition-all"></div>
      </div>
    </>
  );
}

export default AUser;
