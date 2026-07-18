import {useLocation} from "react-router-dom";
import Header from "./Header/Header";

export default function Layout ({children}){
    const location = useLocation();
    const isHome = location.pathname === "/";
    return (
        <div className="layout">
            <Header />
            {children}
        </div>
    )
};