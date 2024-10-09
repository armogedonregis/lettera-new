'use client'

import { usePathname } from 'next/navigation';
import GroupIcon from '/public/icons/group_icon.svg';
import MessengerIcon from '/public/icons/messenger_icon.svg';
import SettingsIcon from '/public/icons/settings_icon.svg';
import CartIcon from '/public/icons/cart_icon.svg';
import SearchIcon from '/public/icons/search_icon.svg';
import HeartIcon from '/public/icons/heart_icon.svg';
import NotificationIcon from '/public/icons/notification_icon.svg';
import ProfileIcon from '/public/icons/profile_icon.svg';
import LogoIcon from '/public/logo.svg';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/cartContext';

const Header: React.FC = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItems } = useCart();

    const isActive = (path: string) => pathname === path;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const cartItemsCount = cartItems.length;


    return (
        <header className="bg-white shadow-md sticky top-0 left-0 right-0 z-50 overflow-hidden">
            <div className="container px-5 lg:px-0 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/">
                        <LogoIcon className="transition-transform duration-300 ease-in-out hover:scale-105" />
                    </Link>
                    <button className="bg-blue_primary text-white font-semibold ml-4 px-4 py-[6px] rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-600 items-center hidden md:flex">
                        Salesboard
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                <div className="flex space-x-8 items-center">
                    <Link href="/group" className={`${isActive('/group') ? 'text-blue_primary' : 'text-gray_primary'} hidden lg:block hover:text-blue_primary cursor-pointer transition-all duration-300 ease-in-out hover:scale-110`}>
                        <GroupIcon />
                    </Link>
                    <Link href="/messenger" className={`${isActive('/messenger') ? 'text-blue_primary' : 'text-gray_primary'} hidden lg:block hover:text-blue_primary cursor-pointer transition-all duration-300 ease-in-out hover:scale-110`}>
                        <MessengerIcon />
                    </Link>
                    <Link href="/settings" className={`${isActive('/settings') ? 'text-blue_primary' : 'text-gray_primary'} hidden lg:block hover:text-blue_primary cursor-pointer transition-all duration-300 ease-in-out hover:scale-110`}>
                        <SettingsIcon />
                    </Link>
                    <Link href="/cart" className="relative hidden lg:flex flex-col items-center">
                        <div className="relative">
                            <CartIcon className={`${isActive('/cart') ? 'text-blue_primary' : 'text-gray_primary'} hover:text-blue_primary cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 size-7`} />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue_primary text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </div>
                        {isActive('/cart') && <span className="text-blue_primary text-xs mt-1">Корзина</span>}
                    </Link>
                    <Link href="/" className="hidden lg:flex flex-col items-center">
                        <SearchIcon className={`${isActive('/') ? 'text-blue_primary' : 'text-gray_primary'} cursor-pointer transition-all duration-300 ease-in-out hover:scale-110`} />
                        {isActive('/') && <span className="text-blue_primary text-xs mt-1">Поиск</span>}
                    </Link>
                    <Link href="/favorites" className={`${isActive('/favorites') ? 'text-blue_primary' : 'text-gray_primary'} hidden lg:block hover:text-blue_primary cursor-pointer transition-all duration-300 ease-in-out hover:scale-110`}>
                        <HeartIcon />
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/" className={`${isActive('/') ? 'text-blue_primary' : 'text-gray_primary'} lg:hidden`}>
                        <SearchIcon />
                    </Link>
                    <Link href="/notifications" className={`${isActive('/notifications') ? 'text-blue_primary' : 'text-gray_primary'} cursor-pointer transition-all duration-300 ease-in-out hover:scale-110`}>
                        <NotificationIcon />
                    </Link>
                    <Link href="/profile" className={`${isActive('/profile') ? 'text-blue_primary' : 'text-gray_primary'} cursor-pointer transition-all duration-300 ease-in-out hover:scale-110`}>
                        <ProfileIcon />
                    </Link>
                    <button onClick={toggleMenu} className="text-gray_primary lg:hidden">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Мобильное меню */}
            <div className={`lg:hidden fixed left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out ${isMenuOpen ? 'top-[72px]' : '-top-full'}`}>
                <div className="container px-5 py-4">
                    <nav className="flex flex-wrap justify-between">
                        <Link href="/favorites" className={`${isActive('/favorites') ? 'text-blue_primary' : 'text-gray_primary'} flex flex-col items-center w-1/3 mb-4`}>
                            <HeartIcon className="mb-1 size-7" />
                            <span className="text-xs">Избранное</span>
                        </Link>
                        <Link href="/group" className={`${isActive('/group') ? 'text-blue_primary' : 'text-gray_primary'} flex flex-col items-center w-1/3 mb-4`}>
                            <GroupIcon className="mb-1" />
                            <span className="text-xs">Стены</span>
                        </Link>
                        <Link href="/messenger" className={`${isActive('/messenger') ? 'text-blue_primary' : 'text-gray_primary'} flex flex-col items-center w-1/3 mb-4`}>
                            <MessengerIcon className="mb-1" />
                            <span className="text-xs">Мессенджер</span>
                        </Link>
                        <Link href="/cart" className={`${isActive('/cart') ? 'text-blue_primary' : 'text-gray_primary'} flex flex-col items-center w-1/3 mb-4`}>
                            <div className="relative">
                                <CartIcon className="mb-1 size-7" />
                                {cartItemsCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-blue_primary text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs">Корзина</span>
                        </Link>
                        <Link href="/" className={`${isActive('/') ? 'text-blue_primary' : 'text-gray_primary'} flex flex-col items-center w-1/3 mb-4`}>
                            <SearchIcon className="mb-1" />
                            <span className="text-xs">Поиск</span>
                        </Link>
                        <Link href="/settings" className={`${isActive('/settings') ? 'text-blue_primary' : 'text-gray_primary'} flex flex-col items-center w-1/3 mb-4`}>
                            <SettingsIcon className="mb-1" />
                            <span className="text-xs">Настройки</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;