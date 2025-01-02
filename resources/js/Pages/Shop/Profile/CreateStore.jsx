import UserLayout from "@/Layouts/UserLayout";
import { useForm, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";

const CreateStore = () => {
    const { auth, title } = usePage().props;
    const props = usePage().props;
    const { data, setData, post, reset } = useForm({
        merchant_id: auth.user.data.id,
        account_id: auth.user.id,
        nama: "",
        deskripsi: "",
        qris: "",
        foto: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data sebelum dikirim:", data);

        const formData = new FormData();
        formData.append("merchant_id", data.merchant_id);
        formData.append("nama", data.nama);
        formData.append("deskripsi", data.deskripsi);
        formData.append("qris", data.qris);
        if (data.foto) formData.append("foto", data.foto);

        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        post(`/shop/buat-toko/${data.id}`, {
            data: formData,
            onSuccess: () => {
                reset();
                Swal.fire({
                    title: "Toko Anda Berhasil Dibuat",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.href = `/shop/profile`;
                });
            },
            onError: (error) => {
                Swal.fire({
                    title: "Gagal Membuat Toko",
                    text: "Terjadi kesalahan saat membuat toko.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                console.error("Error:", error);
            },
        });
    };

    return (
        <>
            <UserLayout>
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
                            Nama Toko Anda
                        </label>
                        <input
                            type="text"
                            name="nama"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                            placeholder="Masukan nama toko anda"
                            className="input input-bordered w-full max-w-full"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Tulis Deskripsi Toko Anda
                        </label>
                        <ReactQuill
                            value={data.deskripsi}
                            onChange={(value) => setData("deskripsi", value)}
                            theme="snow"
                            style={{ height: "200px", marginBottom: "80px" }}
                            placeholder="Masukkan deskripsi di sini..."
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Nomor Rekening atau via pembayaran Toko Anda
                        </label>
                        <input
                            type="number"
                            name="qris"
                            value={data.qris}
                            onChange={(e) => setData("qris", e.target.value)}
                            placeholder="Masukan nomor pembayaran toko anda"
                            className="input input-bordered w-full max-w-full"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="website-admin"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Upload Foto Brand Toko Anda
                        </label>
                        <input
                            type="file"
                            name="foto"
                            onChange={(e) => setData("foto", e.target.files[0])}
                            className="file-input file-input-bordered file-input-accent w-full max-w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-hijau1 hover:bg-hijau3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
                    >
                        Buat Toko
                    </button>
                </form>
            </UserLayout>
        </>
    );
};

export default CreateStore;
