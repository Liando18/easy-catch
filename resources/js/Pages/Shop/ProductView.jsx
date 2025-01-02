import ShopLayout from "@/Layouts/ShopLayout";
import { formatRupiah } from "@/Utils/format";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

const ProductView = () => {
    const { data_product, auth } = usePage().props;
    const props = usePage().props;
    const { data, setData, post, reset } = useForm({
        customer_id: auth.user?.data?.id,
        qty: 1,
    });

    const [err, setErr] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (auth.user) {
            if (data.qty > data_product.stok) {
                setErr("Stok tidak mencukupi");
            } else {
                setErr(null);
                post(`/shop/product-detail/${data_product.id}`, {
                    onSuccess: () => {
                        reset();
                    },
                    onError: (err) => {
                        console.log("Kesalahan pada", err);
                        setErr("Ada kesalahan");
                    },
                });
            }
        } else {
            setErr("Anda belum login !!");
        }
    };
    return (
        <>
            <ShopLayout>
                <section>
                    <div className="mx-5 md:mx-10 p-8 bg-gray-100 my-8 rounded-lg">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full md:w-1/2 px-4 mb-8">
                                <img
                                    src={`/img/product/${data_product.foto}`}
                                    alt="Product"
                                    className="w-full h-[25rem] md:h-[40rem] rounded-xl shadow-md mb-4"
                                    id="mainImage"
                                />
                            </div>

                            <div className="w-full md:w-1/2 px-4 bg-white rounded-xl py-4">
                                <h2 className="text-3xl font-bold mb-4">
                                    {data_product.nama}
                                </h2>
                                <a
                                    href={`/shop/category/${data_product.category.id}`}
                                    className="text-teal-600 mb-4 border border-teal-600 px-4 py-2 rounded-lg"
                                >
                                    {data_product.category.nama}
                                </a>

                                <div className="mb-2 mt-10">
                                    <span className="text-xl font-bold mr-2">
                                        {formatRupiah(data_product.harga)}
                                    </span>
                                    <span className="text-gray-500 line-through">
                                        {formatRupiah(
                                            data_product.harga +
                                                data_product.harga * 0.1
                                        )}
                                    </span>
                                </div>
                                <p className="text-gray-900 mb-4">
                                    Stok : {data_product.stok} (
                                    {data_product.stok > 0
                                        ? "Tersedia"
                                        : "Tidak tersedia"}
                                    )
                                </p>
                                {/* <div className="flex items-center mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6 text-yellow-500"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6 text-yellow-500"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6 text-yellow-500"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6 text-yellow-500"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6 text-yellow-500"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <span className="ml-2 text-gray-600">
                                        4.5 (120 reviews)
                                    </span>
                                </div> */}
                                <p className="mb-2">Deskripsi :</p>
                                <p
                                    className="text-gray-700 mb-6 border border-gray-700 p-3 rounded-2xl"
                                    dangerouslySetInnerHTML={{
                                        __html: data_product.deskripsi,
                                    }}
                                />

                                {/* <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Color:
                                    </h3>
                                    <div className="flex space-x-2">
                                        <button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                                        <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                                        <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                                    </div>
                                </div> */}

                                <div className="mb-3">
                                    <form
                                        className="me-3"
                                        onSubmit={handleSubmit}
                                    >
                                        <label
                                            htmlFor="quantity"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Jumlah :
                                        </label>
                                        <div className="flex gap-3">
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="qty"
                                                min="1"
                                                value={data.qty}
                                                onChange={(e) =>
                                                    setData(
                                                        "qty",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-20 text-center rounded-md border-gray-700  shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-blue-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                                    />
                                                </svg>
                                                Masukkan ke keranjang
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                {err && (
                                    <div
                                        role="alert"
                                        className="alert alert-warning mt-3 transition duration-300"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 shrink-0 stroke-current"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                        <span>{err}</span>
                                    </div>
                                )}
                                {props.flash.message && (
                                    <div
                                        className="p-4 my-4 text-sm text-green-800 rounded-lg bg-green-100 "
                                        role="alert"
                                    >
                                        <svg
                                            className="flex-shrink-0 inline w-4 h-4 me-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="font-bold">
                                            {props.flash.message}
                                        </span>
                                    </div>
                                )}
                                {Object.keys(props.errors).length > 0 && (
                                    <div
                                        className="flex p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100"
                                        role="alert"
                                    >
                                        <svg
                                            className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <div>
                                            <span className="font-medium">
                                                Ada Kesalahan pada Formulir:
                                            </span>
                                            <ul className="mt-1.5 list-disc list-inside">
                                                {Object.values(
                                                    props.errors
                                                ).map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </ShopLayout>
        </>
    );
};

export default ProductView;
