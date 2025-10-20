import { useLocation } from "react-router-dom";
import CategorySearch from "../components/CategorySearch";
import ItemSearch from "./ItemSearch";
import Logo from "./Logo";
export default function Header({categorySearch, setCategorySearch, itemSearch, setItemSearch}){

    const { pathname } = useLocation();
    const isHomePage = pathname === "/";
    const isCategoryPage = pathname.startsWith("/categories/");
    return (
        <header className="flex flex-col gap-7 md:flex-row justify-between">
            <Logo />
            { isHomePage && <CategorySearch searchInput={categorySearch} setSearchInput={setCategorySearch}/> }
            { isCategoryPage && <ItemSearch searchInput={itemSearch} setSearchInput={setItemSearch}  /> }
        </header>
    )
}