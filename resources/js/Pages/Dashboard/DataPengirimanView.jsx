import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatRupiah } from "@/Utils/format";
import { format } from "date-fns";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    MapContainer,
    Marker,
    Polyline,
    Popup,
    TileLayer,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

const DataPengirimanView = () => {
    const { auth, title, delivery, data_item } = usePage().props;
    const props = usePage().props;

    useEffect(() => {
        if (delivery) {
            console.log(delivery);
        } else {
            console.log("No delivery available");
        }
    }, [delivery]);

    const { data, setData, put, reset } = useForm({
        id: delivery.id,
        status: delivery.status,
    });

    const [shippingCost, setShippingCost] = useState(0);
    const totalJumlah = data_item.reduce((acc, item) => acc + item.qty, 0);
    const totalHarga = data_item.reduce(
        (acc, item) => acc + item.harga * item.qty,
        0
    );
    const totalBayar = totalHarga + delivery.ongkir;

    const [startPoint] = useState([delivery.order.let, delivery.order.long]);
    const [mePoint] = useState([delivery.order.let, delivery.order.long]);
    const [endPoint] = useState([delivery.store.let, delivery.store.long]);
    const [speed, setSpeed] = useState(40);
    const [route, setRoute] = useState([]);

    const calculateDistance = () => {
        const start = L.latLng(startPoint);
        const end = L.latLng(endPoint);
        const distanceInMeters = start.distanceTo(end);
        return distanceInMeters / 1000;
    };

    const calculateTime = () => {
        const distance = calculateDistance();
        return distance / speed;
    };

    const formatTime = (timeInHours) => {
        const hours = Math.floor(timeInHours);
        const minutes = Math.round((timeInHours - hours) * 60);
        return `${hours > 0 ? `${hours} jam ` : ""}${minutes} menit`;
    };

    const AdjustZoom = ({ bounds }) => {
        const map = useMap();
        useEffect(() => {
            if (bounds) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }, [bounds, map]);
        return null;
    };

    const calculateShippingCost = () => {
        const distance = calculateDistance();
        const cost = distance < 1 ? 2000 : distance * 2000;
        setShippingCost(cost);
    };

    useEffect(() => {
        calculateShippingCost();
    }, [startPoint, endPoint]);

    const distance = calculateDistance();
    const estimatedTime = calculateTime();
    const bounds = [startPoint, endPoint];

    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/dashboard/data_pengiriman/${data.id}/update`, {
            onSuccess: () => {
                reset();
            },
            onError: (err) => {
                console.error("Kesalahan pada : ", err);
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

                        <div className="md:px-4">
                            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                                {title}
                            </h2>
                            <hr className="my-3 border border-gray-300" />
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    Pelanggan
                                </h3>
                                <div className="border-2 p-3 rounded-lg">
                                    <p className="text-base font-normal">
                                        Nama : {delivery.order.customer.nama}
                                    </p>
                                    <p className="text-base font-normal">
                                        No Handphoe :{" "}
                                        {delivery.order.customer.handphone}
                                    </p>
                                    <p className="text-base font-normal">
                                        Alamat :{" "}
                                        {delivery.order.customer.alamat}
                                    </p>
                                    <p className="text-base font-normal">
                                        Tanggal Pemesanan :{" "}
                                        {format(
                                            new Date(delivery.created_at),
                                            "dd MMM yyyy"
                                        )}
                                    </p>
                                    <p className="text-base font-normal">
                                        Waktu Pemesanan :{" "}
                                        {format(
                                            new Date(delivery.created_at),
                                            "HH:mm:ss"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    Toko
                                </h3>
                                <div className="border-2 p-3 rounded-lg">
                                    <p className="text-base font-normal">
                                        Nama : {delivery.store.nama}
                                    </p>
                                    <p className="text-base font-normal">
                                        Alamat : {delivery.store.alamat}
                                    </p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    Alamat
                                </h3>
                                <div className="border-2 p-3 rounded-lg">
                                    <dl className="block mb-3">
                                        <dt className="text-base font-medium">
                                            Detail Alamat
                                        </dt>
                                        <dd className="text-base border p-3 rounded-lg font-normal">
                                            {delivery.order.alamat}
                                        </dd>
                                    </dl>
                                    <dl className="block mb-3">
                                        <dt className="text-base font-medium">
                                            Koordinat Alamat
                                        </dt>
                                        <dd className="font-normal mb-3">
                                            <MapContainer
                                                className="w-full h-96 z-0"
                                                center={startPoint}
                                                zoom={15}
                                                scrollWheelZoom={false}
                                            >
                                                <TileLayer
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    attribution="&copy; OpenStreetMap contributors"
                                                />
                                                <AdjustZoom bounds={bounds} />
                                                {/* Marker Awal */}
                                                <Marker
                                                    position={startPoint}
                                                    color="red"
                                                >
                                                    <Popup>Toko</Popup>
                                                </Marker>
                                                {/* Marker Tujuan */}
                                                <Marker
                                                    position={endPoint}
                                                    color="green"
                                                >
                                                    <Popup>Pelanggan</Popup>
                                                </Marker>
                                                {/* Polyline untuk rute */}
                                                <Polyline
                                                    positions={
                                                        route.length > 0
                                                            ? route
                                                            : [
                                                                  startPoint,
                                                                  endPoint,
                                                              ]
                                                    }
                                                    color="blue"
                                                />
                                            </MapContainer>
                                        </dd>
                                        <dd className="text-base border p-3 rounded-lg font-normal">
                                            <dt className="text-base font-medium">
                                                Koordinat Pelanggan
                                            </dt>
                                            <dd className="text-base border p-3 rounded-lg font-normal">
                                                Latitude : {delivery.order.let}
                                                <br />
                                                Longtitude :{" "}
                                                {delivery.order.long}
                                            </dd>
                                            <dt className="text-base font-medium mt-3">
                                                Koordinat Toko
                                            </dt>
                                            <dd className="text-base border p-3 rounded-lg font-normal">
                                                Latitude : {delivery.store.let}
                                                <br />
                                                Longtitude :{" "}
                                                {delivery.store.long}
                                            </dd>
                                            <dt className="text-base font-medium mt-3">
                                                Metode GIS
                                            </dt>
                                            <dd className="text-base border p-3 rounded-lg font-normal">
                                                Jarak: {distance.toFixed(2)} km
                                                <br />
                                                Perkiraan Sampai:{" "}
                                                {speed
                                                    ? formatTime(estimatedTime)
                                                    : "-"}
                                            </dd>
                                            <dt className="text-base font-medium mt-3">
                                                Status
                                            </dt>
                                            <dd className="text-base border p-3 rounded-lg font-normal">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-3">
                                                        <select
                                                            value={data.status}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "status",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="select select-bordered w-full max-w-full"
                                                        >
                                                            <option
                                                                disabled
                                                                selected
                                                            >
                                                                Pilih
                                                            </option>
                                                            <option value="1">
                                                                Proses
                                                            </option>
                                                            <option value="2">
                                                                Dikirim
                                                            </option>
                                                            <option value="3">
                                                                Selesai
                                                            </option>
                                                            <option value="4">
                                                                Batal
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="submit"
                                                            className="btn btn-success text-white"
                                                        >
                                                            Update Status
                                                        </button>
                                                    </div>
                                                </form>
                                            </dd>
                                            {/* <p className="text-base font-semibold">
                                                Alternatif Pengiriman Paket :{" "}
                                                {distance.toFixed(2) >= 2
                                                    ? "Motor"
                                                    : "Drone"}
                                            </p> */}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    Produk
                                </h3>
                                {data_item.length > 0 ? (
                                    <div className="overflow-x-auto border-2 p-3 rounded-lg">
                                        <table className="table">
                                            <thead className="text-center">
                                                <tr className="font-bold text-gray-600 text-sm">
                                                    <th>No</th>
                                                    <th className="text-left">
                                                        Produk
                                                    </th>
                                                    <th>Jumlah Beli</th>
                                                    <th>Harga</th>
                                                    <th>Total Harga</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                {data_item.map((row, index) => (
                                                    <tr key={row.id}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle h-12 w-12">
                                                                        {row
                                                                            .product
                                                                            ?.foto && (
                                                                            <img
                                                                                src={`/img/product/${row.product.foto}`}
                                                                                alt="Produk"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="text-left">
                                                                    <div className="font-bold">
                                                                        {row
                                                                            .product
                                                                            ?.nama ||
                                                                            "Tidak ada nama"}
                                                                    </div>
                                                                    <div className="text-sm opacity-50">
                                                                        {row
                                                                            .product
                                                                            ?.category
                                                                            ?.nama ||
                                                                            "Tidak ada kategori"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{row.qty}</td>
                                                        <td>
                                                            {formatRupiah(
                                                                row.harga
                                                            )}
                                                        </td>
                                                        <td>
                                                            {formatRupiah(
                                                                row.qty *
                                                                    row.harga
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
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    Pembayaran
                                </h3>
                                <div className="border-2 p-3 rounded-lg">
                                    <p className="text-base font-normal">
                                        Jumlah Beli : {totalJumlah} Produk
                                    </p>
                                    <hr className="my-2 border" />
                                    <p className="text-base font-normal">
                                        Total Harga : {formatRupiah(totalHarga)}
                                    </p>
                                    <hr className="my-2 border" />
                                    <p className="text-base font-normal">
                                        Harga Ongkir:{" "}
                                        {formatRupiah(delivery.ongkir)}
                                    </p>
                                    <hr className="my-2 border" />
                                    <p className="text-base font-semibold">
                                        Total Pembayaran :{" "}
                                        {formatRupiah(totalBayar)}
                                    </p>
                                    <hr className="my-2 border" />
                                    <p className="text-base font-semibold">
                                        Bukti Pembayaran
                                        <a
                                            href={`/img/payment/${delivery.payment.bukti_pembayaran}`}
                                            target="_blank"
                                        >
                                            <img
                                                src={`/img/payment/${delivery.payment.bukti_pembayaran}`}
                                                alt="..."
                                                className="w-[100px] h-[150px]"
                                            />
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <hr className="my-3 border border-gray-300" />
                            <a
                                href="/dashboard/data_pengiriman"
                                className="btn btn-neutral text-white"
                            >
                                Kembali
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataPengirimanView;
