import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';

import { useSelector, useDispatch } from 'react-redux'
import { storeSearchValue, storeSearchData, selectSearchData } from '../slices/searchSlice'

const Header = ({ logoText, navItems }) => {

    const dispatch = useDispatch()
    const searchData = useSelector(selectSearchData)

    const PUBLIC_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    const searchMovie = async (e) => {
        e.preventDefault()
        try {
            const searchResponse = await fetch(`${PUBLIC_URL}/search/movie?query=${searchData}&api_key=${API_KEY}&language=en-US&page=1`);
            const searchResults = await searchResponse.json();
            dispatch(storeSearchValue(searchResults))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <nav className=" border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" legacyBehavior>
                    <a className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                            {logoText}
                        </span>
                    </a>
                </Link>
                <div className=" md:order-2 relative">
                    <form className="w-full flex-1 lg:w-[20vw]" onSubmit={searchMovie}>
                        <div className="relative">
                            <input
                                onChange={(e) => dispatch(storeSearchData(e.target.value))}
                                type="text"
                                className="block w-full p-4 pl-3 pr-[105px] text-sm text-white border border-gray-700 rounded-lg bg-gray-800"
                                placeholder="Search Movies ..."
                                value={searchData}
                                required
                            />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5  hover:bg-orange-500 font-medium rounded-lg text-sm px-4 py-2 bg-orange-500/75">
                                Search
                            </button>
                        </div>
                    </form>
                    {
                        searchData && (
                            <button onClick={() =>{
                                dispatch(storeSearchData(('')))
                                dispatch(storeSearchValue([]))
                            }} className="text-white absolute right-[90px] bottom-[20px] cursor-pointer">
                                <AiOutlineClose className="w-4 h-4 " />
                            </button>
                        )
                    }
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-cta"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        {navItems.map((item) => (
                            <NavItem key={item.href} href={item.href} label={item.label} />
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const NavItem = ({ href, label }) => {
    return (
        <li>
            <Link href={href} legacyBehavior>
                <a className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    {label}
                </a>
            </Link>
        </li>
    );
};

export default Header;
