import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatRupiah } from "@/Utils/format";
import { Head, useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const DataPengiriman = () => {
    const { auth, title, data_delivery, data_order } = usePage().props;
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        errors,
    } = useForm({
        id: "",
        status: "",
        pengiriman: "",
    });

    const props = usePage().props;

    const calculateOrderDetails = (data_delivery, data_order) => {
        return data_delivery.map((delivery) => {
            const relatedOrders = data_order.filter(
                (order) => order.order_id === delivery.order_id
            );
            const totalQty = relatedOrders.reduce(
                (sum, order) => sum + order.qty,
                0
            );
            const totalPrice = relatedOrders.reduce(
                (sum, order) => sum + order.qty * order.harga + delivery.ongkir,
                0
            );

            return {
                ...delivery,
                totalQty,
                totalPrice,
            };
        });
    };

    const enrichedData = calculateOrderDetails(data_delivery, data_order);

    const rowCart = (row) => {
        setData({
            id: row.id,
            status: row.status,
            pengiriman: row.pengiriman,
        });

        document.getElementById("modal-edit").showModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/shop/pengiriman/${data.id}/update`, data, {
            onSuccess: () => {
                reset();
            },
            onError: (err) => {
                console.log("Terjadi kesalahan : ", err);
            },
        });

        document.getElementById("modal-edit").close();
    };

    const handleEdit = (row) => {
        setData({
            id: row.id,
            nama: row.nama,
        });
        document.getElementById("modal-edit").showModal();
    };

    const handleDelete = (id) => {
        destroy(`/dashboard/data_category/${id}`, {
            onSuccess: () => {
                document.getElementById("modal-hapus").close();
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {props.title}
                </h2>
            }
        >
            <Head title="Data Akses" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-5 overflow-hidden shadow-sm sm:rounded-lg">
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

                        {/* Table */}
                        <div className="overflow-x-auto mt-5">
                            <table className="table">
                                <thead className="text-center">
                                    <tr className="font-bold text-gray-600 text-sm">
                                        <th>No</th>
                                        <th>Pelanggan</th>
                                        <th>Toko</th>
                                        <th>Status Pengirman</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {enrichedData.map((row, index) => (
                                        <tr key={row.id}>
                                            <td>{index + 1}</td>
                                            <td>{row.order.customer.nama}</td>
                                            <td>{row.store.nama}</td>
                                            <td
                                                className={`font-bold ${
                                                    row.status == "1" ||
                                                    row.payment.status == "1"
                                                        ? "text-yellow-600"
                                                        : row.status == "2"
                                                        ? "text-blue-600"
                                                        : "text-teal-600"
                                                }`}
                                            >
                                                {row.payment.status == "1"
                                                    ? "Belum dikonfirmasi"
                                                    : row.status == "1"
                                                    ? "Proses"
                                                    : row.status == "2"
                                                    ? "Dikirim"
                                                    : row.status == "3"
                                                    ? "Paket Sampai"
                                                    : "Dibatalkan"}
                                            </td>
                                            <td>
                                                <a
                                                    href={`/dashboard/data_pengiriman/${row.id}/view`}
                                                    className="btn btn-info text-white btn-xs mb-2 md:me-1"
                                                >
                                                    View Produk
                                                </a>

                                                {/* <button
                                                                                onClick={() =>
                                                                                    rowCart(row)
                                                                                }
                                                                                className="btn btn-warning text-white btn-xs mb-2 md:me-1"
                                                                            >
                                                                                Update Status
                                                                            </button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataPengiriman;
