import { usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import NavBar from "@/Components/Shop/NavBar";
import Footer from "@/Components/Home/Footer";

const UserLayout = ({ children }) => {
    const { auth } = usePage().props;

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <NavBar />
                <div className="bg-gray-100 px-1 md:px-6">
                    <div className="container mx-auto py-8">
                        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                            <div className="col-span-4 sm:col-span-3">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <div className="flex flex-col items-center">
                                        <div className="border border-gray-500 rounded-full mb-4">
                                            <img
                                                src={`/img/user/${auth.user.data.foto}`}
                                                className="w-[10rem] h-[10rem] bg-gray-300 rounded-full shrink-0"
                                            ></img>
                                        </div>
                                        <h1 className="text-xl font-bold">
                                            {auth.user.data.nama}
                                        </h1>
                                        <p className="text-gray-700">
                                            {auth.user.data.status == "1"
                                                ? "Merchant"
                                                : "Customer"}
                                        </p>
                                        {auth.user.data.status == "2" ? (
                                            <>
                                                <div className="mt-4 flex flex-wrap gap-4 justify-center">
                                                    <a
                                                        href={`/shop/buat-toko`}
                                                        className="bg-hijau1 hover:bg-hijau3 text-white py-2 px-4 rounded"
                                                    >
                                                        Memulai Membuka Toko
                                                    </a>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="mt-4 flex flex-wrap gap-4 justify-center">
                                                <a
                                                    href={`/shop/toko`}
                                                    className="bg-hijau1 hover:bg-hijau3 text-white py-2 px-4 rounded-full"
                                                >
                                                    Kelola Toko
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    <hr className="my-6 border-t border-gray-300" />
                                    <div className="flex flex-col">
                                        <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                                            Menu
                                        </span>
                                        <ul>
                                            <li className="mb-2">
                                                <a href={`/shop/profile`}>
                                                    Edit Profile
                                                </a>
                                            </li>
                                            {auth.user.data.status == "1" ? (
                                                <>
                                                    <li className="mb-2">
                                                        <a
                                                            href={`/shop/kelola-produk`}
                                                        >
                                                            Produk
                                                        </a>
                                                    </li>
                                                    <li className="mb-2">
                                                        <a
                                                            href={`/shop/kelola-pesanan`}
                                                        >
                                                            Pesanan Masuk
                                                        </a>
                                                    </li>
                                                    <li className="mb-2">
                                                        <a
                                                            href={`/shop/pengiriman`}
                                                        >
                                                            Pengiriman
                                                        </a>
                                                    </li>
                                                    <li className="mb-2">
                                                        <a
                                                            href={`/shop/profile/penjualan`}
                                                        >
                                                            Penjualan
                                                        </a>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li className="mb-2">
                                                        <a href="/shop/keranjang">
                                                            Keranjang
                                                        </a>
                                                    </li>
                                                    <li className="mb-2">
                                                        <a
                                                            href={`/shop/payment`}
                                                        >
                                                            Pembayaran
                                                        </a>
                                                    </li>
                                                    <li className="mb-2">
                                                        <a
                                                            href={`/shop/pesanan`}
                                                        >
                                                            Pesanan
                                                        </a>
                                                    </li>
                                                </>
                                            )}
                                            <li className="mb-2">
                                                <Link
                                                    href={route("logout")}
                                                    method="post"
                                                >
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 sm:col-span-9">
                                <div className="bg-white shadow rounded-lg p-6">
                                    <div>{children}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default UserLayout;
