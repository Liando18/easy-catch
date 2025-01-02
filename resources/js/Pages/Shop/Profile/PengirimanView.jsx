import { formatRupiah } from "@/Utils/format";
import { format } from "date-fns";
import { useForm, usePage } from "@inertiajs/react";
import {
    MapContainer,
    Marker,
    Polyline,
    Popup,
    TileLayer,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import UserLayout from "@/Layouts/UserLayout";
import { useEffect, useState } from "react";

const PengirimanView = () => {
    const { title, delivery, data_item } = usePage().props;

    const [shippingCost, setShippingCost] = useState(0);
    const totalJumlah = data_item.reduce((acc, item) => acc + item.qty, 0);
    const totalHarga = data_item.reduce(
        (acc, item) => acc + item.harga * item.qty,
        0
    );
    const totalBayar = totalHarga + delivery.ongkir;

    const [startPoint] = useState([delivery.order.let, delivery.order.long]);
    const [endPoint] = useState([delivery.store.let, delivery.store.long]);
    const [speed, setSpeed] = useState(40);
    const [route, setRoute] = useState([]);

    const fetchRoute = async () => {
        const apiKey =
            "5b3ce3597851110001cf6248113ff1775e794ad0aaa7eb346a3aee64";
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startPoint[1]},${startPoint[0]}&end=${endPoint[1]},${endPoint[0]}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const coordinates = data.features[0].geometry.coordinates.map(
                ([lng, lat]) => [lat, lng]
            );
            setRoute(coordinates);
        } catch (error) {
            console.error("Error fetching route:", error);
        }
    };

    useEffect(() => {
        fetchRoute();
    }, [startPoint, endPoint]);

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
        const cost = distance < 1 ? 0 : distance * 2500;
        setShippingCost(cost);
    };

    useEffect(() => {
        calculateShippingCost();
    }, [startPoint, endPoint]);

    const distance = calculateDistance();
    const estimatedTime = calculateTime();
    const bounds = [startPoint, endPoint];

    return (
        <>
            <UserLayout>
                <section className="bg-white">
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
                                    Alamat : {delivery.order.customer.alamat}
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
                                                        : [startPoint, endPoint]
                                                }
                                                color="blue"
                                            />
                                        </MapContainer>
                                    </dd>
                                    <dd className="text-base border p-3 rounded-lg font-normal">
                                        <p className="text-base font-normal">
                                            Jarak: {distance.toFixed(2)} km
                                        </p>
                                        <p className="text-base font-normal">
                                            Perkiraan Sampai:{" "}
                                            {speed
                                                ? formatTime(estimatedTime)
                                                : "-"}
                                        </p>
                                        <p className="text-base font-semibold">
                                            Alternatif Pengiriman Paket :{" "}
                                            {distance.toFixed(2) >= 2
                                                ? "Motor"
                                                : "Drone"}
                                        </p>
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
                                                                    {row.product
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
                                                                    {row.product
                                                                        ?.nama ||
                                                                        "Tidak ada nama"}
                                                                </div>
                                                                <div className="text-sm opacity-50">
                                                                    {row.product
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
                                                            row.qty * row.harga
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
                            href="/shop/pengiriman"
                            className="btn btn-neutral text-white"
                        >
                            Kembali
                        </a>
                    </div>
                </section>
            </UserLayout>
        </>
    );
};

export default PengirimanView;
