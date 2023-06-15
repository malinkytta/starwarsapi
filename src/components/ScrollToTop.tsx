import { useEffect } from "react";
import { useLocation } from 'react-router-dom';


const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        setTimeout(() => { window.scrollTo(0, 0) }, 100)
    }, [pathname])

    return null
};

export default ScrollToTop
