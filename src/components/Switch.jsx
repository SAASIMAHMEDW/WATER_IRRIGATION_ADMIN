import React, { useEffect, useState } from 'react';
import { realDb } from '../config/firebase';
import { ref, onValue, set } from 'firebase/database';

function Switch() {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        // Fetch the initial switch status from Firebase
        const dataRef = ref(realDb, "solenoid/switch");
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const status = snapshot.val();
            setIsChecked(status);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const handleToggle = () => {
        // Toggle the checkbox state and update in Firebase
        const newStatus = !isChecked;
        setIsChecked(newStatus);

        // Update Firebase with the new status
        set(ref(realDb, "solenoid/switch"), newStatus);
    };

    return (
        <>
            <div className="flex justify-between gap-3">
                <h1 className='font-extrabold text-3xl flex justify-center items-center'>Solenoid</h1>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleToggle}
                        className="sr-only peer"
                    />
                    <div className="group peer ring-0 bg-gradient-to-r from-rose-400 to-red-900 rounded-full outline-none duration-700 after:duration-300 w-24 h-12 shadow-md peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900 peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1 peer-checked:after:translate-x-12 peer-hover:after:scale-95">
                        <svg className="group-hover:scale-75 duration-300 absolute top-1 left-12 stroke-gray-900 w-10 h-10" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
                            <path className="svg-fill-primary" d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z">
                            </path>
                        </svg>
                        <svg className="group-hover:scale-75 duration-300 absolute top-1 left-1 stroke-gray-900 w-10 h-10" height="100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z" fillRule="evenodd">
                            </path>
                        </svg>
                    </div>
                </label>
            </div>
        </>
    );
}

export default Switch;
