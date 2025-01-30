import ShopLayout from "@/Layouts/ShopLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Head, useForm, usePage } from "@inertiajs/react";
import { formatRupiah } from "@/Utils/format";
import { Inertia } from "@inertiajs/inertia";

const Shop = () => {
    const { data_category, data_rekomendasi, data_product } = usePage().props;

    const { data, setData } = useForm({
        seacrh: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        window.location.href = "/shop/search?search=" + data.seacrh + "&page=1";
    };

    const generatePagination = () => {
        const totalPages = data_product.last_page;
        const currentPage = data_product.current_page;

        let pages = [];

        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 4) pages.push("...");
            for (
                let i = Math.max(currentPage - 2, 2);
                i <= Math.min(currentPage + 2, totalPages - 1);
                i++
            ) {
                pages.push(i);
            }
            if (currentPage < totalPages - 3) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageClick = (page) => {
        Inertia.visit(`/shop?page=${page}`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <ShopLayout>
                <section
                    style={{
                        background:
                            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/img/shop/bg-search-2.jpg) no-repeat center",
                        backgroundSize: "cover",
                    }}
                    className="py-32 md:py-36 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold">
                        Marketplace EasyCatch
                    </h2>
                    <p className="md:text-lg text-sm opacity-80 pb-3">
                        Cari produk favorit anda di platform kami
                    </p>
                    <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto">
                        <form
                            onSubmit={handleSearch}
                            className="relative z-30 text-base text-black"
                        >
                            <input
                                type="search"
                                value={data.seacrh}
                                onChange={(e) =>
                                    setData("seacrh", e.target.value)
                                }
                                placeholder="Cari ....."
                                className="mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full"
                            />
                            <div className="text-left absolute top-10 rounded-t-none rounded-b-2xl shadow bg-white divide-y w-full max-h-40 overflow-auto"></div>
                        </form>
                    </div>
                </section>

                <section className="mt-8 mb-10 px-2 md:px-6">
                    <div className="container mx-auto px-6 py-4 bg-white shadow-xl rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800 mb-5">
                            Kategori
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                            {data_category.map((item, index) => (
                                <a
                                    href={`/shop/category/${item.id}`}
                                    className="relative cursor-pointer"
                                    key={index + 1}
                                >
                                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-hijau1 rounded-lg"></span>
                                    <div className="relative p-6 bg-white border-2 border-hijau1 rounded-lg hover:scale-105 transition duration-500">
                                        <div className="flex justify-center items-center">
                                            <h3 className=" text-center text-lg font-bold text-gray-800">
                                                {item.nama}
                                            </h3>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="my-10 px-2 md:px-6">
                    <div className="container mx-auto px-6 py-4 bg-white shadow-xl rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800 mb-5">
                            Rekomendasi
                        </h3>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            navigation={true}
                            modules={[Navigation]}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                            className="mySwiper mb-4"
                        >
                            {data_rekomendasi.map((item, index) => (
                                <SwiperSlide key={index + 1}>
                                    <div className="w-full flex items-center justify-center">
                                        <article className="max-w-sm w-full p-3 bg-white rounded-xl overflow-hidden border border-teal-400 hover:border-teal-500 hover:scale-95 transition duration-300">
                                            <div>
                                                <img
                                                    className="object-cover h-64 w-full rounded-lg"
                                                    src={`/img/product/${item.foto}`}
                                                    alt="Converse sneakers"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1 mt-4 px-4">
                                                <h2 className="text-lg font-semibold text-gray-800">
                                                    {item.nama}
                                                </h2>
                                                <span className="font-normal text-gray-600">
                                                    {item.stok} stok tersedia
                                                </span>
                                                <span className="font-semibold text-gray-800 mt-2">
                                                    {formatRupiah(item.harga)}
                                                </span>
                                            </div>

                                            <div className="mt-4 p-4 border-t border-gray-200">
                                                <a
                                                    href={`/shop/product-detail/${item.id}`}
                                                    className="w-full btn btn-success"
                                                >
                                                    <span className="text-base text-white">
                                                        Lihat Produk
                                                    </span>
                                                </a>
                                            </div>
                                        </article>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                <section className="my-10 px-2 md:px-6">
                    <div className="container mx-auto px-6 py-4 bg-white shadow-xl rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800 mb-8">
                            Terbaru
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-3">
                            {data_product.data.map((item, index) => (
                                <div
                                    key={index}
                                    className="card bg-base-100 border border-indigo-400 hover:border-indigo-800 hover:scale-95 transition duration-300 w-full"
                                >
                                    <figure className="p-4">
                                        <img
                                            src={`/img/product/${item.foto}`}
                                            alt={item.nama}
                                            className="rounded-xl w-full h-[13rem]"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <div className="badge badge-outline">
                                            {item.category.nama}
                                        </div>
                                        <h2 className="card-title">
                                            {item.nama}
                                        </h2>
                                        <div className="flex justify-between items-center">
                                            <h5 className="text-base font-semibold">
                                                {formatRupiah(item.harga)}
                                            </h5>
                                            <div className="badge badge-neutral py-3">
                                                Stok {item.stok}
                                            </div>
                                        </div>
                                        <hr className="my-2 border-t border-gray-400" />
                                        <div className="card-actions">
                                            <a
                                                href={`/shop/product-detail/${item.id}`}
                                                className="btn btn-sm btn-info"
                                            >
                                                <span className="text-base text-white">
                                                    Lihat Produk
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-4">
                            <nav className="bg-gray-200 rounded-full px-4 py-2">
                                <ul className="flex text-gray-600 gap-4 font-medium py-2">
                                    {generatePagination().map((page, index) => (
                                        <li key={index}>
                                            {page === "..." ? (
                                                <span className="rounded-full px-4 py-2 text-gray-600">
                                                    ...
                                                </span>
                                            ) : (
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Mencegah scroll ke atas
                                                        handlePageClick(page);
                                                    }}
                                                    className={`rounded-full px-4 py-2 ${
                                                        page ===
                                                        data_product.current_page
                                                            ? "bg-white text-gray-600"
                                                            : "hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out"
                                                    }`}
                                                >
                                                    {page}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
            </ShopLayout>
        </>
    );
};

export default Shop;
