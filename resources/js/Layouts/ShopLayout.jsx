import Footer from "@/Components/Home/Footer";
import NavBar from "@/Components/Shop/NavBar";

const ShopLayout = ({ children }) => {
    return (
        <>
            <div className="bg-gray-200 min-h-screen">
                <NavBar />
                {children}
                <Footer />
            </div>
        </>
    );
};

export default ShopLayout;
