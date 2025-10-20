import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function EditItemForm({setItems, editedItem, setActiveAction}){

    const [name, setName]= useState(editedItem.name);
    const [price, setPrice]= useState(editedItem.price);
    const [quantity, setQuantity]= useState(editedItem.quantity);
    const [unit, setUnit]= useState(editedItem.unit);

    function handleEditItem(e){
        e.preventDefault();
        if (editedItem.name != name || editedItem.price != price || editedItem.quantity != quantity || editedItem.unit != unit){
            fetch(`https://grocery-inventory-38fo.onrender.com/api/categories/${editedItem.category_id}/items/${editedItem.id}`, {

                method :"PUT",
                headers : { "Content-Type": "application/json", },
                body: JSON.stringify({ name, price, quantity, unit })
            }          
            )
            .then(response=>response.json())
            .then(data=>{setItems(prevItems=> prevItems.map(i=>
                    i.id===data.id ? data : i 
            ))
            console.log(data)
            })
            .catch (err=> console.log(err));
        }
        else {
            alert("No changes detected") 
            return
        }
        setActiveAction({type: null, id: null})
    }

    return (
        <dialog open
        aria-labelledby="edit-item-title"
         className="flex items-center justify-center inset-0 fixed w-full h-full bg-gray-800/30">

            <form method="PUT" onSubmit={handleEditItem} className="bg-white rounded-md px-10 py-7 flex flex-col gap-2 text-gray-800 items-start">
                <div className="w-full flex justify-end mb-5">

                    <button type="button" className="cursor-pointer"
                    aria-label="click to exit edit form"
                    onClick={()=>setActiveAction({type: null, id: null})}>
                        <RxCross2 aria-hidden="true" className="hover:opacity-75"/>
                    </button>
                </div>
                <h1 className="text-lg text-gray-800 font-semibold mb-5"id="edit-item-title">Edit item details</h1>
                <label htmlFor="name" className="font-semibold ">Name </label>
                <input type="text" 
                pattern="[A-Za-z\s]+"
                title="Only letters and spaces are allowed"
                className="border-[1px] border-gray-100 p-2 rounded-md w-full"
                name="name" 
                id="name" 
                placeholder="Enter new name..."
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required/>
                <label htmlFor="price" className="font-semibold ">Price </label>
                <input type="number" 
                className="border-[1px] border-gray-100 p-2 rounded-md w-full"
                name="price" 
                id="price" 
                placeholder="Enter new price..."
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                required/>
                <label htmlFor="quantity" className="font-semibold ">Quantity </label>
                <input type="number" 
                className="border-[1px] border-gray-100 p-2 rounded-md w-full"
                name="quantity" 
                id="quantity" 
                placeholder="Enter new quantity..."
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)}
                required/>
                <label htmlFor="unit" className="font-semibold ">Unit</label>
                <input type="text" 
                pattern="[A-Za-z\s]+"
                title="Only letters and spaces are allowed"
                className="border-[1px] border-gray-100 p-2 rounded-md w-full mb-5"
                name="unit" 
                id="unit" 
                placeholder="Enter new unit..."
                value={unit}
                onChange={(e)=>setUnit(e.target.value)}
                required/>
                <button type="submit"className="py-2 px-4 bg-green-600 rounded-md text-white font-medium cursor-pointer hover:opacity-75"> Save</button>
            </form>
        </dialog>
    )
}