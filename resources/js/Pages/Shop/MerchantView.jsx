import { useState } from "react";
import ShopLayout from "@/Layouts/ShopLayout";
import { usePage } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { formatRupiah } from "@/Utils/format";

const dataTaps = [
    {
        id: 1,
        tap: "beranda",
        name: "Beranda",
    },
    {
        id: 2,
        tap: "produk",
        name: "Produk",
    },
];

const MerchantView = () => {
    const { title, data_toko, data_kategori, data_produk } = usePage().props;

    const [activeTab, setActiveTab] = useState("beranda");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState("default");

    const phoneNumber = data_toko.user.handphone;
    const formattedNumber = phoneNumber.startsWith("0")
        ? phoneNumber.replace("0", "62")
        : phoneNumber.startsWith("+62")
        ? phoneNumber.replace("+", "")
        : phoneNumber;

    const message = "Halo, saya tertarik dengan produk Anda!";

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const filteredProducts = data_produk.filter((item) => {
        if (!selectedCategory) return true;
        return item.category.id === selectedCategory.id;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === "Harga Terendah") {
            return a.harga - b.harga;
        } else if (sortOrder === "Harga Tertinggi") {
            return b.harga - a.harga;
        }
        return 0;
    });

    return (
        <ShopLayout>
            <section className="mx-auto px-4 md:px-6 py-4 bg-gray-200 shadow-xl rounded-lg">
                <div className="container bg-gray-50 mx-auto px-4 md:px-8 py-5">
                    {/* Header Toko */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between bg-white shadow-md rounded-lg p-6 gap-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={`/img/store/${data_toko.foto}`}
                                alt="Logo Toko"
                                className="w-20 h-20 rounded-full"
                            />
                            <div>
                                <h1 className="text-xl font-bold text-center lg:text-left">
                                    {data_toko.nama}
                                </h1>
                                <p className="text-gray-500 text-center lg:text-left">
                                    {data_toko.alamat}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 w-full lg:w-auto">
                            <a
                                href={`https://wa.me/${formattedNumber}?text=${encodeURIComponent(
                                    message
                                )}`}
                                className="btn btn-success text-white w-full lg:w-auto flex items-center justify-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i
                                    className="fab fa-whatsapp"
                                    style={{ fontSize: "1.3rem" }}
                                ></i>
                                Hubungi Penjual Melalui WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Tab Buttons */}
                    <div className="bg-white p-6 shadow-md rounded-lg mt-6">
                        <div className="flex justify-center md:justify-start space-x-4">
                            {dataTaps.map((item) => (
                                <button
                                    key={item.id}
                                    className={`px-4 py-2 font-semibold border-b-4 ${
                                        activeTab === item.tap
                                            ? "border-hijau1 text-hijau1"
                                            : "border-transparent"
                                    } hover:bg-hijau1 hover:text-white hover:rounded-md transition duration-300 focus:outline-none`}
                                    onClick={() => handleTabClick(item.tap)}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "beranda" && (
                        <>
                            {/* Deskripsi Toko */}
                            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    Deskripsi Toko
                                </h2>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: data_toko.deskripsi,
                                    }}
                                />
                            </div>

                            {/* Peta Lokasi */}
                            <div className="mt-6 bg-white shadow-md rounded-lg p-6 ">
                                <h2 className="text-lg font-semibold mb-4">
                                    Lokasi Toko
                                </h2>
                                <MapContainer
                                    center={[data_toko.let, data_toko.long]}
                                    zoom={16}
                                    className="w-full h-[300px] z-0"
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker
                                        position={[
                                            data_toko.let,
                                            data_toko.long,
                                        ]}
                                    >
                                        <Popup>{data_toko.nama}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </>
                    )}

                    {activeTab === "produk" && (
                        <>
                            <div className="mt-6 flex flex-col lg:flex-row gap-4">
                                {/* Sidebar Etalase */}
                                <div className="w-full lg:w-1/6 bg-white shadow-md rounded-lg p-4">
                                    <h2 className="font-bold text-lg mb-4 text-center">
                                        Kategori
                                    </h2>
                                    <ul className="menu bg-base-100 rounded-lg">
                                        <li
                                            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md transition-all"
                                            onClick={() =>
                                                handleCategoryClick(null)
                                            }
                                        >
                                            Semua Produk
                                        </li>
                                        {data_kategori.map((item) => (
                                            <li
                                                key={item.id}
                                                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md transition-all"
                                                onClick={() =>
                                                    handleCategoryClick(item)
                                                }
                                            >
                                                {item.nama}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Daftar Produk */}
                                <div className="w-full lg:w-5/6 bg-white shadow-md rounded-lg p-4">
                                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-0 gap-2">
                                        <h2 className="font-bold text-lg">
                                            Semua Produk
                                        </h2>
                                        <select
                                            className="select select-bordered w-full md:w-auto"
                                            onChange={handleSortChange}
                                        >
                                            <option value="default">
                                                Default
                                            </option>
                                            <option value="Harga Terendah">
                                                Harga Terendah
                                            </option>
                                            <option value="Harga Tertinggi">
                                                Harga Tertinggi
                                            </option>
                                        </select>
                                    </div>
                                    {sortedProducts.length === 0 ? (
                                        <p className="text-center text-gray-500">
                                            Produk belum tersedia
                                        </p>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:mt-3">
                                            {sortedProducts.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="card bg-white shadow-md rounded-lg overflow-hidden"
                                                >
                                                    <figure>
                                                        <img
                                                            src={`/img/product/${item.foto}`}
                                                            alt="Produk"
                                                            className="w-full h-32 md:h-48 object-cover"
                                                        />
                                                    </figure>
                                                    <div className="card-body p-4">
                                                        <p className="text-info font-semibold">
                                                            {item.category.nama}
                                                        </p>
                                                        <div className="flex justify-between items-center">
                                                            <h5 className="text-lg font-bold">
                                                                {item.nama}
                                                            </h5>
                                                            <div
                                                                className={`badge ${
                                                                    item.stok <
                                                                    1
                                                                        ? "badge-error"
                                                                        : item.stok <
                                                                          6
                                                                        ? "badge-warning"
                                                                        : "badge-success"
                                                                } py-3 text-white`}
                                                            >
                                                                Stok {item.stok}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-500">
                                                            {formatRupiah(
                                                                item.harga
                                                            )}
                                                        </p>
                                                        <a
                                                            href={`/shop/product-detail/${item.id}`}
                                                            className="btn btn-sm btn-success text-white mt-2 w-full"
                                                        >
                                                            Lihat Produk
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </ShopLayout>
    );
};

export default MerchantView;
