import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const DataCategory = () => {
    const { auth } = usePage().props;
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        errors,
    } = useForm({
        id: "",
        nama: "",
    });

    const props = usePage().props;
    const [selectedRow, setSelectedRow] = useState(null);

    const submit = (e) => {
        e.preventDefault();

        if (data.id) {
            put(`/dashboard/data_category/${data.id}`, {
                onSuccess: () => {
                    reset();
                    document.getElementById("modal-edit").close();
                },
            });
        } else {
            post("/dashboard/data_category", {
                onSuccess: () => {
                    reset();
                    document.getElementById("modal-tambah").close();
                },
            });
        }
    };

    const handleEdit = (row) => {
        setData({
            id: row.id,
            nama: row.nama,
        });
        document.getElementById("modal-edit").showModal();
    };

    const handleDelete = (id) => {
        destroy(`/dashboard/data_category/${id}`, {
            onSuccess: () => {
                document.getElementById("modal-hapus").close();
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
                        <button
                            className="btn btn-success text-white"
                            onClick={() =>
                                document
                                    .getElementById("modal-tambah")
                                    .showModal()
                            }
                        >
                            Tambah Data
                        </button>

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

                        {/* Modal Tambah */}
                        <dialog id="modal-tambah" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                        ✕
                                    </button>
                                </form>
                                <h3 className="font-bold text-lg">
                                    Form Tambah Data
                                </h3>
                                <form className="py-4" onSubmit={submit}>
                                    <div className="mb-5">
                                        <div className="mb-5">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Nama
                                            </label>
                                            <input
                                                type="text"
                                                name="nama"
                                                value={data.nama}
                                                onChange={(e) =>
                                                    setData(
                                                        "nama",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nama Kategori Produk"
                                                className="input input-bordered w-full max-w-full"
                                            />
                                        </div>
                                    </div>
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
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                        ✕
                                    </button>
                                </form>
                                <h3 className="font-bold text-lg">
                                    Form Edit Data
                                </h3>
                                <form className="py-4" onSubmit={submit}>
                                    <div className="mb-5">
                                        <div className="mb-5">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Nama
                                            </label>
                                            <input
                                                type="text"
                                                name="nama"
                                                value={data.nama}
                                                onChange={(e) =>
                                                    setData(
                                                        "nama",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nama Kategori Produk"
                                                className="input input-bordered w-full max-w-full"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-warning text-white"
                                    >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </dialog>

                        {/* Modal Hapus */}
                        <dialog id="modal-hapus" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">
                                    Konfirmasi Hapus
                                </h3>
                                <p>
                                    Apakah Anda yakin ingin menghapus data ini?
                                </p>
                                <div className="modal-action">
                                    <button
                                        className="btn btn-error text-white"
                                        onClick={() =>
                                            handleDelete(selectedRow?.id)
                                        }
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

                        {/* Table */}
                        <div className="overflow-x-auto mt-5">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Kategori</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(props.data_category) &&
                                    props.data_category.length > 0 ? (
                                        props.data_category.map(
                                            (row, index) => (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <td>{row.nama}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning text-white me-2"
                                                            onClick={() =>
                                                                handleEdit(row)
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-error text-white"
                                                            onClick={() => {
                                                                setSelectedRow(
                                                                    row
                                                                );
                                                                document
                                                                    .getElementById(
                                                                        "modal-hapus"
                                                                    )
                                                                    .showModal();
                                                            }}
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center"
                                            >
                                                Data tidak tersedia.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default DataCategory;
