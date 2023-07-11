import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';

const Header = ({ logoText, navItems }) => {

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
                    <form className="w-full flex-1 lg:w-[20vw]" >
                        <div className="relative">
                            <input
                                type="text"
                                className="block w-full p-4 pl-3 pr-[105px] text-sm text-white border border-gray-700 rounded-lg bg-gray-800"
                                placeholder="Search Movies ..."
                                required
                            />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5  hover:bg-orange-500 font-medium rounded-lg text-sm px-4 py-2 bg-orange-500/75">
                                Search
                            </button>
                        </div>
                    </form>
                            <button className="text-white absolute right-[90px] bottom-[20px] cursor-pointer">
                                <AiOutlineClose className="w-4 h-4 " />
                            </button>
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
