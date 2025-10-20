import { useEffect } from "react";
import { useState } from "react";
import { MdOutlineEdit, MdOutlineDelete, MdOutlineCancel } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosSave } from "react-icons/io";
import AddCategoryForm from "../components/AddCategoryForm";
import { CategoriesContext } from "../context/CategoriesContext";
import { Link, useOutletContext } from "react-router-dom";
import DeleteFormConfirmation from "../components/deleteFormConfirmation";
import { motion, AnimatePresence } from "framer-motion";
export default function Home (){

    const [categories, setCategories]= useState([]);
    const [formInput, setFormInput]= useState("");
    const [activeAction, setActiveAction] = useState({type : null, id: null});
    const [editedName, setEditedName] = useState('');

    const {categorySearch} = useOutletContext();
    useEffect(()=>{
        fetch('http://localhost:3000/api/categories/').
        then(response=> response.json()).
        then(data=> setCategories(data)).
        catch(err=>console.log(err))
    }, []);
    function handleEditCategory(id){
        if (editedName.trim()!= ""){
            fetch(`http://localhost:3000/api/categories/${id}`,{
                method: "PUT",
                headers : {
                "Content-Type": "application/json", 
                },
                body: JSON.stringify({name: editedName})
            }).then(response=>response.json())
            .then(data=>setCategories(prevcategories=>prevcategories.map(c=>
                    c.id===data.id ? data : c
            )
            ))
            .catch(err=>console.log(err));
        }
        setActiveAction({type: null, id: null})
        setEditedName("");
    }
    function handleDeleteCategory(){
        fetch(`http://localhost:3000/api/categories/${activeAction.id}`, {
            method: "DELETE", 
            headers : {
                "Content-Type" : "application/json",
            }
        }).then(response=> {
            if(! response.ok){
                throw new Error ("No category was deleted")
            }
            setCategories(prev => prev.filter(c => c.id !== activeAction.id))
         }  
        )
        .catch(e=> console.log(e));
        setActiveAction({type: null , id:null})
    }
    const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(categorySearch.trim().toLowerCase())
    );
    return(
        <CategoriesContext.Provider value={{categories, setCategories}}>
        <section className="flex flex-col gap-15" aria-labelledby="title" aria-describedby="description">
            {
                activeAction.type=== "add-category" && <AddCategoryForm input= {formInput} setInput={setFormInput} setActiveAction={setActiveAction} />
            }
            {
                activeAction.type=== "delete-category" && <DeleteFormConfirmation type ={"Category"} setActiveAction={setActiveAction} handleDelete={handleDeleteCategory} />
            }
            <div className="flex flex-col gap-5">

                <h1 className="text-center text-gray-800 text-3xl font-bold lg:text-4xl" id="title">Manage your store with ease</h1>
                <p className="text-gray-700 text-center text-lg lg:text-xl" id="description">Track categories and items, update stock, and keep everything organized in one place.</p>
            </div>
            <div className="flex flex-col gap-3  ">
                <div className=" text-gray-800 bg-white p-3 rounded-lg border-[1px] border-gray-100 flex justify-between items-center">
                    <h2 className=" font-semibold text-xl lg:text-2xl">Categories</h2>
                    <button className="flex items-center gap-1 p-2 bg-green-600 rounded-md text-white hover:cursor-pointer hover:opacity-75"
                    onClick={()=>{
                        setActiveAction({type: "add-category", id: null})
                    }}> <CiSquarePlus size={25} aria-hidden="true"/> Add category  </button>
                </div>
                <p className="text-gray-700 pl-1 lg:text-lg">Click a category to view items, or use the buttons to add, edit, or delete.</p>
            </div>
            <div className="w-full flex items-center justify-center">

                <div className="w-full rounded-lg shadow bg-white p-4 ">
                        {
                            filteredCategories.length > 0 ? (
                <table className=" bg-white rounded-lg w-full lg:text-lg ">
                    
                    <thead className=" text-gray-800 ">
                        <tr className="">
                            <th className="p-2 pl-2 font-semibold bg-[#F2F2F2]">ID</th>
                            <th className="p-2 font-semibold bg-[#F2F2F2]">Name</th>
                            <th className="p-2 font-semibold bg-[#F2F2F2]">N° items</th>
                            <th className="p-2 font-semibold bg-[#F2F2F2]">Actions</th>
                        </tr>
                    </thead>
                    
                            <tbody className="divide-y divide-[#F2F2F2] "> {
                            filteredCategories.map(category=>{
                                return <tr key={category.id}  className=" text-gray-700 rounded-lg text-center hover:bg-gray-50 transition">
                                    <td className="p-3 ">{category.id}</td>
                                    <td className="p-3">{
                                    activeAction.id===category.id ?
                                     <motion.input
                                        key="edit-input"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }} 
                                        className="border-[1px] border-gray-100 p-1 rounded-md" 
                                        type="text" aria-label="enter new category name" value={editedName}
                                        onChange={(e)=> setEditedName(e.target.value)} required/> : 
                                        <motion.div
                                            key="category-name"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}>

                                                <Link to={`/categories/${category.id}`}>{category.name}</Link>
                                        </motion.div>
                                     }</td>
                                    <td className="p-3">{category.nitems}</td>
                                    <td className="p-3 text-base">
                                            {
                                                activeAction.type=== "edit-category" && activeAction.id=== category.id ? 
                                                <div className="flex gap-1 justify-center md:gap-2">
                                                    <button className="bg-sky-100 p-1 rounded-md cursor-pointer flex items-center"
                                                    aria-label="save changes"
                                                    onClick={()=>handleEditCategory(category.id)}>
                                                        <IoIosSave aria-hidden="true"/>
                                                    </button>
                                                    <button className="bg-red-100 p-1 rounded-md cursor-pointer flex items-center "
                                                    aria-label="cancel changes"
                                                    onClick={()=>{
                                                        setActiveAction({type: null, id: null})
                                                        setEditedName('')
                                                    }}>
                                                        <MdOutlineCancel aria-hidden="true" />
                                                    </button> 
                                                </div> :
                                                <div className="flex gap-1 justify-center md:gap-2">
                                                    <button className="bg-sky-100 p-1 rounded-md cursor-pointer flex items-center  "
                                                    aria-label={`edit ${category.name} category `}
                                                    onClick={()=>{
                                                        setActiveAction({type: "edit-category", id: category.id}); 
                                                        setEditedName(category.name)}}>
                                                            <MdOutlineEdit aria-hidden="true" />
                                                    </button>
                                                    <button className="bg-red-100 p-1 rounded-md cursor-pointer flex items-center "
                                                    aria-label={`delete ${category.name} category `}
                                                    onClick={()=> setActiveAction({type : "delete-category", id: category.id})}>
                                                        <MdOutlineDelete aria-hidden="true"/>
                                    
                                                    </button>
                                                </div>
                                            }
                                            
                                    </td>
                                </tr>
                            }) }
                        </tbody>
                </table>
                            ) :(
                            <p className="text-center text-gray-800 font-medium">No result found, please try again. </p>
                            )
                        }
                </div>
            </div>
        </section>
         </ CategoriesContext.Provider>
    )
}