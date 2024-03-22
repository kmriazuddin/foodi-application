import React, { useEffect, useState } from 'react';
import Cards from '../../components/cards/Cards';
import { CiFilter } from "react-icons/ci";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(8);

    // Loading Data
    useEffect(() => {
        // Fetch Data From The Backend
        const fetchData = async () => {
            try {
                const response = await fetch("https://foodi-application-server.onrender.com/menu");
                const data = await response.json();
                setMenu(data);
                setFilteredItems(data);
            } catch (error) {
                console.log("Error Fetching Data", error);
            }
        };

        // Call This Function
        fetchData();
    }, []);

    // Filter Data Based On Category
    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
        setFilteredItems(filtered);
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    // Show All Data
    const showAll = () => {
        setFilteredItems(menu);
        setSelectedCategory("all");
        setCurrentPage(1);
    };

    // Sorting Data On A-Z, Z-A, Low-High, Pricing
    const handleSortChange = (option) => {
        setSortOption(option);

        let sortedItems = [...filteredItems];
        // Logic
        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name))
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name))
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price)
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price)
                break;
            default:
                break;
        }
        setFilteredItems(sortedItems);
        setCurrentPage(1);
    }

    // Pagination Logic
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const pagination = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Menu Banner */}
            <div className='section-container bg-gradient-to-tr from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
                <div className='py-48 flex flex-col justify-center items-center gap-8'>
                    {/* Text Div */}
                    <div className='text-center space-y-5 px-5'>
                        <h2 className='text-4xl md:text-5xl font-bold leading-snug md:leading-snug'>Dive into Delights Of Delectable <span className='text-greenLight'>Food</span></h2>
                        <p className='text-xl text-[#4A4A4A]'>Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship</p>
                        <button className='btn bg-greenLight text-white font-semibold rounded-3xl px-6 py-2'>Order Now</button>
                    </div>
                </div>
            </div>
            {/* Menu Shop Section */}
            <div className='section-container'>
                {/* Filter And Sorting */}
                <div className='flex flex-col flex-wrap md:flex-row md:justify-between items-center space-y-3 mb-8'>
                    {/* Filtered Category */}
                    <div className='flex flex-row justify-start md:items-center md:gap-8 gap-5 flex-wrap'>
                        <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>All</button>
                        <button onClick={() => filterItems("salad")} className={selectedCategory === "salad" ? "active" : ""}>Salad</button>
                        <button onClick={() => filterItems("pizza")} className={selectedCategory === "pizza" ? "active" : ""}>Pizza</button>
                        <button onClick={() => filterItems("soup")} className={selectedCategory === "soup" ? "active" : ""}>Soups</button>
                        <button onClick={() => filterItems("dessert")} className={selectedCategory === "dessert" ? "active" : ""}>Desserts</button>
                        <button onClick={() => filterItems("drinks")} className={selectedCategory === "drinks" ? "active" : ""}>Drinks</button>
                    </div>
                    {/* Sorting Base Filter */}
                    <div className='flex justify-end mb-4 rounded-sm'>
                        <div className='bg-green-200 p-2'>
                            <CiFilter className='h-6 w-6 text-rose-500' />
                        </div>
                        {/* Sorting Options */}
                        <select name="sort" id="sort" onChange={(e) => handleSortChange(e.target.value)} value={sortOption} className='bg-green-200 text-slate-700 px-2 py-2 rounded-sm'>
                            <option value="default">Default</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="low-to-high">Low-To-High</option>
                            <option value="high-to-low">High-To-Low</option>
                        </select>
                    </div>
                </div>
                {/* Product */}
                <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4'>
                    {
                        currentItems.map((item) => (
                            <Cards key={item._id} item={item} />
                        ))
                    }
                </div>
            </div>
            {/* Pagination Section */}
            <div className='flex justify-center my-5'>
                {
                    Array.from({length: Math.ceil(filteredItems.length / itemPerPage)}).map((_, index) => (
                        <button key={index + 1} onClick={() => pagination(index + 1)} className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-greenLight text-white" : "bg-gray-200"}`}>{index + 1}</button>
                    ))
                }
            </div>
        </div>
    );
};

export default Menu;