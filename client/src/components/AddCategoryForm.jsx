import { RxCross2 } from "react-icons/rx";
import { CategoriesContext } from "../context/CategoriesContext";
import { useContext } from "react";
export default function AddCategoryForm({input, setInput, setActiveAction}){

    const {  categories, setCategories } = useContext(CategoriesContext);

    function AddNewCategory (e){
        e.preventDefault();
        fetch('http://localhost:3000/api/categories/',{
            method: "POST",
            headers: {
            "Content-Type": "application/json", 
            },
            body: JSON.stringify({name: input})
        }).then(response=>response.json())
        .then(data=> {
            console.log(data)
            setCategories(prev=>[...prev, data])})
        .catch(err=>console.log(err));

        setActiveAction({type: null, id: null});
    }
    return (
        <dialog
        open 
        aria-labelledby="add-category-title"
        className="flex items-center justify-center inset-0 fixed w-full h-full bg-gray-800/30">

            <form action="" method="POST" onSubmit={AddNewCategory} className="bg-white rounded-md px-10 py-7 flex flex-col gap-6 text-gray-800 items-start">
                <div className="w-full flex justify-end mb-5">

                    <button type="button" className="cursor-pointer"
                    aria-label="Close dialog"
                    onClick={()=>{
                        setActiveAction({type: null , id: null});
                    }}>
                        <RxCross2 aria-hidden="true"/>
                    </button>
                </div>
                <label htmlFor="name" id="add-category-title" className="font-semibold text-lg">Please enter category name</label>
                <input type="text" 
                className="border-[1px] border-gray-100 p-2 rounded-md w-full"
                name="name" 
                id="name" 
                placeholder="Enter category name..."
                value={input}
                onChange={(e)=>{
                    setInput(e.target.value);
                }} required/>
                <button type="submit"className="py-2 px-4 bg-green-600 rounded-md text-white font-medium cursor-pointer"> Add</button>
            </form>
        </dialog>
    )
}