import React, { useEffect, useState } from 'react';
import { realDb } from '../config/firebase';
import { ref, onValue } from 'firebase/database';
import Switch from '../components/Switch';

function Dashboard() {
  const [data, setData] = useState({
    flow2: 0,
    flowadmin: 0,
    tds: 0,
    temperature: 0,
    turbidity: 0,
  });

  // Listener to continuously fetch the latest data from Firebase Realtime Database
  useEffect(() => {
    const dataRef = ref(realDb, "water");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const newData = snapshot.val();
      if (newData) {
        setData({
          flow2: newData.flow2 || 0,
          flowadmin: newData.flowadmin || 0,
          tds: newData.tds || 0,
          temperature: newData.temperature || 0,
          turbidity: newData.turbudity || 0,
        });
      }
    });
    
    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  // Card component for displaying data
  const DataCard = ({ title, value }) => (
    <div className="h-[8em] w-[15em] bg-white m-auto rounded-[1em] overflow-hidden relative group p-2 z-0">
      <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#FF5800] group-hover:scale-[800%] duration-500 z-[-1]"></div>
      <h1 className="z-20 font-bold group-hover:text-white duration-500 text-[1.4em]">
        {title}
      </h1>
      <p className="text-[#6C3082] group-hover:text-white text-[1.2em] font-semibold mt-2">
        {value}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-[60%] mt-20 gap-8">
    <Switch/>
      <div className="flex justify-center gap-20">
        {/* Upper Row with flow2 and flowadmin */}
        <DataCard title="Flow" value={data.flow2} />
        <DataCard title="Flow Admin" value={data.flowadmin} />
      </div>
      <div className="flex justify-center gap-20 mt-10 ">
        {/* Lower Row with tds, temperature, and turbidity */}
        <DataCard title="TDS" value={data.tds} />
        <DataCard title="Temperature" value={data.temperature} />
        <DataCard title="Turbidity" value={data.turbidity} />
      </div>
    </div>
  );
}

export default Dashboard;
