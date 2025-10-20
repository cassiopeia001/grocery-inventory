import { CiWarning } from "react-icons/ci";
export default function DeleteFormConfirmation ({type, setActiveAction, handleDelete}){
    return (
        <dialog 
        open 
        aria-labelledby="delete-category-title"
        className="flex items-center justify-center inset-0 fixed w-full h-full bg-gray-800/30">
        
            <div className="bg-white rounded-md px-7 py-10 mx-5 flex flex-col gap-6 text-gray-800 items-start">
                <div className="w-full flex flex-col gap-5 mb-5">
                
                    <CiWarning className="text-red-500" size={50} aria-hidden="true"/>
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold text-lg"
                        id="delete-category-title">Delete {type}</p>
                        <p className="text-gray-700">Are you sure you want to delete this {type.toLowerCase()}? This action is permanent and cannot be undone.</p>
                    </div>
                </div>
                <div className="flex gap-4 justify-end w-full">
                    <button className="px-4 py-2 bg-gray-500 rounded-md text-white font-medium cursor-pointer hover:opacity-70" onClick={()=>setActiveAction({type: null, id: null})}>Cancel</button>
                    <button className="px-4 py-2 bg-red-600 rounded-md text-white font-medium cursor-pointer hover:opacity-70" onClick={()=>handleDelete()}>Delete</button>
                </div>
                
            </div>
        </dialog>
    )
}