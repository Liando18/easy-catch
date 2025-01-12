import ShopLayout from "@/Layouts/ShopLayout";
import { formatRupiah } from "@/Utils/format";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

const Cart = () => {
    const { title, data_cart } = usePage().props;
    const props = usePage().props;

    const totalJumlah = data_cart.reduce((acc, item) => acc + item.qty, 0);
    const totalHarga = data_cart.reduce(
        (acc, item) => acc + item.product.harga,
        0
    );

    const [selectedData, setSelectedData] = useState(null);

    const {
        data,
        setData,
        put,
        delete: destroy,
        reset,
    } = useForm({
        id: "",
        qty: 0,
    });

    const rowCart = (row) => {
        setData({
            id: row.id,
            qty: row.qty,
        });

        document.getElementById("modal-edit").showModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/shop/keranjang/${data.id}/edit`, data, {
            onSuccess: () => {
                reset();
            },
            onError: (err) => {
                console.log("Terjadi kesalahan : ", err);
            },
        });

        document.getElementById("modal-edit").close();
    };

    const handleDelete = (id) => {
        destroy(`/shop/keranjang/${id}/delete`, {
            onSuccess: () => {
                document.getElementById("modal-hapus").close();
            },
        });
    };

    return (
        <ShopLayout>
            <section className="mx-5 md:mx-10 px-4 md:px-8 bg-white border rounded-lg my-8 py-4 antialiased md:py-8">
                {data_cart.length > 0 && (
                    <ol className="items-center mb-8 md:mb-6 flex flex-wrap md:flex-nowrap w-full max-w-2xl text-center text-sm font-medium text-gray-500 sm:text-base">
                        <li className="after:border-1 flex items-center text-hijau1 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 sm:after:inline-block sm:after:content-[''] md:w-auto xl:after:mx-10">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                                <svg
                                    className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                Keranjang
                            </span>
                        </li>

                        <li className="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 sm:after:inline-block sm:after:content-[''] md:w-auto xl:after:mx-10">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                                <svg
                                    className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                Checkout
                            </span>
                        </li>

                        <li className="flex shrink-0 items-center md:w-auto">
                            <svg
                                className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            Pembayaran
                        </li>
                    </ol>
                )}
                <div className="px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                        {title}
                    </h2>

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
                                    {Object.values(props.errors).map(
                                        (error, index) => (
                                            <li key={index}>{error}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}

                    {data_cart.length > 0 ? (
                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none rounded-xl lg:max-w-2xl xl:max-w-4xl">
                                <div className="space-y-6">
                                    {data_cart.map((row, index) => (
                                        <div
                                            key={index}
                                            className="rounded-lg border-2 bg-white p-4 shadow-sm md:p-6"
                                        >
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <a
                                                    href={`/shop/product-detail/${row.product.id}`}
                                                    className="shrink-0 md:order-1"
                                                >
                                                    <img
                                                        className="h-24 w-24 rounded-full"
                                                        src={`/img/product/${row.product.foto}`}
                                                        alt="product image"
                                                    />
                                                </a>
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <div className="flex items-center me-8">
                                                        <p className="text-base">
                                                            {row.qty} Jumlah
                                                            Beli
                                                        </p>
                                                    </div>
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base">
                                                            {formatRupiah(
                                                                row.product
                                                                    .harga
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="w-full min-w-0 flex-1 md:order-2 md:max-w-md">
                                                    <a
                                                        href={`/shop/product-detail/${row.product.id}`}
                                                        className="text-lg font-extrabold text-gray-900 hover:underline"
                                                    >
                                                        {row.product.nama}
                                                    </a>
                                                    <p className="text-base font-bold text-gray-700">
                                                        {row.product.store.nama}
                                                    </p>
                                                    <p className="text-sm font-bold text-gray-600">
                                                        {formatRupiah(
                                                            row.product.harga *
                                                                row.qty
                                                        )}
                                                    </p>
                                                    <div className="flex items-center gap-4 mt-3">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                rowCart(row)
                                                            }
                                                            className="inline-flex items-center text-sm font-medium py-2 px-3 rounded-full text-yellow-600 border border-yellow-600 hover:bg-yellow-600 hover:text-white transition duration-300"
                                                        >
                                                            <i className="fa-solid fa-pen me-1.5 h-3 w-5"></i>
                                                            Update
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedData(
                                                                    row
                                                                );
                                                                document
                                                                    .getElementById(
                                                                        "modal-hapus"
                                                                    )
                                                                    .showModal();
                                                            }}
                                                            className="inline-flex items-center text-sm font-medium py-2 px-3 rounded-full text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition duration-300"
                                                        >
                                                            <i className="fa-solid fa-trash me-1.5 h-4 w-5"></i>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mx-auto mt-6 max-w-4xl rounded-xl border-2 flex-1 space-y-6 lg:mt-0 lg:w-full">
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                                    <p className="text-xl font-semibold text-gray-900">
                                        Detail Pembayaran
                                    </p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">
                                                    Jumlah Beli
                                                </dt>
                                                <dd className="text-base font-medium text-gray-900">
                                                    {totalJumlah}
                                                </dd>
                                            </dl>

                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500">
                                                    Total Harga
                                                </dt>
                                                <dd className="text-base font-medium text-gray-900">
                                                    {formatRupiah(totalHarga)}
                                                </dd>
                                            </dl>
                                        </div>

                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                            <dt className="text-base font-bold text-gray-900">
                                                Total Pembayaran
                                            </dt>
                                            <dd className="text-base font-bold text-gray-900">
                                                {formatRupiah(
                                                    totalJumlah * totalHarga
                                                )}
                                            </dd>
                                        </dl>
                                        <a
                                            href="/shop/checkout"
                                            className="bg-teal-500 text-sm md:text-base flex gap-2 justify-center items-center text-white px-6 py-2 rounded-full w-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
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
                                            Chackout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 sm:mt-8 p-4 mx-auto w-full rounded-xl border-4 max-w-full">
                            <h1 className="text-center">
                                Belum ada produk di dalam keranjang belanja anda
                            </h1>
                        </div>
                    )}
                </div>

                {/* Modal Edit */}
                <dialog id="modal-edit" className="modal">
                    <div className="modal-box w-11/12 md:w-1/4 max-w-full">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">Form Edit Data</h3>
                        <form className="py-4" onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Jumlah Beli
                                    </label>
                                    <input
                                        type="number"
                                        name="qty"
                                        value={data.qty}
                                        onChange={(e) =>
                                            setData("qty", e.target.value)
                                        }
                                        placeholder="Jumlah Produk Anda"
                                        className="input input-bordered w-full max-w-full"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-warning text-white"
                            >
                                Update Jumlah Beli
                            </button>
                        </form>
                    </div>
                </dialog>

                {/* Modal Hapus */}
                <dialog id="modal-hapus" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Konfirmasi Hapus</h3>
                        <p>Apakah Anda yakin ingin menghapus data ini?</p>
                        <div className="modal-action">
                            <button
                                className="btn btn-error text-white"
                                onClick={() => handleDelete(selectedData?.id)}
                            >
                                Hapus
                            </button>
                            <button
                                className="btn"
                                onClick={() =>
                                    document
                                        .getElementById("modal-hapus")
                                        .close()
                                }
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </dialog>
            </section>
        </ShopLayout>
    );
};

export default Cart;
