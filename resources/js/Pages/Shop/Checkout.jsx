import ShopLayout from "@/Layouts/ShopLayout";
import { formatRupiah } from "@/Utils/format";
import { useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";

const Checkout = () => {
    const { title, carts, data_cart, orders, data_order } = usePage().props;
    const props = usePage().props;

    const [err, setErr] = useState("");

    const totalJumlah = data_cart.reduce((acc, item) => acc + item.qty, 0);
    const totalHarga = data_cart.reduce(
        (acc, item) => acc + item.product.harga,
        0
    );

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const { data, setData, get, post, reset } = useForm({
        alamat: "",
        province: "",
        city: "",
        district: "",
        village: "",
        lat: 0,
        long: 0,
        nama: "",
    });

    // Fetch daftar provinsi saat komponen pertama kali dimuat
    useEffect(() => {
        axios
            .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
            .then((response) => {
                setProvinces(response.data.provinsi);
            })
            .catch((error) =>
                console.error("Error fetching provinces:", error)
            );
    }, []);

    // Fetch daftar kota/kabupaten berdasarkan provinsi yang dipilih
    useEffect(() => {
        if (data.province) {
            let provinsi = data.province;
            let splitProvinsi = provinsi.split("||");
            axios
                .get(
                    `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${splitProvinsi[0]}`
                )
                .then((response) => {
                    setCities(response.data.kota_kabupaten);
                })
                .catch((error) =>
                    console.error("Error fetching cities:", error)
                );
        } else {
            setCities([]);
            setDistricts([]);
            setVillages([]);
        }
    }, [data.province]);

    // Fetch daftar kecamatan berdasarkan kota/kabupaten yang dipilih
    useEffect(() => {
        if (data.city) {
            let kabupaten = data.city;
            let splitKabupaten = kabupaten.split("||");
            axios
                .get(
                    `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${splitKabupaten[0]}`
                )
                .then((response) => {
                    setDistricts(response.data.kecamatan);
                })
                .catch((error) =>
                    console.error("Error fetching districts:", error)
                );
        } else {
            setDistricts([]);
            setVillages([]);
        }
    }, [data.city]);

    // Fetch daftar desa/kelurahan berdasarkan kecamatan yang dipilih
    useEffect(() => {
        if (data.district) {
            let kecamatan = data.district;
            let splitKecamatan = kecamatan.split("||");
            axios
                .get(
                    `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${splitKecamatan[0]}`
                )
                .then((response) => {
                    setVillages(response.data.kelurahan);
                })
                .catch((error) =>
                    console.error("Error fetching villages:", error)
                );
        } else {
            setVillages([]);
        }
    }, [data.district]);

    useEffect(() => {
        if (data.village && data.district && data.city && data.province) {
            setData(
                "alamat",
                data.village.split("||")[1] +
                    ", Kecamatan " +
                    data.district.split("||")[1] +
                    ", " +
                    data.city.split("||")[1] +
                    ", Provinsi " +
                    data.province.split("||")[1] +
                    " (Nama penerima : " +
                    data.nama +
                    ")"
            );
        }
    }, [data.village, data.district, data.city, data.province, data.nama]);

    useEffect(() => {
        if (orders) {
            console.log("Orders updated:", orders);
        } else {
            console.log("No orders available");
        }
    }, [orders]);

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setData("lat", lat);
                setData("long", lng);
                // console.log("Latitude:", lat, "Longitude:", lng);
            },
        });
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(`/shop/checkout/order`, {
            onSuccess: () => {
                console.log(data);
            },
            onError: (err) => {
                console.log("Terjadi kesalahan : ", err);
            },
        });
    };

    const handlePembayaran = () => {
        if (orders == null) {
            setErr("Mohon isikan alamat anda terlebih dahulu");
        } else {
            window.location.href = "/shop/payment/" + orders.order_id;
        }
    };

    return (
        <ShopLayout>
            <section className="mx-5 md:mx-10 px-4 md:px-8 bg-white border rounded-lg my-8 py-4 antialiased md:py-8">
                <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 sm:text-base">
                    <li className="after:border-1 flex items-center text-hijau1 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/']  sm:after:hidden">
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

                    <li className="after:border-1 flex items-center text-hijau1 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/']  sm:after:hidden">
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

                    <li className="flex shrink-0 items-center">
                        <svg
                            className="me-2 h-4 w-4 sm sm:w-5"
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

                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 ">
                                {title}
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                            >
                                <div className="sm:col-span-2">
                                    <fieldset className="border-2 border-gray-300 p-4 rounded-lg">
                                        <legend className="text-base font-semibold text-gray-800 px-2">
                                            Alamat
                                        </legend>

                                        {/* Provinsi */}
                                        <div>
                                            <label
                                                htmlFor="select-province-input"
                                                className="block text-sm font-medium text-gray-900 "
                                            >
                                                Provinsi
                                            </label>
                                            <select
                                                id="select-province-input"
                                                name="province"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                                value={data.province}
                                                onChange={(e) =>
                                                    setData(
                                                        "province",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Pilih Provinsi
                                                </option>
                                                {provinces.map((province) => (
                                                    <option
                                                        key={province.id}
                                                        value={`${province.id}||${province.nama}`}
                                                    >
                                                        {province.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Kota/Kabupaten */}
                                        <div className="mt-4">
                                            <label
                                                htmlFor="select-city-input"
                                                className="block text-sm font-medium text-gray-900 "
                                            >
                                                Kota/Kabupaten
                                            </label>
                                            <select
                                                id="select-city-input"
                                                name="city"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                                value={data.city}
                                                onChange={(e) =>
                                                    setData(
                                                        "city",
                                                        e.target.value
                                                    )
                                                }
                                                disabled={!data.province}
                                            >
                                                <option value="">
                                                    Pilih Kota/Kabupaten
                                                </option>
                                                {cities.map((city) => (
                                                    <option
                                                        key={city.id}
                                                        value={`${city.id}||${city.nama}`}
                                                    >
                                                        {city.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Kecamatan */}
                                        <div className="mt-4">
                                            <label
                                                htmlFor="select-district-input"
                                                className="block text-sm font-medium text-gray-900 "
                                            >
                                                Kecamatan
                                            </label>
                                            <select
                                                id="select-district-input"
                                                name="district"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                                value={data.district}
                                                onChange={(e) =>
                                                    setData(
                                                        "district",
                                                        e.target.value
                                                    )
                                                }
                                                disabled={!data.city}
                                            >
                                                <option value="">
                                                    Pilih Kecamatan
                                                </option>
                                                {districts.map((district) => (
                                                    <option
                                                        key={district.id}
                                                        value={`${district.id}||${district.nama}`}
                                                    >
                                                        {district.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Desa */}
                                        <div className="mt-4">
                                            <label
                                                htmlFor="select-village"
                                                className="block text-sm font-medium text-gray-900 "
                                            >
                                                Desa/Kelurahan*
                                            </label>
                                            <select
                                                id="select-village"
                                                name="village"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                                value={data.village}
                                                onChange={(e) =>
                                                    setData(
                                                        "village",
                                                        e.target.value
                                                    )
                                                }
                                                disabled={!data.district}
                                            >
                                                <option value="">
                                                    Pilih Desa/Kelurahan
                                                </option>
                                                {villages.map((village) => (
                                                    <option
                                                        key={village.id}
                                                        value={`${village.id}||${village.nama}`}
                                                    >
                                                        {village.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Map and Coordinates */}
                                        <div className="mt-4">
                                            <label
                                                htmlFor="map"
                                                className="block text-sm font-medium text-gray-900 mb-3"
                                            >
                                                Koordinator Alamat (Klik untuk
                                                memastikan alamat tujuan anda)
                                            </label>
                                            <MapContainer
                                                center={[
                                                    -1.347515294868882,
                                                    100.57450092175624,
                                                ]}
                                                zoom={15}
                                                scrollWheelZoom={false}
                                                className="w-full h-96 z-0"
                                            >
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <MapClickHandler />
                                                {data.lat && data.long && (
                                                    <Marker
                                                        position={[
                                                            data.lat,
                                                            data.long,
                                                        ]}
                                                    />
                                                )}
                                            </MapContainer>
                                        </div>

                                        {/* Nama Penerima */}
                                        <div className="mt-4">
                                            <label
                                                htmlFor="select-village"
                                                className="block text-sm font-medium text-gray-900 "
                                            >
                                                Nama Penerima
                                            </label>
                                            <input
                                                type="text"
                                                value={data.nama}
                                                onChange={(e) =>
                                                    setData(
                                                        "nama",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Masukan nama penerima"
                                                className="input input-bordered w-full max-w-full"
                                                required
                                            />
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center gap-2 rounded-full border border-teal-200 bg-teal-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-600 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-teal-100"
                                    >
                                        Submit Alamat
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                        <h2 className="text-xl font-semibold text-gray-900 ">
                            Detail Pembayaran
                        </h2>
                        <fieldset className="border-2 border-gray-300 p-4 rounded-lg">
                            <legend className="text-base font-semibold text-gray-800 px-2">
                                Total Pembayaran
                            </legend>
                            <div className="space-y-4 border-gray-200 bg-white p-4 shadow-sm">
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
                                </div>
                            </div>
                        </fieldset>
                        <button
                            type="button"
                            onClick={handlePembayaran}
                            className="bg-teal-500 flex gap-2 justify-center items-center text-white px-6 py-2 rounded-full w-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                            </svg>
                            Lanjutkan untuk Pembayaran
                        </button>

                        {err && (
                            <div
                                role="alert"
                                className="alert alert-info mt-3 transition duration-300"
                            >
                                <i className="fa-solid fa-circle-info h-4 w-3 text-white"></i>
                                <span className="text-white">{err}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </ShopLayout>
    );
};

export default Checkout;
