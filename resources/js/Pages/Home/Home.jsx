import HomeLayout from "@/Layouts/HomeLayout";

const Home = () => {
    return (
        <>
            <HomeLayout>
                <section className="flex items-center justify-center h-screen w-full bg-center bg-no-repeat bg-cover bg-[url('/img/bg-market.jpg')] bg-gray-800 bg-blend-multiply">
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 ">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            Selamat Datang di{" "}
                            <span className="text-hijau1">Easy Catch</span>
                        </h1>
                        <p className="mb-8 text-base font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            EasyCatch memudahkan belanja online dengan produk
                            berkualitas dan pengiriman cepat.
                        </p>
                        <div className="flex justify-center items-center">
                            <a
                                href="/shop"
                                className="inline-flex justify-center items-center py-3 px-5 me-3 md:me-0 text-base font-medium text-center text-white rounded-full bg-hijau1 hover:bg-hijau3 focus:ring-4 focus:ring-blue-300"
                            >
                                Go to Shop
                                <svg
                                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </a>
                            <a
                                href="/signup"
                                className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-full border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                            >
                                Sign Up
                            </a>
                        </div>
                    </div>
                </section>

                <section
                    id="about"
                    className="py-10 px-4 md:px-16 bg-slate-100"
                >
                    <div className="card lg:card-side bg-base-100 mb-5 md:mb-0 shadow-xl">
                        <div className="card-body">
                            <h2 className="text-3xl font-bold text-center text-hijau1">
                                Tentang Kami
                            </h2>
                            <div className="md:grid md:grid-cols-3 md:gap-10 items-center">
                                {/* Kolom teks lebih besar */}
                                <div className="md:col-span-2 text-justify space-y-4">
                                    <p>
                                        EasyCatch adalah platform marketplace
                                        inovatif yang menghubungkan penjual dan
                                        pembeli dari berbagai sektor untuk
                                        menciptakan pengalaman berbelanja online
                                        yang praktis dan menyenangkan. Sebagai
                                        salah satu marketplace terdepan,
                                        EasyCatch menyediakan berbagai kategori
                                        produk mulai dari elektronik, fashion,
                                        kebutuhan rumah tangga, hingga produk
                                        kecantikan dan kesehatan. Kami berfokus
                                        pada kualitas, dengan menawarkan
                                        produk-produk pilihan dari berbagai
                                        penjual terpercaya yang telah melalui
                                        proses seleksi ketat.
                                    </p>
                                    <p>
                                        EasyCatch tidak hanya sekadar tempat
                                        berbelanja, tetapi juga menjadi
                                        komunitas yang mempertemukan para
                                        penjual lokal dan global dengan
                                        pelanggan dari berbagai penjuru dunia.
                                        Kami percaya bahwa marketplace yang
                                        sukses harus mampu menciptakan hubungan
                                        yang saling menguntungkan antara penjual
                                        dan pembeli. Oleh karena itu, kami terus
                                        berusaha memberikan pengalaman belanja
                                        yang transparan, efisien, dan
                                        menyenangkan, serta mendukung para
                                        penjual untuk tumbuh dan berkembang di
                                        platform kami.
                                    </p>
                                    <a
                                        href="/signup"
                                        className="inline-flex justify-center items-center py-3 px-5 me-3 md:me-0 text-base font-medium text-center text-white rounded-full bg-hijau1 hover:bg-hijau3 focus:ring-4 focus:ring-blue-300"
                                    >
                                        Sign Up Your Account
                                        <i class="fa-solid fa-right-to-bracket w-3.5 h-3.5 ms-2 rtl:rotate-180"></i>
                                    </a>
                                </div>

                                {/* Kolom gambar lebih kecil */}
                                <div className="w-full flex justify-center">
                                    <img
                                        src="/img/about-1.jpg"
                                        alt="About"
                                        className="w-full h-auto max-w-md md:max-w-none md:h-[25rem] object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="service"
                    className="py-6 px-4 md:px-16 bg-slate-100"
                >
                    <div className="container mx-auto text-center bg-base-100 rounded-lg shadow-xl p-5 md:p-7">
                        <h2 className="text-3xl font-bold text-center mb-5 text-hijau1">
                            Pelayanan Kami
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:-mx-3 mt-5">
                            <div className="flex-1 px-3">
                                <div className="p-12 rounded-lg border-2 border-solid border-blue-500 shadow-lg text-blue-600 hover:bg-blue-500 hover:text-white  transition duration-300 mb-8">
                                    <p className="font-bold text-xl">
                                        Inovatif
                                    </p>
                                    <p className="mt-4">
                                        Solusi modern untuk menghubungkan
                                        penjual dan pembeli dengan pengalaman
                                        berbelanja yang praktis.
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 px-3">
                                <div className="p-12 rounded-lg border-2 border-solid border-yellow-500 shadow-lg text-yellow-600 hover:bg-yellow-500 hover:text-white  transition duration-300 mb-8">
                                    <p className="font-semibold text-xl">
                                        Terpercaya
                                    </p>
                                    <p className="mt-4">
                                        Mengutamakan kualitas dengan
                                        produk-produk dari penjual yang telah
                                        diseleksi ketat.
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 px-3">
                                <div className="p-12 rounded-lg border-2 border-solid border-teal-500 shadow-lg text-teal-600 hover:bg-teal-500 hover:text-white  transition duration-300 mb-8">
                                    <p className="font-semibold text-xl">
                                        Komunitas
                                    </p>
                                    <p className="mt-4">
                                        Memberikan ruang bagi penjual lokal
                                        untuk terhubung dengan pelanggan di
                                        seluruh janggkauan toko.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="shop" className="py-10 px-4 md:px-16 bg-slate-100">
                    <div class="relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl">
                        <div class="w-full h-80 lg:w-1/2 lg:h-[35rem]">
                            <img
                                class="h-full w-full object-cover rounded-lg"
                                src="/img/shop.jpg"
                                alt="Winding mountain road"
                            />
                        </div>

                        <div class="max-w-lg bg-white rounded-xl md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
                            <div class="flex flex-col p-12 md:px-16">
                                <h2 class="text-2xl font-medium uppercase text-hijau1 lg:text-4xl">
                                    Marketplace
                                </h2>
                                <p class="mt-4">
                                    Easy Catch tidak hanya menyediakan kemudahan
                                    dalam berbelanja, tetapi juga memberikan
                                    kenyamanan dalam setiap langkah transaksi.
                                    Pengguna dapat menikmati sistem pembayaran
                                    yang aman dan beragam pilihan metode
                                    pembayaran, mulai dari transfer bank hingga
                                    pembayaran melalui dompet digital.
                                </p>

                                <div class="mt-8">
                                    <a
                                        href="/shop"
                                        className="inline-flex justify-center items-center py-3 px-5 me-3 md:me-0 text-base font-medium text-center text-white rounded-full bg-hijau1 hover:bg-hijau3 focus:ring-4 focus:ring-blue-300"
                                    >
                                        Go to Shop
                                        <svg
                                            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="contact"
                    className="py-6 px-4 md:px-16 bg-slate-100"
                >
                    <div className="container mx-auto bg-base-100 rounded-lg shadow-xl p-5 md:p-7">
                        <h2 className="text-3xl font-bold text-center mb-5 text-hijau1">
                            Hubungi Kami
                        </h2>
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Map Section */}
                            <div className="w-full md:w-2/3 rounded-lg overflow-hidden relative">
                                <div className="relative h-[250px] md:h-[400px] w-full">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        className="absolute inset-0"
                                        frameBorder="0"
                                        title="map"
                                        marginHeight="0"
                                        marginWidth="0"
                                        scrolling="no"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.5760755501597!2d100.58559607448335!3d-1.3496726356976532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd34d7b3a050581%3A0x6b017c8cf7d2610!2sSMA%20Negeri%202%20Painan!5e1!3m2!1sid!2sid!4v1735806924132!5m2!1sid!2sid"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="bg-white relative flex flex-wrap py-6 rounded shadow-lg">
                                    <div className="w-full md:w-1/2 px-4">
                                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                                            ADDRESS
                                        </h2>
                                        <p className="mt-1 text-sm">
                                            Jl. Perintis Kemerdekaan, Painan
                                            Timur, Pesisir Selatan, Sumatera
                                            Barat, Indonesia, kode pos 25613
                                        </p>
                                    </div>
                                    <div className="w-full md:w-1/2 px-4 mt-4 md:mt-0">
                                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                                            EMAIL
                                        </h2>
                                        <a
                                            className="text-red-500 leading-relaxed text-sm"
                                            href="mailto:osissmandupa02@gmail.com"
                                        >
                                            osissmandupa02@gmail.com
                                        </a>
                                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                                            PHONE
                                        </h2>
                                        <p className="leading-relaxed text-sm">
                                            (0756) 25617
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Feedback Form */}
                            <div className="w-full md:w-1/3 bg-white rounded-lg p-6 shadow-md">
                                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                                    Feedback
                                </h2>
                                <p className="leading-relaxed mb-5 text-gray-600 text-sm">
                                    Kirimkan pesan pada kami, kami akan merespon
                                    pesan anda.
                                </p>
                                <div className="relative mb-4">
                                    <label
                                        htmlFor="name"
                                        className="leading-7 text-sm text-gray-600"
                                    >
                                        Nama Anda
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                                <div className="relative mb-4">
                                    <label
                                        htmlFor="message"
                                        className="leading-7 text-sm text-gray-600"
                                    >
                                        Pesan Anda
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 h-32 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                    ></textarea>
                                </div>
                                <button className="text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg">
                                    Kirim
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </HomeLayout>
        </>
    );
};

export default Home;
