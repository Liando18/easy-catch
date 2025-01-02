import NavBar from "@/Components/Shop/NavBar";
import React from "react";

const AuthLayout = ({ children }) => {
    return (
        <>
            <NavBar />
            <div className="bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    {children}
                </div>
            </div>
        </>
    );
};

export default AuthLayout;
