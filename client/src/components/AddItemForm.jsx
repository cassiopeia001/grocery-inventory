import { RxCross2 } from "react-icons/rx";
import { LuAsterisk } from "react-icons/lu";
import { useState } from "react";

export default function AddItemForm ({setItems, categoryId, setActiveAction}){

    const [name, setName]= useState("");
    const [price, setPrice]= useState("");
    const [quantity, setQuantity]= useState("");
    const [unit, setUnit]= useState("");

    function AddNewItem (e){
        e.preventDefault();

        fetch(`https://grocery-inventory-38fo.onrender.com/api/categories/${categoryId}/items`,{
            method: "POST",
            headers: {
            "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                name: name,
                price: parseFloat(price),
                quantity : quantity,
                unit : parseInt(quantity, 10),
                category_id : categoryId
            })
        }).then(response=>response.json())
        .then(data=> {
            console.log(data)
            setItems(prev=>[...prev, data])})
        .catch(err=>{ 
            alert(err)
            console.log(err)});

        setActiveAction({type: null, id: null});

    }

    return (
        <dialog
        aria-label="Add item form"
        open
        className="flex items-center justify-center inset-0 fixed w-full h-full bg-gray-800/30">
        
            <form method="POST" onSubmit={AddNewItem} className="bg-white rounded-md px-10 py-7 flex flex-col gap-2 text-gray-800 items-start">
                <div className="w-full flex justify-end mb-5">

                    <button type="button" className="cursor-pointer"
                    aria-label="Click to exit add item form"
                    onClick={()=>{
                        setActiveAction({type: null, id: null});
                    }}>
                        <RxCross2 aria-hidden="true" className="hover:opacity-75"/>
                    </button>
                </div>
                <label htmlFor="name" className="font-semibold flex gap-2">Name <LuAsterisk aria-hidden="true" className="text-red-600 mt-1" size={10}/></label>
                <input type="text" 
                className="border-[1px] border-gray-100 p-2 rounded-md w-full"
                name="name" 
                id="name" 
                placeholder="Enter name..."
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                aria-required="true"/>
                <label htmlFor="price" className="font-semibold flex gap-2">Price <LuAsterisk aria-hidden="true" className="text-red-600 mt-1" size={10}/></label>
                <input type="number" 
                className="border-[1px] border-gray-100 p-2 rounded-md w-full"
                name="price" 
                id="price" 
                placeholder="Enter price..."
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                required
                aria-required="true"/>
                <label htmlFor="quantity" className="font-semibold flex gap-2">Quantity <LuAsterisk aria-hidden="true" className="text-red-600 mt-1" size={10}/></label>
                <input type="number" 
                className="border-[1px] border-gray-100 p-2 rounded-md w-full"
                name="quantity" 
                id="quantity" 
                placeholder="Enter quantity..."
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)}
                required
                aria-required="true"/>
                <label htmlFor="unit" className="font-semibold flex gap-2">Unit <LuAsterisk aria-hidden="true" className="text-red-600 mt-1" size={10}/></label>
                <input type="text" 
                className="border-[1px] border-gray-100 p-2 rounded-md w-full mb-5"
                name="unit" 
                id="unit" 
                placeholder="Enter unit..."
                value={unit}
                onChange={(e)=>setUnit(e.target.value)}
                required
                aria-required="true"/>
                <button type="submit"className="py-2 px-4 bg-green-600 rounded-md text-white font-medium cursor-pointer hover:opacity-75"> Add</button>
            </form>
        </dialog>
)
}