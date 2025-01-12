import InputError from "@/Components/InputError";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

export default function SignIn({ status }) {
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post("/signin", {
            onSuccess: () => {
                reset();
                console.log("Sukses");
            },
            onError: (errors) => {
                console.error("Terjadi error:", errors);
            },
        });
    };

    return (
        <ShopLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div className="bg-gray-100 flex items-center justify-center px-2 py-10 md:py-28">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Sign In to EasyCacth
                    </h2>
                    <form className="max-w-sm mx-auto" onSubmit={submit}>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@example.com"
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex items-start mb-5 text-sm md:text-base">
                            <p>
                                Belum Punya Akun ?
                                <a
                                    href="/signup"
                                    className="mx-1 underline text-blue-600"
                                >
                                    Sign Up
                                </a>
                                Sekarang
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-hijau1 hover:bg-hijau3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </ShopLayout>
    );
}
