import ShopLayout from "@/Layouts/ShopLayout";
import { usePage } from "@inertiajs/react";
import { formatRupiah } from "@/Utils/format";

const Category = () => {
    const { title, category, data_category, data_product } = usePage().props;
    return (
        <>
            <ShopLayout>
                <section className="mt-8 mb-10 px-2 md:px-6">
                    <div className="container mx-auto px-6 py-4 bg-white shadow-xl rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800 mb-5">
                            {title}
                        </h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                            {data_category.map((item, index) => (
                                <a
                                    href={`/shop/category/${item.id}`}
                                    class="relative cursor-pointer"
                                    key={index + 1}
                                >
                                    <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-hijau1 rounded-lg"></span>
                                    <div class="relative p-6 bg-white border-2 border-hijau1 rounded-lg hover:scale-105 transition duration-500">
                                        <div class="flex justify-center items-center">
                                            <h3 class=" text-center text-lg font-bold text-gray-800">
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
                        <h3 className="text-2xl font-bold text-gray-800 mb-8">
                            Product Dengan Kategori {category.nama}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-3">
                            {data_product.map((item, index) => (
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
                                                class="btn btn-sm btn-info"
                                            >
                                                <span class="text-base text-white">
                                                    Lihat Produk
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ShopLayout>
        </>
    );
};

export default Category;
