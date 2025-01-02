import UserLayout from "@/Layouts/UserLayout";
import ReactQuill from "react-quill";
import { formatRupiah } from "@/Utils/format";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const KelolaProdcut = () => {
    const { data_product, data_category, data_store, auth, title } =
        usePage().props;
    const props = usePage().props;
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        id: "",
        merchant_id: auth.user.data.id,
        store_id: data_store.id,
        category_id: "",
        nama: "",
        deskripsi: "",
        harga: "",
        stok: "",
        foto: null,
    });

    const [fotoPreview, setFotoPreview] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("foto", file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFotoPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        document.getElementById("modal-tambah").close();

        console.log("Data sebelum dikirim: ", data);

        const formData = new FormData();

        formData.append("merchant_id", data.merchant_id);
        formData.append("category_id", data.category_id);
        formData.append("store_id", data.store_id);
        formData.append("nama", data.nama);
        formData.append("deskripsi", data.deskripsi);
        formData.append("harga", data.harga);
        formData.append("stok", data.stok);
        if (data.foto) formData.append("foto", data.foto);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }

        if (data.id) {
            post(`/shop/kelola-produk/${data.id}`, {
                data: formData,
                onSuccess: () => {
                    reset();
                    document.getElementById("modal-edit").close();
                },
                onError: (error) => {
                    document.getElementById("modal-edit").close();
                    console.error("Error:", error);
                },
            });
        } else {
            post(`/shop/kelola-produk`, {
                data: formData,
                onSuccess: () => {
                    reset();
                    document.getElementById("modal-tambah").close();
                },
                onError: (error) => {
                    document.getElementById("modal-tambah").close();
                    console.error("Error:", error);
                },
            });
        }
    };

    const handleEdit = (row) => {
        setData({
            id: row.id,
            category_id: row.category_id,
            nama: row.nama,
            deskripsi: row.deskripsi,
            harga: row.harga,
            stok: row.stok,
        });

        document.getElementById("modal-edit").showModal();
    };

    const handleDelete = (id) => {
        destroy(`/shop/kelola-produk/${id}`, {
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
                <button
                    className="btn btn-success text-white"
                    onClick={() =>
                        document.getElementById("modal-tambah").showModal()
                    }
                >
                    Tambah Data
                </button>
                <hr className="my-4 border-t border-gray-400" />
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data_product.length > 0 ? (
                            data_product.map((row, index) => (
                                <div
                                    key={index}
                                    className="card bg-base-100 shadow-xl w-full"
                                >
                                    <figure className="p-4">
                                        <img
                                            src={`/img/product/${row.foto}`}
                                            alt={row.nama}
                                            className="rounded-xl w-full h-[13rem]"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <div className="badge badge-outline">
                                            {row.category.nama}
                                        </div>
                                        <h2 className="card-title">
                                            {row.nama}
                                        </h2>
                                        <div className="flex justify-between items-center">
                                            <h5 className="text-base font-semibold">
                                                {formatRupiah(row.harga)}
                                            </h5>
                                            <div className="badge badge-neutral py-3">
                                                Stok {row.stok}
                                            </div>
                                        </div>
                                        <hr className="my-2 border-t border-gray-400" />
                                        <div className="card-actions flex ">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(row)}
                                                className="btn btn-sm btn-warning text-white"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedData(row);
                                                    document
                                                        .getElementById(
                                                            "modal-hapus"
                                                        )
                                                        .showModal();
                                                }}
                                                className="btn btn-sm btn-error text-white"
                                            >
                                                Hapus
                                            </button>
                                            <a
                                                href={`/shop/product-detail/${row.id}`}
                                                className="btn btn-sm btn-info text-white"
                                            >
                                                View
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>Data produk belum ada</h1>
                        )}
                    </div>
                </div>

                {/* Modal Tambah */}
                <dialog id="modal-tambah" className="modal">
                    <div className="modal-box w-11/12 max-w-full">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">Form Tambah Data</h3>
                        <form className="py-4" onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Nama Produk
                                    </label>
                                    <input
                                        type="text"
                                        name="nama"
                                        value={data.nama}
                                        onChange={(e) =>
                                            setData("nama", e.target.value)
                                        }
                                        placeholder="Nama Produk Anda"
                                        className="input input-bordered w-full max-w-full"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Kategori Produk
                                    </label>
                                    <select
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                        className="select select-bordered w-full max-w-full"
                                    >
                                        <option value="">
                                            {data_category.length > 0
                                                ? "Pilih Kategori Produk Anda"
                                                : "Category Belum Tersedia"}
                                        </option>
                                        {data_category.map((row, index) => (
                                            <option key={index} value={row.id}>
                                                {row.nama}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="website-admin"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Tulis Deskripsi Produk Anda
                                </label>
                                <ReactQuill
                                    onChange={(value) =>
                                        setData("deskripsi", value)
                                    }
                                    theme="snow"
                                    style={{
                                        height: "200px",
                                        marginBottom: "80px",
                                    }}
                                    placeholder="Masukkan deskripsi di sini..."
                                />
                            </div>
                            <div className="mb-5">
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Harga Produk
                                    </label>
                                    <input
                                        type="number"
                                        name="harga"
                                        value={data.harga}
                                        onChange={(e) =>
                                            setData("harga", e.target.value)
                                        }
                                        placeholder="Harga Produk Anda"
                                        className="input input-bordered w-full max-w-full"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Stok Produk
                                    </label>
                                    <input
                                        type="number"
                                        name="stok"
                                        value={data.stok}
                                        onChange={(e) =>
                                            setData("stok", e.target.value)
                                        }
                                        placeholder="Stok Produk Anda"
                                        className="input input-bordered w-full max-w-full"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="website-admin"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Upload jika ingin merubah foto Brand Toko
                                    Anda
                                </label>
                                <input
                                    type="file"
                                    name="foto"
                                    onChange={handleFileChange}
                                    className="file-input file-input-bordered file-input-accent w-full max-w-full"
                                />
                            </div>
                            {fotoPreview && (
                                <div className="mb-5">
                                    <label
                                        htmlFor="website-admin"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Preview Foto Produk Anda
                                    </label>
                                    <img
                                        src={fotoPreview}
                                        className="w-[200px] h-[200px] rounded-full"
                                        alt="Preview Foto"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="btn btn-success text-white"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </dialog>

                {/* Modal Edit */}
                <dialog id="modal-edit" className="modal">
                    <div className="modal-box w-11/12 max-w-full">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">Form Edit Data</h3>
                        <form className="py-4" onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Nama Produk
                                    </label>
                                    <input
                                        type="text"
                                        name="nama"
                                        value={data.nama}
                                        onChange={(e) =>
                                            setData("nama", e.target.value)
                                        }
                                        placeholder="Nama Produk Anda"
                                        className="input input-bordered w-full max-w-full"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Kategori Produk
                                    </label>
                                    <select
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                        className="select select-bordered w-full max-w-full"
                                    >
                                        <option value="">
                                            {data_category.length > 0
                                                ? "Pilih Kategori Produk Anda"
                                                : "Category Belum Tersedia"}
                                        </option>
                                        {data_category.map((row, index) => (
                                            <option key={index} value={row.id}>
                                                {row.nama}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="website-admin"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Tulis Deskripsi Produk Anda
                                </label>
                                <ReactQuill
                                    value={data.deskripsi}
                                    onChange={(value) =>
                                        setData("deskripsi", value)
                                    }
                                    theme="snow"
                                    style={{
                                        height: "200px",
                                        marginBottom: "80px",
                                    }}
                                    placeholder="Masukkan deskripsi di sini..."
                                />
                            </div>
                            <div className="mb-5">
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Harga Produk
                                    </label>
                                    <input
                                        type="number"
                                        name="harga"
                                        value={data.harga}
                                        onChange={(e) =>
                                            setData("harga", e.target.value)
                                        }
                                        placeholder="Harga Produk Anda"
                                        className="input input-bordered w-full max-w-full"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Stok Produk
                                    </label>
                                    <input
                                        type="number"
                                        name="stok"
                                        value={data.stok}
                                        onChange={(e) =>
                                            setData("stok", e.target.value)
                                        }
                                        placeholder="Stok Produk Anda"
                                        className="input input-bordered w-full max-w-full"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="website-admin"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Upload jika ingin merubah foto Brand Toko
                                    Anda
                                </label>
                                <input
                                    type="file"
                                    name="foto"
                                    onChange={handleFileChange}
                                    className="file-input file-input-bordered file-input-accent w-full max-w-full"
                                />
                            </div>
                            {fotoPreview && (
                                <div className="mb-5">
                                    <label
                                        htmlFor="website-admin"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Preview Foto Produk Anda
                                    </label>
                                    <img
                                        src={fotoPreview}
                                        className="w-[200px] h-[200px] rounded-full"
                                        alt="Preview Foto"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="btn btn-success text-white"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </dialog>

                {/* Modal Hapus */}
                <dialog id="modal-hapus" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Konfirmasi Hapus</h3>
                        <p>Apakah Anda yakin ingin menghapus data ini?</p>
                        <div className="modal-action">
                            <button
                                className="btn btn-error text-white"
                                onClick={() => handleDelete(selectedData?.id)}
                            >
                                Hapus
                            </button>
                            <button
                                className="btn"
                                onClick={() =>
                                    document
                                        .getElementById("modal-hapus")
                                        .close()
                                }
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </dialog>
            </UserLayout>
        </>
    );
};

export default KelolaProdcut;
