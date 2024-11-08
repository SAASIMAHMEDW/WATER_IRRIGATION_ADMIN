import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import Dashboard from "../assets/DashboardS"
import Requests from "../assets/RequestsS"
import Users from "../assets/UsersS"
import Logout from "../assets/LogoutS";

function Navbar() {
    const navigate = useNavigate();

    const user = auth.currentUser;

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        /* From Uiverse.io by sahilxkhadka */
        <div className="card w-full h-24 bg-white p-5 shadow-md shadow-purple-200/50 rounded-md flex justify-between">
            <div>
                <ul className="w-36 flex flex-row gap-2">
                    <NavLink to={"/home/dashboard"}
                        className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                    >
                        <button
                            className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
                        >
                            <Dashboard />
                            Dashboard
                        </button>
                    </NavLink>
                    <NavLink to={"/home/requests"}
                        className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                    >
                        <button
                            className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
                        >
                            <Requests />
                            Requests
                        </button>
                    </NavLink>
                    <NavLink to={"/home/users"}
                        className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                    >
                        <button
                            className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
                        >
                            <Users />
                            Users
                        </button>
                    </NavLink>
                </ul>
            </div>
            <div>
                <ul className="w-36 flex flex-row gap-2">
                    <li
                        className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap"
                    >
                        <button
                            onClick={handleLogout}
                            className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner bg-gradient-to-r from-[#ff3276] to-[#ff5800] focus:text-white text-white transition-all ease-linear"
                        >
                            <Logout />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>

    );
}

export default Navbar;
