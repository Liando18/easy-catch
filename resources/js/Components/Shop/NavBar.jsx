import { usePage } from "@inertiajs/react";
import React, { useState } from "react";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartCount = 2;
    const { auth } = usePage().props;

    return (
        <>
            {/* Header untuk Desktop */}
            <header className="bg-white shadow-md sticky top-0 z-50 w-full">
                <div className="container mx-auto px-4 py-4 md:px-10 flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold text-hijau1">
                        EasyCatch
                    </a>
                    {/* Navigasi untuk Desktop */}
                    <nav className="hidden md:flex space-x-6">
                        <a
                            href="/shop"
                            className="text-hijau4 hover:text-hijau2"
                        >
                            Shop
                        </a>
                        <a
                            href="/shop/search"
                            className="text-hijau4 hover:text-hijau2"
                        >
                            Seacrh
                        </a>
                        <a
                            href="/shop/store"
                            className="text-hijau4 hover:text-hijau2"
                        >
                            Store
                        </a>
                    </nav>
                    <div className="flex space-x-3">
                        {auth.user ? (
                            <>
                                {auth.user.role === "3" ||
                                auth.user.role === "4" ? (
                                    <>
                                        <a
                                            href="/shop/keranjang"
                                            className="relative flex items-center justify-center gap-2 p-2 rounded-md hover:text-hijau1"
                                        >
                                            <i className="fa-solid fa-cart-shopping text-hijau4 group-hover:text-hijau1"></i>
                                        </a>
                                        <a
                                            href={`/shop/profile`}
                                            className="hidden group md:flex items-center gap-2 px-2 py-1 border border-hijau4 rounded-full hover:border-hijau1 hover:text-hijau1 hover:shadow-lg"
                                        >
                                            <img
                                                src={`/img/user/${auth.user.data.foto}`}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span className="text-hijau4 group-hover:text-hijau1">
                                                {auth.user.data.nama}
                                            </span>
                                        </a>
                                    </>
                                ) : null}
                            </>
                        ) : (
                            <>
                                <a
                                    href="/signin"
                                    className="text-hijau4 hover:text-hijau1"
                                >
                                    Sign In
                                </a>
                                <a
                                    href="/signup"
                                    className="text-hijau4 hover:text-hijau1"
                                >
                                    Sign Up
                                </a>
                            </>
                        )}

                        {/* Cart Icon untuk Desktop */}
                        {/* <div className="relative">
                            <a
                                href="#"
                                className="text-gray-600 hover:text-gray-800"
                            >
                                Cart
                            </a>
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div> */}
                    </div>
                </div>
            </header>

            {/* Bottom Navigation for Mobile */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md md:hidden z-50">
                <div className="flex justify-around py-3 bg-gray-100">
                    <a
                        href="/shop"
                        className="text-gray-600 hover:text-green-500 flex flex-col items-center"
                    >
                        <i className="fa-solid fa-store w-6 h-6"></i>
                        <span className="text-xs">Shop</span>
                    </a>
                    <a
                        href="/shop/search"
                        className="text-gray-600 hover:text-green-500 flex flex-col items-center"
                    >
                        <i className="fa-solid fa-magnifying-glass w-6 h-6"></i>
                        <span className="text-xs">Seacrh</span>
                    </a>
                    <a
                        href="/shop/store"
                        className="text-gray-600 hover:text-green-500 flex flex-col items-center"
                    >
                        <i className="fa-solid fa-shop w-6 h-6"></i>
                        <span className="text-xs">Store</span>
                    </a>
                    {auth.user ? (
                        <>
                            {auth.user.role === "3" ||
                            auth.user.role === "4" ? (
                                <>
                                    <a
                                        href="/shop/profile"
                                        className="text-gray-600 hover:text-green-500 flex flex-col items-center"
                                    >
                                        <img
                                            src={`/img/user/${auth.user.data.foto}`}
                                            alt="Profile"
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <span className="text-xs">Akun</span>
                                    </a>
                                </>
                            ) : null}
                        </>
                    ) : (
                        <>
                            <a
                                href="signin"
                                className="text-gray-600 hover:text-green-500 flex flex-col items-center"
                            >
                                <i className="fa-solid fa-right-to-bracket w-6 h-6"></i>
                                <span className="text-xs">Sign In</span>
                            </a>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavBar;
