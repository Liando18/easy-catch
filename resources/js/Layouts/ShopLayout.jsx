import Footer from "@/Components/Home/Footer";
import NavBar from "@/Components/Shop/NavBar";
import { Head } from "@inertiajs/react";

const ShopLayout = ({ children }) => {
    return (
        <>
            <Head
                title="Shop"
                meta={[
                    {
                        name: "description",
                        content:
                            "EasyCatch adalah platform marketplace inovatif yang menghubungkan penjual dan pembeli dari berbagai sektor untuk menciptakan pengalaman berbelanja online yang praktis dan menyenangkan. Sebagai salah satu marketplace terdepan, EasyCatch menyediakan berbagai kategori produk mulai dari elektronik, fashion, kebutuhan rumah tangga, hingga produk kecantikan dan kesehatan. Kami berfokus pada kualitas, dengan menawarkan produk-produk pilihan dari berbagai penjual terpercaya yang telah melalui proses seleksi ketat.",
                    },
                    {
                        name: "keywords",
                        content:
                            "shop, belanja, easy catch, EasyCath, Easy Catch, drone, jasa pengiriman, jasa, pengiriman",
                    },
                    { property: "og:title", content: "Shop - EasyCatch" },
                    {
                        property: "og:description",
                        content:
                            "EasyCatch adalah platform marketplace inovatif yang menghubungkan penjual dan pembeli dari berbagai sektor untuk menciptakan pengalaman berbelanja online yang praktis dan menyenangkan. Sebagai salah satu marketplace terdepan, EasyCatch menyediakan berbagai kategori produk mulai dari elektronik, fashion, kebutuhan rumah tangga, hingga produk kecantikan dan kesehatan. Kami berfokus pada kualitas, dengan menawarkan produk-produk pilihan dari berbagai penjual terpercaya yang telah melalui proses seleksi ketat.",
                    },
                    { property: "og:type", content: "website" },
                ]}
            />
            <div className="bg-gray-200 min-h-screen">
                <NavBar />
                {children}
                <Footer />
            </div>
        </>
    );
};

export default ShopLayout;
