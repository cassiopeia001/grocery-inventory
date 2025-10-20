import { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
export default function Layout (){
    const [categorySearch, setCategorySearch] = useState("");
    const [itemSearch, setItemSearch] = useState("");
    return (
        <div className="min-h-screen h-full w-full bg-gray-50 py-7 px-5 flex flex-col gap-10 md:py-10 px:7 lg:px-10 xl:px-15">
            <Header  categorySearch={categorySearch}
                    setCategorySearch={setCategorySearch}
                    itemSearch={itemSearch}
                    setItemSearch={setItemSearch}/>
            <main className="font-source-sans">
                <Outlet context={{categorySearch, itemSearch}} />
            </main>
        </div>
    )    
}