import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

const NavBar = () => {
    const { auth } = usePage().props;

    const [menuBar, setMenuBar] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleManuBar = () => {
        setMenuBar(!menuBar);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header
                id="headeNav"
                className={`w-full fixed top-0 left-0 z-40 transition-all duration-500 ${
                    isScrolled
                        ? "bg-white shadow-lg py-4"
                        : "bg-transparent py-6"
                }`}
            >
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center">
                        {/* Brand */}
                        <div className="">
                            <a
                                href="/"
                                className="font-extrabold text-xl md:text-2xl text-hijau1"
                            >
                                EasyCatch
                            </a>
                        </div>
                        {/* \Brand */}

                        {/* NavMenu */}
                        <div className="hidden md:block">
                            <ul className="flex gap-6 items-center capitalize">
                                <li>
                                    <a
                                        href="/"
                                        className={`font-semibold ${
                                            isScrolled
                                                ? "text-hijau4"
                                                : "text-white"
                                        } hover:text-hijau1 transition-all duration-300}`}
                                    >
                                        Home
                                    </a>
                                </li>
                                <li></li>
                                <li>
                                    <a
                                        href="/shop"
                                        className={`font-semibold ${
                                            isScrolled
                                                ? "text-hijau4"
                                                : "text-white"
                                        } hover:text-hijau1 transition-all duration-300}`}
                                    >
                                        Marketplace
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/contact"
                                        className={`font-semibold ${
                                            isScrolled
                                                ? "text-hijau4"
                                                : "text-white"
                                        } hover:text-hijau1 transition-all duration-300}`}
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* \NavMenu */}

                        {/* NavBtn */}
                        <div className="hidden md:flex gap-2">
                            {auth.user ? (
                                <>
                                    {auth.user.role === "3" ||
                                    auth.user.role === "4" ? (
                                        <>
                                            <a
                                                href="/shop/profile"
                                                className="btn-home-putih"
                                            >
                                                Profile
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <a
                                                href="/dashboard"
                                                className="btn-home-putih"
                                            >
                                                Dashboard
                                            </a>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <a
                                        href="/signin"
                                        className="btn-home-putih"
                                    >
                                        Sign In
                                    </a>
                                    <a
                                        href="/signup"
                                        className="btn-home-hijau"
                                    >
                                        Sign Up
                                    </a>
                                </>
                            )}
                        </div>
                        {/* \NavBtn */}

                        {/* Mobile NavMenu */}
                        {menuBar && (
                            <div className="absolute h-[100vh] inset-0 py-20 bg-white z-30">
                                <ul className="flex flex-col gap-4 items-center capitalize justify-center">
                                    <li className="mb-5">
                                        <a
                                            href="/"
                                            className="font-extrabold text-2xl text-hijau1 text-center"
                                        >
                                            EasyCatch
                                        </a>
                                    </li>
                                    <li className="font-semibold text-hijau4 hover:text-hijau1 transition-all duration-300">
                                        Home
                                    </li>
                                    <li className="font-semibold text-hijau4 hover:text-hijau1 transition-all duration-300">
                                        Marketplace
                                    </li>
                                    <li className="font-semibold text-hijau4 hover:text-hijau1 transition-all duration-300">
                                        Contact
                                    </li>
                                    <li className="my-5">
                                        <a
                                            href="/login"
                                            className="btn-home-putih"
                                        >
                                            Sign In
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/login"
                                            className="btn-home-hijau"
                                        >
                                            Sign Up
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {/* \Mobile NavMenu */}

                        {/* Mobile Hamburger */}
                        <button
                            type="button"
                            id="btnBar"
                            className="md:hidden cursor-pointer z-50 transition-all duration-500"
                            onClick={handleManuBar}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        {/* \Mobile Hamburger */}
                    </nav>
                </div>
            </header>
        </>
    );
};

export default NavBar;
