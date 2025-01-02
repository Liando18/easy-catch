import HomeLayout from "@/Layouts/HomeLayout";

const Home = () => {
    return (
        <>
            <HomeLayout>
                <section className="flex items-center justify-center h-screen w-full bg-center bg-no-repeat bg-cover bg-[url('/img/bg-market.jpg')] bg-gray-800 bg-blend-multiply">
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 ">
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            Selamat Datang di Easy Catch
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

                <section className="py-10 px-10 md:px-16 bg-slate-100">
                    <div className="card lg:card-side bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="text-3xl font-bold text-center mb-3">
                                Tentang Kami
                            </h2>
                            <div className="text-justify">
                                <p>
                                    EasyCatch adalah platform marketplace
                                    inovatif yang menghubungkan penjual dan
                                    pembeli dari berbagai sektor untuk
                                    menciptakan pengalaman berbelanja online
                                    yang praktis dan menyenangkan. Sebagai salah
                                    satu marketplace terdepan, EasyCatch
                                    menyediakan berbagai kategori produk mulai
                                    dari elektronik, fashion, kebutuhan rumah
                                    tangga, hingga produk kecantikan dan
                                    kesehatan. Kami berfokus pada kualitas,
                                    dengan menawarkan produk-produk pilihan dari
                                    berbagai penjual terpercaya yang telah
                                    melalui proses seleksi ketat.
                                </p>
                                <br />
                                <p>
                                    Di EasyCatch, kami tidak hanya menyediakan
                                    kemudahan dalam berbelanja, tetapi juga
                                    memberikan kenyamanan dalam setiap langkah
                                    transaksi. Pengguna dapat menikmati sistem
                                    pembayaran yang aman dan beragam pilihan
                                    metode pembayaran, mulai dari transfer bank
                                    hingga pembayaran melalui dompet digital.
                                    Selain itu, kami menawarkan layanan
                                    pengiriman yang cepat dan dapat diandalkan,
                                    sehingga produk yang dibeli dapat sampai ke
                                    tangan pelanggan dengan tepat waktu dan
                                    dalam kondisi terbaik.
                                </p>
                                <br />
                                <p>
                                    EasyCatch tidak hanya sekadar tempat
                                    berbelanja, tetapi juga menjadi komunitas
                                    yang mempertemukan para penjual lokal dan
                                    global dengan pelanggan dari berbagai
                                    penjuru dunia. Kami percaya bahwa
                                    marketplace yang sukses harus mampu
                                    menciptakan hubungan yang saling
                                    menguntungkan antara penjual dan pembeli.
                                    Oleh karena itu, kami terus berusaha
                                    memberikan pengalaman belanja yang
                                    transparan, efisien, dan menyenangkan, serta
                                    mendukung para penjual untuk tumbuh dan
                                    berkembang di platform kami.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </HomeLayout>
        </>
    );
};

export default Home;
