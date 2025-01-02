import UserLayout from "@/Layouts/UserLayout";
import { formatRupiah } from "@/Utils/format";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const KelolaPesanan = () => {
    const { title, data_order, data_payment } = usePage().props;

    const { data, setData, put } = useForm({
        id: "",
    });

    const props = usePage().props;

    const calculateOrderDetails = (data_payment, data_order) => {
        return data_payment.map((payment) => {
            const relatedOrders = data_order.filter(
                (order) => order.order_id === payment.order_id
            );

            const totalQty = relatedOrders.reduce(
                (sum, order) => sum + order.qty,
                0
            );
            const totalPrice = relatedOrders.reduce(
                (sum, order) => sum + order.qty * order.harga,
                0
            );

            return {
                ...payment,
                totalQty,
                totalPrice,
            };
        });
    };

    const enrichedData = calculateOrderDetails(data_payment, data_order);

    // console.log(data_order);

    const [selectedData, setSelectedData] = useState(null);

    const handleCanel = (id) => {
        put(`/shop/kelola-pesanan/${id}/update`, {
            onSuccess: () => {
                document.getElementById("modal-hapus").close();
            },
        });
    };

    return (
        <>
            <UserLayout>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
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
                        <span className="font-bold">{props.flash.message}</span>
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
                <hr className="my-4 border-t border-gray-400" />
                <div className="container mx-auto">
                    <div className="w-full">
                        {data_payment.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead className="text-center">
                                        <tr className="font-bold text-gray-600 text-sm">
                                            <th>No</th>
                                            <th>Pelanggan</th>
                                            <th>Jumlah Beli</th>
                                            <th>Total Harga</th>
                                            <th>Status Pembayaran</th>
                                            <th>Foto Transaksi</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {enrichedData.map((row, index) => (
                                            <tr key={row.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {row.order.customer.nama}
                                                </td>
                                                <td>{row.totalQty}</td>
                                                <td>
                                                    {formatRupiah(
                                                        row.totalPrice
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
                                                    {row.status == "2" ? (
                                                        <>
                                                            <>
                                                                <a
                                                                    href={`/shop/kelola-pesanan/${row.id}/konfirmasi`}
                                                                    className="btn btn-success text-white btn-xs mb-2 md:me-1"
                                                                >
                                                                    Konfirmasi
                                                                </a>
                                                            </>
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
                                                                className="btn btn-error text-white btn-xs"
                                                            >
                                                                Batalkan
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <a
                                                                href={`/shop/kelola-pesanan/${row.id}/konfirmasi`}
                                                                className="btn btn-success text-white btn-xs mb-2 md:me-1"
                                                            >
                                                                Konfirmasi
                                                            </a>
                                                        </>
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

                <dialog id="modal-hapus" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            Konfirmasi Batalkan
                        </h3>
                        <p>Apakah Anda yakin ingin membatalkan pesanan ini?</p>
                        <div className="modal-action">
                            <button
                                className="btn btn-error text-white"
                                onClick={() => handleCanel(selectedData?.id)}
                            >
                                Iya
                            </button>
                            <button
                                className="btn"
                                onClick={() =>
                                    document
                                        .getElementById("modal-hapus")
                                        .close()
                                }
                            >
                                Tidak
                            </button>
                        </div>
                    </div>
                </dialog>
            </UserLayout>
        </>
    );
};

export default KelolaPesanan;
