import UserLayout from "@/Layouts/UserLayout";
import { formatRupiah } from "@/Utils/format";
import { useForm, usePage } from "@inertiajs/react";

const Pesanan = () => {
    const { title, data_delivery, data_order } = usePage().props;
    const props = usePage().props;

    const { data, setData, put, reset } = useForm({
        id: "",
        status: "",
        pengiriman: "",
    });

    const calculateOrderDetails = (data_delivery, data_order) => {
        return data_delivery.map((delivery) => {
            const relatedOrders = data_order.filter(
                (order) =>
                    order.order_id === delivery.order_id &&
                    order.store_id === delivery.store_id
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
                        <span className="font-bold">
                            Paket berhasil dikonfirmasi, terimakasih telah
                            berbelanja di toko kami.
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
                <div className="container mx-auto">
                    <div className="w-full">
                        {data_delivery.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead className="text-center">
                                        <tr className="font-bold text-gray-600 text-sm">
                                            <th>No</th>
                                            <th>Toko</th>
                                            <th>Jumlah Beli</th>
                                            <th>Ongkir</th>
                                            <th>Total Harga</th>
                                            <th>Status Pengirman</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {enrichedData.map((row, index) => (
                                            <tr key={row.id}>
                                                <td>{index + 1}</td>
                                                <td>{row.store.nama}</td>
                                                <td>{row.totalQty}</td>
                                                <td>
                                                    {formatRupiah(row.ongkir)}
                                                </td>
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
                                                            ? "text-blue-600"
                                                            : "text-teal-600"
                                                    }`}
                                                >
                                                    {row.status == "1"
                                                        ? "Proses Pengemasan"
                                                        : row.status == "2"
                                                        ? "Dikirim"
                                                        : row.status == "3"
                                                        ? "Paket Sampai"
                                                        : "Dibatalkan"}
                                                </td>
                                                <td>
                                                    <a
                                                        href={`/shop/pengiriman/${row.id}/view`}
                                                        className="btn btn-info text-white mb-2 md:me-1"
                                                    >
                                                        View Pesanan
                                                    </a>
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

                {/* Modal Edit */}
                <dialog id="modal-edit" className="modal">
                    <div className="modal-box w-full md:w-1/3 max-w-full">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">
                            Konfirmasi Pesanan
                        </h3>
                        <form className="py-4" onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Statu Pengiriman
                                    </label>
                                    <select
                                        name="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="select select-bordered w-full max-w-full"
                                    >
                                        <option value="">Pilih</option>
                                        <option value="2">Belum Sampai</option>
                                        <option value="3">Paket Sampai</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-success text-white"
                            >
                                Konfirmasi
                            </button>
                        </form>
                    </div>
                </dialog>
            </UserLayout>
        </>
    );
};

export default Pesanan;
