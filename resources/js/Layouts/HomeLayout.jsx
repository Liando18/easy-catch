import Footer from "@/Components/Home/Footer";
import NavBar from "@/Components/Home/NavBar";

const HomeLayout = ({ children }) => {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default HomeLayout;
