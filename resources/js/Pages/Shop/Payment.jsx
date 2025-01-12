import ShopLayout from "@/Layouts/ShopLayout";
import { formatRupiah } from "@/Utils/format";
import { useForm, usePage } from "@inertiajs/react";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    Polyline,
    useMap,
} from "react-leaflet";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

const Payment = () => {
    const { title, data_payment, data_order, order } = usePage().props;
    const props = usePage().props;
    const { data, setData, post, reset } = useForm({
        id: "",
        bukti_pembayaran: null,
    });

    const [fotoPreviews, setFotoPreviews] = useState({});
    const [route, setRoute] = useState([]);
    const [totalShippingCost, setTotalShippingCost] = useState(0);
    const [ongkir, setOngkir] = useState(0);

    const handleFileChange = (e, paymentId, index) => {
        const file = e.target.files[0];
        if (!file) return;

        setData({
            id: paymentId,
            bukti_pembayaran: file,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            setFotoPreviews((prev) => ({
                ...prev,
                [index]: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleDownload = (data) => {
        const canvas = document.getElementById("qr-code");
        if (!canvas) {
            console.error("Canvas with ID 'qr-code' not found.");
            return;
        }
        const imageUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = data.store.nama + "-Qris.png";
        link.click();
    };

    const fetchRoute = async (start, end) => {
        const apiKey =
            "5b3ce3597851110001cf6248113ff1775e794ad0aaa7eb346a3aee64";
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;

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

    const calculateDistance = (start, end) => {
        const startLatLng = L.latLng(start);
        const endLatLng = L.latLng(end);
        const distanceInMeters = startLatLng.distanceTo(endLatLng);
        return distanceInMeters / 1000;
    };

    const calculateShippingCost = (distance) => {
        if (distance < 1) return 2000;
        return distance * 2000;
    };

    useEffect(() => {
        if (order.let && order.long && data_payment.length > 0) {
            let totalCost = 0;

            data_payment.forEach((payment) => {
                const start = [order.let, order.long];
                const end = [payment.store.let, payment.store.long];
                const distance = calculateDistance(start, end);
                const shippingCost = calculateShippingCost(distance);
                totalCost += shippingCost;

                payment.distance = distance;
                payment.shippingCost = shippingCost;

                data_order
                    .filter((item) => item.store_id === payment.store.id)
                    .forEach((order) => {
                        order.ongkir = shippingCost;
                    });
            });
        }
    }, [order, data_payment]);

    const AdjustZoom = ({ bounds }) => {
        const map = useMap();
        useEffect(() => {
            if (bounds) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }, [bounds, map]);
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.id || !data.bukti_pembayaran) {
            console.error("ID atau bukti pembayaran tidak valid.");
            return;
        }

        const formData = new FormData();
        formData.append("id", data.id);
        formData.append("bukti_pembayaran", data.bukti_pembayaran);

        console.log("Form Data:", [...formData.entries()]);

        post(`/shop/payment/${data.id}/update`, {
            data: formData,
            onSuccess: () => {
                reset();
                setData({
                    id: "",
                    bukti_pembayaran: null,
                });
            },
            onError: (error) => {
                console.error("Error:", error);
            },
        });
    };

    return (
        <>
            <ShopLayout>
                <section className="mx-5 md:mx-10 px-4 md:px-8 bg-white border rounded-lg my-8 py-4 antialiased md:py-8">
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
                                Checkout
                            </span>
                        </li>

                        <li className="flex shrink-0 items-center text-hijau1 md:w-auto">
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

                    <div className="2xl:px-0 mt-8 md:mt-6">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            {title}
                        </h2>
                        {props.flash.message && (
                            <div
                                className="p-4 my-4 text-sm text-green-800 rounded-lg bg-green-100 "
                                role="alert"
                            >
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
                        {data_payment.length > 0 ? (
                            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                                <div className="mx-auto w-full flex-none rounded-xl lg:max-w-2xl xl:max-w-4xl">
                                    <div className="space-y-6">
                                        {data_payment.map((payment, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg border-2 border-gray-300 bg-white p-4 shadow-sm md:p-6"
                                            >
                                                <h3 className="text-xl font-bold">
                                                    Toko {payment.store.nama}
                                                </h3>
                                                <hr className="my-3 border-2 border-gray-300" />

                                                {data_order
                                                    .filter(
                                                        (item) =>
                                                            item.store_id ===
                                                            payment.store.id
                                                    )
                                                    .map(
                                                        (order, orderIndex) => (
                                                            <div
                                                                key={orderIndex}
                                                                className="space-y-4 my-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"
                                                            >
                                                                <a
                                                                    href={`/shop/product-detail/${order.product.id}`}
                                                                    className="shrink-0 md:order-1"
                                                                >
                                                                    <img
                                                                        className="h-24 w-24 rounded-full"
                                                                        src={`/img/product/${order.product.foto}`}
                                                                        alt="product image"
                                                                    />
                                                                </a>

                                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                                    <div className="flex items-center me-8">
                                                                        <p className="text-base">
                                                                            {
                                                                                order.qty
                                                                            }{" "}
                                                                            Jumlah
                                                                            Beli
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-end md:order-4 md:w-32">
                                                                        <p className="text-base">
                                                                            {formatRupiah(
                                                                                order
                                                                                    .product
                                                                                    .harga
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="w-full min-w-0 flex-1 md:order-2 md:max-w-md">
                                                                    <a
                                                                        href={`/shop/product-detail/${order.product.id}`}
                                                                        className="text-lg font-bold text-gray-900 hover:underline"
                                                                    >
                                                                        {
                                                                            order
                                                                                .product
                                                                                .nama
                                                                        }
                                                                    </a>
                                                                    <p className="text-sm font-bold text-gray-600">
                                                                        Total
                                                                        Harga{" "}
                                                                        {formatRupiah(
                                                                            order
                                                                                .product
                                                                                .harga *
                                                                                order.qty
                                                                        )}
                                                                    </p>
                                                                    <p className="text-sm font-bold text-gray-600">
                                                                        Ongkir{" "}
                                                                        {formatRupiah(
                                                                            order.ongkir
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}

                                                <hr className="my-3 border border-gray-300" />

                                                <div className="grid grid-cols-1 md:grid-cols-2">
                                                    <div>
                                                        <div className="my-4">
                                                            <h3 className="text-base font-semibold mb-1">
                                                                Media Pembayaran
                                                            </h3>

                                                            <h3>
                                                                {
                                                                    payment
                                                                        .store
                                                                        .pembayaran
                                                                }
                                                            </h3>
                                                            <hr className="my-2 border border-gray-200 px-3" />
                                                            <h3 className="text-base font-semibold my-1">
                                                                No Pembayaran
                                                            </h3>

                                                            <h3>
                                                                {
                                                                    payment
                                                                        .store
                                                                        .qris
                                                                }
                                                            </h3>
                                                            <hr className="my-2 border border-gray-200 px-3" />
                                                        </div>

                                                        <div className="my-4">
                                                            <h3 className="text-base font-semibold mb-1">
                                                                Qris Pembayaran
                                                            </h3>
                                                            <div className="border rounded-lg p-3 w-56 md:w-52">
                                                                <div className="flex flex-col items-center">
                                                                    <QRCodeCanvas
                                                                        id="qr-code"
                                                                        value={
                                                                            payment
                                                                                .store
                                                                                .qris
                                                                        }
                                                                        size={
                                                                            150
                                                                        }
                                                                        fgColor="#000000"
                                                                        bgColor="#ffffff"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleDownload(
                                                                                payment
                                                                            )
                                                                        }
                                                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                                                    >
                                                                        Simpan
                                                                        QR Code
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr className="block md:hidden my-2 border border-gray-200" />
                                                    <div>
                                                        <div className="my-4">
                                                            <h3 className="text-base font-semibold mb-1">
                                                                Total Pembayaran
                                                            </h3>
                                                            <h3 className="font-bold">
                                                                {formatRupiah(
                                                                    data_order
                                                                        .filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.store_id ===
                                                                                payment
                                                                                    .store
                                                                                    .id
                                                                        )
                                                                        .reduce(
                                                                            (
                                                                                total,
                                                                                order
                                                                            ) =>
                                                                                total +
                                                                                order
                                                                                    .product
                                                                                    .harga *
                                                                                    order.qty +
                                                                                order.ongkir,
                                                                            0
                                                                        )
                                                                )}{" "}
                                                            </h3>
                                                        </div>
                                                        <hr className="my-2 border border-gray-200" />
                                                        <div className="my-4">
                                                            <h3 className="text-base font-semibold">
                                                                Keterangan
                                                                Pembayaran
                                                            </h3>
                                                            <h3
                                                                className={`font-bold ${
                                                                    payment.status ===
                                                                    "1"
                                                                        ? "text-yellow-600"
                                                                        : payment.status ===
                                                                          "2"
                                                                        ? "text-teal-600"
                                                                        : "text-red-600"
                                                                }`}
                                                            >
                                                                {payment.status ===
                                                                "1"
                                                                    ? "Belum dibayar"
                                                                    : payment.status ===
                                                                      "2"
                                                                    ? "Sudah dibayar"
                                                                    : "Batal"}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr className="my-3 border border-gray-300" />
                                                <form onSubmit={handleSubmit}>
                                                    <label
                                                        htmlFor="website-admin"
                                                        className="block mb-2 text-sm font-medium text-gray-900"
                                                    >
                                                        Upload Bukti pembayaran
                                                    </label>
                                                    <input
                                                        type="file"
                                                        name="bukti_pembayaran"
                                                        onChange={(e) =>
                                                            handleFileChange(
                                                                e,
                                                                payment.id,
                                                                index
                                                            )
                                                        }
                                                        className="file-input file-input-bordered w-full max-w-full"
                                                        required
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn btn-active btn-accent mt-3 text-white"
                                                    >
                                                        Submit
                                                    </button>
                                                    {fotoPreviews[index] && (
                                                        <div className="my-4">
                                                            <label
                                                                htmlFor={`file-preview-${index}`}
                                                                className="block mb-2 text-sm font-medium text-gray-900"
                                                            >
                                                                Preview Foto
                                                                Pembayaran Anda
                                                            </label>
                                                            <img
                                                                id={`file-preview-${index}`}
                                                                src={
                                                                    fotoPreviews[
                                                                        index
                                                                    ]
                                                                }
                                                                className="w-[200px] h-[200px] rounded-lg shadow-lg"
                                                                alt={`Preview Foto ${index}`}
                                                            />
                                                        </div>
                                                    )}
                                                    {payment.bukti_pembayaran && (
                                                        <div className="my-4">
                                                            <label
                                                                htmlFor="website-admin"
                                                                className="block mb-2 text-sm font-medium text-gray-900"
                                                            >
                                                                Bukti Pembayaran
                                                                Sebelumnya
                                                            </label>
                                                            <img
                                                                src={`/img/payment/${payment.bukti_pembayaran}`}
                                                                className="w-[200px] h-[200px] rounded-lg shadow-lg"
                                                                alt="Foto Brand"
                                                            />
                                                            <a
                                                                href={`/img/payment/${payment.bukti_pembayaran}`}
                                                                target="_blank"
                                                                className="btn btn-active btn-info mt-3 text-white"
                                                            >
                                                                View Foto
                                                            </a>
                                                        </div>
                                                    )}
                                                </form>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mx-auto mt-6 max-w-4xl rounded-xl border-2 flex-1 space-y-6 lg:mt-0 lg:w-full">
                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                                        <p className="text-xl font-semibold text-gray-900">
                                            Alamat pengiriman anda
                                        </p>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <dl className="block mb-5">
                                                    <dt className="text-base font-normal text-gray-500">
                                                        Detail Alamat
                                                    </dt>
                                                    <hr className="my-3 border border-gray-300" />
                                                    <dd className="text-base font-medium text-gray-900">
                                                        {order.alamat}
                                                    </dd>
                                                </dl>
                                                {data_payment.map(
                                                    (item, index) => (
                                                        <dl
                                                            className="block mb-5"
                                                            key={index + 1}
                                                        >
                                                            <dt className="text-base font-normal text-gray-500">
                                                                Koordinat Alamat{" "}
                                                                {
                                                                    item.store
                                                                        .nama
                                                                }
                                                            </dt>
                                                            <hr className="my-3 border border-gray-300" />
                                                            <dd className="text-base font-medium text-gray-900">
                                                                {order &&
                                                                order.let &&
                                                                order.long ? (
                                                                    <>
                                                                        <MapContainer
                                                                            className="w-full h-96 z-0"
                                                                            center={[
                                                                                order.let,
                                                                                order.long,
                                                                            ]}
                                                                            zoom={
                                                                                15
                                                                            }
                                                                            scrollWheelZoom={
                                                                                false
                                                                            }
                                                                        >
                                                                            <TileLayer
                                                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                                                attribution="&copy; OpenStreetMap contributors"
                                                                            />
                                                                            <AdjustZoom
                                                                                bounds={[
                                                                                    [
                                                                                        order.let,
                                                                                        order.long,
                                                                                    ],
                                                                                    [
                                                                                        item
                                                                                            .store
                                                                                            .let,
                                                                                        item
                                                                                            .store
                                                                                            .long,
                                                                                    ],
                                                                                ]}
                                                                            />
                                                                            {/* Marker Awal */}
                                                                            <Marker
                                                                                position={[
                                                                                    order.let,
                                                                                    order.long,
                                                                                ]}
                                                                                color="red"
                                                                            >
                                                                                <Popup>
                                                                                    Pelanggan
                                                                                </Popup>
                                                                            </Marker>
                                                                            {/* Marker Tujuan */}
                                                                            <Marker
                                                                                position={[
                                                                                    item
                                                                                        .store
                                                                                        .let,
                                                                                    item
                                                                                        .store
                                                                                        .long,
                                                                                ]}
                                                                                color="green"
                                                                            >
                                                                                <Popup>
                                                                                    Toko
                                                                                </Popup>
                                                                            </Marker>
                                                                            {/* Polyline untuk rute */}
                                                                            <Polyline
                                                                                positions={
                                                                                    route.length >
                                                                                    0
                                                                                        ? route
                                                                                        : [
                                                                                              [
                                                                                                  order.let,
                                                                                                  order.long,
                                                                                              ],
                                                                                              [
                                                                                                  item
                                                                                                      .store
                                                                                                      .let,
                                                                                                  item
                                                                                                      .store
                                                                                                      .long,
                                                                                              ],
                                                                                          ]
                                                                                }
                                                                                color="blue"
                                                                            />
                                                                        </MapContainer>
                                                                        <div className="text-base border p-3 rounded-lg font-normal">
                                                                            <p className="text-base font-normal">
                                                                                Jarak:{" "}
                                                                                {item.distance
                                                                                    ? item.distance.toFixed(
                                                                                          2
                                                                                      )
                                                                                    : "Loading..."}{" "}
                                                                                km
                                                                            </p>
                                                                            <p className="text-base font-normal">
                                                                                Ongkos
                                                                                Kirim:{" "}
                                                                                {calculateShippingCost(
                                                                                    item.distance
                                                                                )
                                                                                    ? formatRupiah(
                                                                                          calculateShippingCost(
                                                                                              item.distance
                                                                                          )
                                                                                      )
                                                                                    : "Gratis Ongkir"}
                                                                            </p>
                                                                            {/* <p className="text-base font-semibold">
                                                                                Alternatif
                                                                                Pengiriman
                                                                                Paket:{" "}
                                                                                {item.distance >=
                                                                                2
                                                                                    ? "Motor"
                                                                                    : "Drone"}
                                                                            </p> */}
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <p>
                                                                        Loading
                                                                        map...
                                                                    </p>
                                                                )}
                                                            </dd>
                                                        </dl>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-6 sm:mt-8 p-2 mx-auto w-full rounded-xl border-2 lg:max-w-2xl xl:max-w-4xl">
                                <h1 className="text-center">
                                    Belum ada proses pembayaran
                                </h1>
                            </div>
                        )}
                    </div>
                </section>
            </ShopLayout>
        </>
    );
};

export default Payment;
