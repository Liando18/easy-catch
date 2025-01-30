import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="bg-white text-gray-700 py-10">
                <div className="container mx-auto px-4">
                    {/* Grid Layout */}
                    <div className="flex flex-wrap justify-between gap-8">
                        {/* Logo and Description */}
                        <div className="w-full md:w-1/3 text-center md:text-left">
                            <h2 className="text-xl font-extrabold text-teal-600">
                                Easy Catch
                            </h2>
                        </div>

                        {/* Navigation */}
                        <div className="w-full md:w-1/3">
                            <nav className="flex justify-center md:justify-start gap-4">
                                <a
                                    href="/"
                                    className="text-sm text-gray-700 hover:text-teal-600"
                                >
                                    Home
                                </a>
                                <a
                                    href="/#about"
                                    className="text-sm text-gray-700 hover:text-teal-600"
                                >
                                    About
                                </a>
                                <a
                                    href="/#service"
                                    className="text-sm text-gray-700 hover:text-teal-600"
                                >
                                    Service
                                </a>
                                <a
                                    href="/#shop"
                                    className="text-sm text-gray-700 hover:text-teal-600"
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="/#contact"
                                    className="text-sm text-gray-700 hover:text-teal-600"
                                >
                                    Contact
                                </a>
                            </nav>
                        </div>

                        {/* Contact Info */}
                        <div className="w-full text-center">
                            <h3 className="text-lg font-bold text-teal-600">
                                Hubungi Kami
                            </h3>
                            <p className="text-sm mt-2">
                                <strong>Alamat:</strong> Jl. Perintis
                                Kemerdekaan, Painan Timur, Pesisir Selatan,
                                Sumatera Barat
                            </p>
                            <p className="text-sm mt-1">
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:easycatch.id@gmail.com"
                                    className="text-teal-600 hover:text-teal-800"
                                >
                                    easycatch.id@gmail.com
                                </a>
                            </p>
                            <p className="text-sm mt-1">
                                <strong>Telepon:</strong> +6281378940155
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-6"></div>

                    {/* Footer Bottom */}
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Easy Catch and{" "}
                            <a
                                href="https://sman2painan.sch.id/"
                                className="text-teal-600 hover:text-teal-800"
                            >
                                SMA 2 Painan
                            </a>
                            . All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
