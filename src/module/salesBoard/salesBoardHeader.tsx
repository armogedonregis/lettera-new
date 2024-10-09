'use client'

import { useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
    CurrencyDollarIcon,
    HashtagIcon,
    GlobeAltIcon,
    TruckIcon,
    HomeIcon,
    BriefcaseIcon,
    WrenchIcon,
    ShoppingBagIcon,
    HomeModernIcon,
    PuzzlePieceIcon,
    GiftIcon,
    CogIcon,
    BuildingStorefrontIcon,
    DevicePhoneMobileIcon
} from '@heroicons/react/24/solid';
import React from 'react';
import CustomScrollbar from '@/components/customScrollbar';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const categories = {
    "Транспорт": ["Автомобили", "Мотоциклы", "Велосипеды", "Водный транспорт", "Запчасти"],
    "Недвижимость": ["Квартиры", "Дома", "Земельные участки", "Гаражи", "Коммерческая недвижимость"],
    "Работа": ["Вакансии", "Резюме", "Услуги"],
    "Услуги": [
        "Сад, благоустройство", "Автосервис, аренда", "Вывоз мусора и вторсырья",
        "Красота, здоровье", "Грузоперевозки", "Уборка",
        "Ремонт и обслуживание техники", "Пассажирские перевозки", "Бытовые услуги",
        "Деловые услуги", "Грузчики, складские услуги", "Доставка еды и продуктов",
        "IT, маркетинг", "Услуги эвакуатора", "Фото- и видеосъёмка",
        "Реклама, полиграфия", "Ремонт и отделка", "Няни, сиделки",
        "Монтаж и установка техники", "Строительство", "Уход за животными",
        "Оборудование, производство", "Мастер на час", "Искусство",
        "Обучение, курсы", "Компьютерная помощь", "Охрана, безопасность"
    ],
    "Личные вещи": ["Одежда", "Обувь", "Аксессуары", "Часы и украшения", "Красота и здоровье"],
    "Для дома и дачи": ["Мебель", "Бытовая техника", "Посуда", "Растения", "Продукты питания"],
    "Хобби и отдых": ["Билеты и путешествия", "Велосипеды", "Книги и журналы", "Музыкальные инструменты", "Спорт и отдых"],
    "Животные": ["Собаки", "Кошки", "Птицы", "Аквариум", "Другие животные"],
    "Запчасти и аксессуары": ["Запчасти", "Шины, диски и колёса", "Аудио и видеотехника", "Автокосметика и автохимия", "Тюнинг"],
    "Бизнес и оборудование": ["Готовый бизнес", "Оборудование для бизнеса", "Сырьё и материалы", "Услуги для бизнеса"],
    "Электроника": ["Телефоны", "Компьютеры", "Фото и видео", "Тв и видеотехника", "Аудиотехника"]
};

const categoryIcons = {
    "Транспорт": TruckIcon,
    "Недвижимость": HomeIcon,
    "Работа": BriefcaseIcon,
    "Услуги": WrenchIcon,
    "Личные вещи": ShoppingBagIcon,
    "Для дома и дачи": HomeModernIcon,
    "Хобби и отдых": PuzzlePieceIcon,
    "Животные": GiftIcon,
    "Запчасти и аксессуары": CogIcon,
    "Бизнес и оборудование": BuildingStorefrontIcon,
    "Электроника": DevicePhoneMobileIcon
};

export const SalesBoardHeader = () => {
    const scrollPosition = useScrollPosition();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        // Сбрасываем состояние скролла при изменении маршрута
        setIsScrolled(false);
    }, [pathname]);

    useEffect(() => {
        // Обновляем состояние скролла с небольшой задержкой
        const timer = setTimeout(() => {
            setIsScrolled(scrollPosition > 20);
        }, 500);

        return () => clearTimeout(timer);
    }, [scrollPosition]);

    const setCategory = (category: string, subcategory?: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("category", category);
        if (subcategory) {
            current.set("subcategory", subcategory);
        } else {
            current.delete("subcategory");
        }
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${window.location.pathname}${query}`);
    };

    return (
        <div className={`sticky z-[60] px-5 lg:px-8 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md rounded-b-xl pt-6 top-12' : 'top-20'}`}>
            <div className="flex mb-4">
                <div className="relative flex-grow">
                    <input type="text" placeholder="Поиск в Lettera" className="w-full p-2 pl-10 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors">Найти</button>
            </div>

            <div className="flex lg:flex-row flex-wrap lg:flex-nowrap space-y-2 lg:space-y-0 lg:space-x-2 pb-2 relative">
                <Menu as="div" className="lg:w-full">
                    <Menu.Button className="w-full bg-white text-gray_primary px-4 py-2 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-colors group">
                        <div className="flex items-center">
                            <span className="mr-2 text-gray_primary group-hover:text-blue_primary">☰</span>
                            <span className="group-hover:text-blue_primary">Категория товаров</span>
                        </div>
                        <ChevronDownIcon className="h-5 w-5 text-gray_primary group-hover:text-blue_primary" />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-0 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 focus:outline-none">
                            <CustomScrollbar className="pb-64 lg:pb-4">
                                <div className="p-4">


                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                        {Object.entries(categories).map(([category, subcategories], index) => {
                                            const Icon = categoryIcons[category as keyof typeof categoryIcons];
                                            return (
                                                <React.Fragment key={category}>
                                                    <div className="space-y-2">
                                                        <button
                                                            className={`font-semibold text-left w-full hover:text-blue_primary flex items-center ${selectedCategory === category ? 'text-blue_primary' : 'text-gray_primary'}`}
                                                            onClick={() => {
                                                                setCategory(category);
                                                                setSelectedCategory(category);
                                                            }}
                                                        >
                                                            <Icon className={`h-5 w-5 mr-2 ${selectedCategory === category ? 'text-blue_primary' : 'text-gray_primary'}`} />
                                                            {category}
                                                        </button>
                                                    </div>
                                                    {selectedCategory === category && (
                                                        <div className="col-span-1 lg:col-span-3 mt-2">
                                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                                                                {subcategories.map((subcategory) => (
                                                                    <button
                                                                        key={subcategory}
                                                                        className="text-sm text-gray-500 hover:text-blue_primary text-left"
                                                                        onClick={() => setCategory(category, subcategory)}
                                                                    >
                                                                        {subcategory}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {(index + 1) % 3 === 0 && <div className="col-span-1 lg:col-span-3"></div>}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CustomScrollbar>
                        </Menu.Items>
                    </Transition>
                </Menu>
                <div className="flex flex-wrap lg:flex-nowrap gap-2">
                    <Menu as="div" className="relative">
                        <Menu.Button className="bg-white text-gray_primary px-4 py-2 rounded-xl flex items-center whitespace-nowrap hover:bg-gray-100 transition-colors group">
                            <CurrencyDollarIcon className="h-5 w-5 mr-2 text-gray_primary group-hover:text-blue_primary" />
                            <span className="group-hover:text-blue_primary">Цена</span>
                            <ChevronDownIcon className="ml-2 h-5 w-5 text-gray_primary group-hover:text-blue_primary" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-blue_primary' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm w-full text-left`}
                                            >
                                                До 1000 ₽
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-blue_primary' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm w-full text-left`}
                                            >
                                                1000 ₽ - 5000 ₽
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-blue_primary' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm w-full text-left`}
                                            >
                                                Свыше 5000 ₽
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <Menu as="div" className="relative">
                        <Menu.Button className="bg-white text-gray_primary px-4 py-2 rounded-xl flex items-center whitespace-nowrap hover:bg-gray-100 transition-colors group">
                            <HashtagIcon className="h-5 w-5 mr-2 text-gray_primary group-hover:text-blue_primary" />
                            <span className="group-hover:text-blue_primary">Теги</span>
                            <ChevronDownIcon className="ml-2 h-5 w-5 text-gray_primary group-hover:text-blue_primary" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-blue_primary' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm w-full text-left`}
                                            >
                                                #популярное
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-blue_primary' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm w-full text-left`}
                                            >
                                                #новинка
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-blue_primary' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm w-full text-left`}
                                            >
                                                #акция
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <Menu as="div" className="relative">
                        <Menu.Button className="bg-white text-gray_primary px-4 py-2 rounded-xl flex items-center whitespace-nowrap hover:bg-gray-100 transition-colors group">
                            <GlobeAltIcon className="h-5 w-5 mr-2 text-gray_primary group-hover:text-blue_primary" />
                            <span className="group-hover:text-blue_primary">Везде</span>
                            <ChevronDownIcon className="ml-2 h-5 w-5 text-gray_primary group-hover:text-blue_primary" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-blue_primary' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm w-full text-left`}
                                            >
                                                Товары
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-blue_primary' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm w-full text-left`}
                                            >
                                                Стены
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-gray-100 text-blue_primary' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm w-full text-left`}
                                            >
                                                Везде
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    );
};