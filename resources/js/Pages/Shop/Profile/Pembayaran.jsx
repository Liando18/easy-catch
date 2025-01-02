import UserLayout from "@/Layouts/UserLayout";
import { formatRupiah } from "@/Utils/format";
import { useForm, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Pembayaran = () => {
    const { title, data_order, data_payment } = usePage().props;
    return (
        <>
            <UserLayout>
                <h2 className="text-xl font-bold mb-4">{title}</h2>

                <hr className="my-4 border-t border-gray-400" />
                <div className="container mx-auto">
                    <div className="w-full">
                        {data_payment.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead className="text-center">
                                        <tr className="font-bold text-gray-600 text-sm">
                                            <th>No</th>
                                            <th>Waktu Pembelian</th>
                                            <th>Status Pembayaran</th>
                                            <th>Konfirmasi Pemesanan</th>
                                            <th>Foto Transaksi</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {data_payment.map((row, index) => (
                                            <tr key={row.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {format(
                                                        new Date(
                                                            row.created_at
                                                        ),
                                                        "dd MMM yyyy HH:mm:ss"
                                                    )}
                                                </td>
                                                <td
                                                    className={`font-bold ${
                                                        row.status == "1"
                                                            ? "text-yellow-600"
                                                            : row.status == "2"
                                                            ? "text-teal-600"
                                                            : "text-red-600"
                                                    }`}
                                                >
                                                    {row.status == "1"
                                                        ? "Belum dibayar"
                                                        : row.status == "2"
                                                        ? "Sudah dibayar"
                                                        : "Dibatalkan"}
                                                </td>

                                                {row.status == "2" ? (
                                                    row.delivery ? (
                                                        <td className="font-bold text-teal-600">
                                                            Sudah dikonfirmasi
                                                        </td>
                                                    ) : (
                                                        <td className="font-bold text-yellow-600">
                                                            Belum dikonfirmasi
                                                        </td>
                                                    )
                                                ) : (
                                                    <td>-</td>
                                                )}
                                                <td>
                                                    <a
                                                        href={`/img/payment/${row.bukti_pembayaran}`}
                                                        target="_blank"
                                                    >
                                                        <img
                                                            src={`/img/payment/${row.bukti_pembayaran}`}
                                                            alt="..."
                                                            className="w-[70px] h-[90px] mx-auto"
                                                        />
                                                    </a>
                                                </td>
                                                <td>
                                                    <a
                                                        href={`/shop/payment/${row.id}/detail`}
                                                        className="btn btn-info text-white btn-xs mb-2 md:me-1"
                                                    >
                                                        Detail Pesanan
                                                    </a>
                                                    {row.status == "1" ? (
                                                        <>
                                                            <button className="btn btn-error text-white btn-xs">
                                                                Batalkan
                                                            </button>
                                                        </>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <h3>Belum ada pesanan</h3>
                        )}
                    </div>
                </div>
            </UserLayout>
        </>
    );
};

export default Pembayaran;
