import ShopLayout from "@/Layouts/ShopLayout";
import { useForm, usePage } from "@inertiajs/react";
import { formatRupiah } from "@/Utils/format";

const Search = () => {
    const { data_product, otherProducts, initialSearch } = usePage().props;

    const { data, setData, get } = useForm({
        search: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();

        if (data.search.trim() === "") {
            setData("search", "");
            get("search", { preserveState: true });
        } else {
            get("search", {
                preserveState: true,
                search: data.search,
            });
        }
    };

    const handleInputChange = (e) => {
        setData("search", e.target.value);
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

    return (
        <>
            <ShopLayout>
                <section className="my-3 px-2 md:px-6">
                    <div className="container mx-auto px-6 py-8 bg-white shadow-xl rounded-lg">
                        <p className="text-center md:text-lg text-sm opacity-80">
                            Cari produk favorit anda di platform kami
                        </p>
                        <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto">
                            <form onSubmit={handleSearch}>
                                <div className="relative z-30 text-base text-black">
                                    <input
                                        type="search"
                                        name="q"
                                        value={data.search}
                                        onChange={handleInputChange}
                                        placeholder="Cari ....."
                                        className="mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <section className="mt-4 mb-10 px-2 md:px-6">
                    <div className="container mx-auto px-2 md:px-6 py-4 bg-white shadow-xl rounded-lg">
                        {data_product.data.length === 0 ? (
                            <div>
                                <p className="text-center text-gray-500">
                                    Menampilkan hasil yang relevan.
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-3">
                                    {otherProducts.length === 0 ? (
                                        <p className="text-center text-gray-500">
                                            Tidak ada produk lain yang relevan.
                                        </p>
                                    ) : (
                                        otherProducts.map((item, index) => (
                                            <div
                                                key={index}
                                                className="card bg-base-100 border border-indigo-400 hover:border-indigo-800 hover:scale-95 transition duration-300 w-full"
                                            >
                                                <figure className="p-4">
                                                    <img
                                                        src={`/img/product/${item.foto}`}
                                                        alt={item.nama}
                                                        className="rounded-xl w-full h-[10rem] md:h-[13rem]"
                                                    />
                                                </figure>
                                                <div className="card-body">
                                                    <div className="badge badge-outline py-7 md:py-0">
                                                        {item.category.nama}
                                                    </div>
                                                    <h2 className="card-title">
                                                        {item.nama}
                                                    </h2>
                                                    <div className="block md:flex justify-between items-center">
                                                        <h5 className="text-base font-semibold mb-1 md:mb-0">
                                                            {formatRupiah(
                                                                item.harga
                                                            )}
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
                                        ))
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-3">
                                {data_product.data.map((item, index) => (
                                    <div
                                        key={index}
                                        className="card bg-base-100 border border-indigo-400 hover:border-indigo-800 hover:scale-95 transition duration-300 w-full"
                                    >
                                        <figure className="p-4">
                                            <img
                                                src={`/img/product/${item.foto}`}
                                                alt={item.nama}
                                                className="rounded-xl w-full h-[10rem] md:h-[13rem]"
                                            />
                                        </figure>
                                        <div className="card-body">
                                            <div className="badge badge-outline py-7 md:py-0">
                                                {item.category.nama}
                                            </div>
                                            <h2 className="card-title text-sm">
                                                {item.nama}
                                            </h2>
                                            <div className="block md:flex justify-between items-center">
                                                <h5 className="text-base font-semibold mb-1 md:mb-0">
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
                        )}

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
                                                    href={`?search=${data.search}&page=${page}`}
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

export default Search;
