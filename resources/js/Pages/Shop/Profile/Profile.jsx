import UserLayout from "@/Layouts/UserLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

const ProfileUser = () => {
    const { auth, title } = usePage().props;
    const props = usePage().props;
    const { data, setData, put, post, reset } = useForm({
        id: auth.user.data.id,
        account_id: auth.user.data.account_id,
        email: auth.user.data.email,
        password: "",
        nama: auth.user.data.nama,
        jk: auth.user.data.jk,
        handphone: auth.user.data.handphone,
        alamat: auth.user.data.alamat,
        foto: null,
        status: auth.user.data.status,
    });

    useEffect(() => {
        if (auth) {
            setData({
                id: auth.user.data.id,
                account_id: auth.user.data.account_id,
                email: auth.user.email,
                password: "",
                nama: auth.user.data.nama,
                jk: auth.user.data.jk,
                handphone: auth.user.data.handphone,
                alamat: auth.user.data.alamat,
                foto: null,
                status: auth.user.data.status,
            });
        }
    }, [auth, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data sebelum dikirim:", data);

        const formData = new FormData();
        formData.append("email", data.email);
        if (data.password) formData.append("password", data.password);
        formData.append("account_id", data.account_id);
        formData.append("nama", data.nama);
        formData.append("jk", data.jk);
        formData.append("handphone", data.handphone);
        formData.append("alamat", data.alamat);
        if (data.foto) formData.append("foto", data.foto);

        // Debug: log FormData
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        post(`/shop/profile/${data.id}`, formData, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <UserLayout>
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
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <form className="mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Nama
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                name="nama"
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Aprilian Gevindo"
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Jenis Kelamin
                        </label>
                        <div className="flex">
                            <select
                                id="countries"
                                value={data.jk}
                                onChange={(e) => setData("jk", e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Pilih</option>
                                <option value="1">Lak-laki</option>
                                <option value="2">Perempuan</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Alamat
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            value={data.alamat}
                            onChange={(e) => setData("alamat", e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Jl 999, XXXXX"
                        ></textarea>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Nomor Handphone
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                            </span>
                            <input
                                type="number"
                                name="handphone"
                                value={data.handphone}
                                onChange={(e) =>
                                    setData("handphone", e.target.value)
                                }
                                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="089999999"
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Email
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Password
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                            </span>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Isikan jika ingin mengangikan password anda, dan kosongkan jika tidak ingin"
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Upload Foto (Upload jika ingin update foto profile
                            anda, jika tidak tidak usah)
                        </label>
                        <input
                            type="file"
                            name="foto"
                            onChange={(e) => setData("foto", e.target.files[0])}
                            className="file-input file-input-bordered file-input-accent w-full max-w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-hijau1 hover:bg-hijau3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
                    >
                        Update Data
                    </button>
                </form>
            </UserLayout>
        </>
    );
};

export default ProfileUser;
