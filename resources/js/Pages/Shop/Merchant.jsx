import ShopLayout from "@/Layouts/ShopLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { usePage } from "@inertiajs/react";
import { formatRupiah } from "@/Utils/format";

const Merchant = () => {
    const { title, data_toko } = usePage().props;
    return (
        <>
            <ShopLayout>
                <section className="my-8 px-3 md:px-6">
                    <div className="container mx-auto px-4 md:px-6 py-4 bg-white shadow-xl rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800">
                            {title}
                        </h3>
                        <hr className="my-4 border border-gray-300" />
                        <div className="px-3 py-3 md:px-5 antialiased">
                            {data_toko.map((item, index) => (
                                <article
                                    key={index}
                                    className="bg-gray-50 flex flex-wrap md:flex-nowrap border-2 shadow-md rounded-xl max-w-full mb-7 group cursor-pointer transform duration-500 hover:-translate-y-1"
                                >
                                    <div className="w-full h-[300px] md:h-[14rem] md:w-72 p-3">
                                        <img
                                            className="w-full h-full object-cover md:w-52 mx-auto rounded-lg md:shadow-lg border-2"
                                            src={`/img/store/${item.foto}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="w-full">
                                        <div className="p-5 pb-2">
                                            <h1 className="text-2xl font-semibold text-gray-800 md:mt-3">
                                                {item.nama}
                                            </h1>
                                            <p
                                                className="text-xl text-gray-400 mt-2 leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.deskripsi,
                                                }}
                                            />
                                        </div>
                                        <div className="bg-teal-500 p-5 mx-3 my-3 md:mx-0 md:my-0 md:me-3 rounded-lg">
                                            <div className="sm:flex sm:justify-between">
                                                <div className="mb-5 md:mb-0">
                                                    <div className="text-lg text-white">
                                                        <span className="font-bold">
                                                            Alamat :
                                                        </span>
                                                    </div>
                                                    <div className="text-sm md:text-lg text-white">
                                                        <span className="font-semibold">
                                                            {item.alamat}
                                                        </span>
                                                    </div>
                                                </div>
                                                <a
                                                    href={`/shop/store/${item.id}`}
                                                    className="md:mt-0 py-2 px-5 md:py-3 md:px-6 bg-white hover:bg-gray-700 font-bold text-gray-700 hover:text-white md:text-lg rounded-lg shadow-md transition duration-300"
                                                >
                                                    Lihat Toko
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </ShopLayout>
        </>
    );
};

export default Merchant;
