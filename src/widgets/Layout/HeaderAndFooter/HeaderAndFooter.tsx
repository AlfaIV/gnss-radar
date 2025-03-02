import Footer from "~/features/Layout/Footer/Footer";
import Header from "~/features/Layout/Header/Header";
import { HOCProps } from "~/shared/typings/common/common";

const HeaderAndFooter = (props: HOCProps) => {

    const { children } = props;

    return (
        <>
        <Header/>
        {children}
        <Footer />
        </>
    )
}

export default HeaderAndFooter;