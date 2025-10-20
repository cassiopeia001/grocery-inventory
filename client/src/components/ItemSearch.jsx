export default function ItemSearch({searchInput, setSearchInput}) {
    return (
        <form
        role="search" aria-label="Item search" className="bg-white rounded-xl py-2 px-4 shadow-md flex justify-between">

            <input type="text" className="font-source-sans  placeholder:text-gray-400 w-full" 
            placeholder="Search for an item..."
            aria-label="Search for items"
             value={searchInput}
             onChange={(e)=>setSearchInput(e.target.value)}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1F2937" className="size-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </form>
    )
}