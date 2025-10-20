import { useState } from "react";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import AddItemForm from "../components/AddItemForm";
import EditItemForm from "../components/EditItemForm";
import DeleteFormConfirmation from "../components/deleteFormConfirmation";
import { useNavigate } from "react-router-dom";

export default function Category(){

    const [categoryName, setCategoryName] = useState("");
    const [items, setItems]= useState([]);
    const [activeAction, setActiveAction]= useState({type: null, id: null})
    const [currentEditedItem, setCurrentEditedItem]= useState({});
    const {category_id} = useParams();

     const navigate = useNavigate();

    const { itemSearch } = useOutletContext();

    useEffect(()=>{
        fetch(`http://localhost:3000/api/categories/${category_id}`)
        .then(response=> response.json())
        .then(data=> setCategoryName(data))
        .catch(err=>console.log(err));

        fetch(`http://localhost:3000/api/categories/${category_id}/items`)
        .then(response=>response.json())
        .then(data=> setItems(data))
        .catch(err=>console.log(err));
    },[]);

    function deleteItem(){
        fetch(`http://localhost:3000/api/categories/${category_id}/items/${activeAction.id}`, {
            method :"DELETE",
            headers : { "Content-Type": "application/json", },
        })
        .then(response=> {
            if (! response.ok){

                throw new Error("NO item has been deleted");
            } 
            setItems(prev => prev.filter(i => i.id !== activeAction.id))
        })
        .catch(err=>console.log(err));

        setActiveAction({type: null, id:null})
    }

    const filteredItems = items.filter(i =>
        i.name.toLowerCase().includes(itemSearch.trim().toLowerCase())
    );

    return (
        <section className="flex flex-col  gap-10">

            {
                activeAction.type=== "add-item" && <AddItemForm setItems= {setItems} categoryId={category_id} setActiveAction= {setActiveAction}/>
                
            }
            {
                activeAction.type === "edit-item" && <EditItemForm setItems={setItems} editedItem= {currentEditedItem} setActiveAction = {setActiveAction} />
            }
            {
                activeAction.type === "delete-item" && <DeleteFormConfirmation type={"item"} setActiveAction={setActiveAction} handleDelete= {deleteItem}   />
            }

            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">

                    <button className="bg-white shadow-md rounded-md p-2 hover:opacity-50 cursor-pointer"
                    aria-label="click to go back"
                    onClick={() => navigate(-1)}><IoIosArrowBack aria-hidden="true" /></button>
                    <h1 className="text-xl text-gray-800 font-semibold lg:text-2xl">{categoryName}</h1>
                </div>
                <button className="flex items-center gap-1 p-2 bg-green-600 rounded-md text-white hover:cursor-pointer hover:opacity-75"
                onClick={()=>setActiveAction({type: "add-item", id: null})}
                > <CiSquarePlus size={25} aria-hidden="true" /> Add item</button>

            </div>
            <p className="text-gray-700 pl-1 lg:text-lg">Use the buttons to edit, delete, or add new items.</p>
            <div className="w-full rounded-lg shadow bg-white p-4 overflow-x-auto">
                    {
                        filteredItems.length > 0 ? (
            <table className=" bg-white rounded-lg w-full lg:text-lg">
                
                <thead className=" text-gray-800 ">
                    <tr className="">
                        <th className="px-1 py-2 pl-2 font-semibold bg-[#F2F2F2]">ID</th>
                        <th className="px-1 py-2  font-semibold bg-[#F2F2F2]">Name</th>
                        <th className="px-1 py-2  font-semibold bg-[#F2F2F2]">Price</th>
                        <th className="px-1 py-2  font-semibold bg-[#F2F2F2]">Quantity</th>
                        <th className="px-1 py-2  font-semibold bg-[#F2F2F2]">Unit</th>
                        <th className="px-1 py-2  font-semibold bg-[#F2F2F2]">Actions</th>
                    </tr>
                </thead>
                
                        <tbody className="divide-y divide-[#F2F2F2]"> {
                        filteredItems.map(item=>{
                            return <tr className=" text-gray-700 rounded-lg text-center hover:bg-gray-50 transition">
                                <td className="py-3 px-1">{item.id}</td>
                                <td className="py-3 px-1">{item.name}</td>
                                <td className="py-3 px-1">{item.price} $</td>
                                <td className="py-3 px-1">{item.quantity}</td>
                                <td className="py-3 px-1">{item.unit}</td>
                                <td className="py-3 px-1">    
                                    <div className="flex gap-1 justify-center">
                                        <button className="bg-sky-100 p-1 rounded-md cursor-pointer"
                                        aria-label={`Click to edit ${item.name} item`}
                                        onClick={()=> {setActiveAction({type: "edit-item", id: item.id}); setCurrentEditedItem(item)}}>
                                            <p className="hidden ">Edit</p>
                                            <MdOutlineEdit aria-hidden="true" />
                                        </button>
                                        <button className="bg-red-100 p-1 rounded-md cursor-pointer"
                                        aria-label={`Click to delete ${item.name} item`}
                                        onClick={()=>setActiveAction({type: "delete-item", id: item.id})}>
                                            <p className="hidden">Delete</p>
                                            <MdOutlineDelete aria-hidden="true" />
                                        </button>
                                    </div>                    
                                </td>
                            </tr>
                        }) }
                    </tbody>
            </table>
                        ) :(
                           <p className="text-center text-gray-800 font-medium"> {itemSearch==="" ?  "No items yet, click add to add items" : "No result found, please try again."} </p>
                        )
                    }
            </div>
        </section>
    )
}