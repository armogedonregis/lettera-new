'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ProductCard from './productCard';
import { SalesBoardHeader } from './salesBoardHeader';
import { useSearchParams } from 'next/navigation';


const baseProducts = [
    // Транспорт
    { id: 1, name: 'Велосипед горный Scott Scale 970 29"', price: 89990, image: '/images/product_1.png', category: "Транспорт", subcategory: "Велосипеды" },
    { id: 2, name: 'Электросамокат Xiaomi Mi Electric Scooter Pro 2', price: 39990, image: '/images/product_2.png', category: "Транспорт", subcategory: "Велосипеды" },
    { id: 3, name: 'Toyota Camry 2020 года', price: 2500000, image: '/images/product_3.png', category: "Транспорт", subcategory: "Автомобили" },
    { id: 4, name: 'Мотоцикл Honda CBR650R', price: 750000, image: '/images/product_1.png', category: "Транспорт", subcategory: "Мотоциклы" },
    { id: 5, name: 'Лодка ПВХ Фрегат М-350 FM Lux', price: 45000, image: '/images/product_2.png', category: "Транспорт", subcategory: "Водный транспорт" },

    // Недвижимость
    { id: 6, name: 'Квартира-студия, 28 м², 9/16 эт.', price: 3500000, image: '/images/product_3.png', category: "Недвижимость", subcategory: "Квартиры" },
    { id: 7, name: 'Дом 150 м² на участке 10 сот.', price: 5000000, image: '/images/product_1.png', category: "Недвижимость", subcategory: "Дома" },
    { id: 8, name: 'Земельный участок 15 соток', price: 1200000, image: '/images/product_2.png', category: "Недвижимость", subcategory: "Земельные участки" },
    { id: 9, name: 'Гараж, 24 м²', price: 350000, image: '/images/product_3.png', category: "Недвижимость", subcategory: "Гаражи" },
    { id: 10, name: 'Офисное помещение, 100 м²', price: 7000000, image: '/images/product_1.png', category: "Недвижимость", subcategory: "Коммерческая недвижимость" },

    // Работа
    { id: 11, name: 'Вакансия: Разработчик Python (Junior)', price: 80000, image: '/images/product_2.png', category: "Работа", subcategory: "Вакансии" },
    { id: 12, name: 'Резюме: Опытный бухгалтер', price: 70000, image: '/images/product_3.png', category: "Работа", subcategory: "Резюме" },
    { id: 13, name: 'Ищу работу: Графический дизайнер', price: 60000, image: '/images/product_1.png', category: "Работа", subcategory: "Резюме" },

    // Услуги
    { id: 14, name: 'Услуги репетитора по математике', price: 1000, image: '/images/product_2.png', category: "Услуги", subcategory: "Обучение, курсы" },
    { id: 15, name: 'Стрижка газонов и обрезка кустарников', price: 2000, image: '/images/product_3.png', category: "Услуги", subcategory: "Сад, благоустройство" },
    { id: 16, name: 'Ремонт и обслуживание автомобилей', price: 3000, image: '/images/product_1.png', category: "Услуги", subcategory: "Автосервис, аренда" },
    { id: 17, name: 'Маникюр и педикюр на дому', price: 1500, image: '/images/product_2.png', category: "Услуги", subcategory: "Красота, здоровье" },
    { id: 18, name: 'Грузоперевозки по городу', price: 1000, image: '/images/product_3.png', category: "Услуги", subcategory: "Грузоперевозки" },

    // Личные вещи
    { id: 19, name: 'Lipikar AP+M питательный крем для лица и тела 75 мл', price: 513, image: '/images/product_1.png', category: "Личные вещи", subcategory: "Красота и здоровье" },
    { id: 20, name: 'Шампунь для волос профессиональный 1000 мл', price: 291, image: '/images/product_2.png', category: "Личные вещи", subcategory: "Красота и здоровье" },
    { id: 21, name: 'Зимняя куртка Columbia', price: 12000, image: '/images/product_3.png', category: "Личные вещи", subcategory: "Одежда" },
    { id: 22, name: 'Кроссовки Nike Air Max', price: 8000, image: '/images/product_1.png', category: "Личные вещи", subcategory: "Обувь" },
    { id: 23, name: 'Сумка Michael Kors', price: 15000, image: '/images/product_2.png', category: "Личные вещи", subcategory: "Аксессуары" },

    // Для дома и дачи
    { id: 24, name: 'Диван угловой раскладной', price: 35000, image: '/images/product_3.png', category: "Для дома и дачи", subcategory: "Мебель" },
    { id: 25, name: 'Холодильник LG', price: 40000, image: '/images/product_1.png', category: "Для дома и дачи", subcategory: "Бытовая техника" },
    { id: 26, name: 'Набор посуды Tefal', price: 5000, image: '/images/product_2.png', category: "Для дома и дачи", subcategory: "Посуда" },
    { id: 27, name: 'Фикус Бенджамина', price: 1500, image: '/images/product_3.png', category: "Для дома и дачи", subcategory: "Растения" },

    // Хобби и отдых
    { id: 28, name: 'Набор для рисования 48 предметов', price: 1200, image: '/images/product_1.png', category: "Хобби и отдых", subcategory: "Спорт и отдых" },
    { id: 29, name: 'Гитара акустическая', price: 15000, image: '/images/product_2.png', category: "Хобби и отдых", subcategory: "Музыкальные инструменты" },
    { id: 30, name: 'Палатка четырехместная', price: 8000, image: '/images/product_3.png', category: "Хобби и отдых", subcategory: "Спорт и отдых" },

    // Животные
    { id: 31, name: 'Котенок шотландской вислоухой, 2 месяца', price: 15000, image: '/images/product_1.png', category: "Животные", subcategory: "Кошки" },
    { id: 32, name: 'Щенок лабрадора, 3 месяца', price: 25000, image: '/images/product_2.png', category: "Животные", subcategory: "Собаки" },
    { id: 33, name: 'Аквариум 100 литров с рыбками', price: 10000, image: '/images/product_3.png', category: "Животные", subcategory: "Аквариум" },

    // Запчасти и аксессуары
    { id: 34, name: 'Автомобильные шины Michelin 205/55 R16', price: 5600, image: '/images/product_1.png', category: "Запчасти и аксессуары", subcategory: "Шины, диски и колёса" },
    { id: 35, name: 'Автомагнитола Pioneer', price: 8000, image: '/images/product_2.png', category: "Запчасти и аксессуары", subcategory: "Аудио и видеотехника" },
    { id: 36, name: 'Масло моторное Castrol Edge 5W-30, 4 л', price: 3000, image: '/images/product_3.png', category: "Запчасти и аксессуары", subcategory: "Автокосметика и автохимия" },

    // Бизнес и оборудование
    { id: 37, name: 'Кофемашина для кафе Nuova Simonelli', price: 180000, image: '/images/product_1.png', category: "Бизнес и оборудование", subcategory: "Оборудование для бизнеса" },
    { id: 38, name: 'Парикмахерское кресло', price: 15000, image: '/images/product_2.png', category: "Бизнес и оборудование", subcategory: "Оборудование для бизнеса" },
    { id: 39, name: 'Готовый бизнес: Автомойка', price: 1500000, image: '/images/product_3.png', category: "Бизнес и оборудование", subcategory: "Готовый бизнес" },

    // Электроника
    { id: 40, name: 'Игровая консоль PlayStation 5 Slim 1TB (с дисководом)', price: 47416, image: '/images/product_1.png', category: "Электроника", subcategory: "Тв и видеотехника" },
    { id: 41, name: 'Смартфон iPhone 13 Pro 256GB', price: 99990, image: '/images/product_2.png', category: "Электроника", subcategory: "Телефоны" },
    { id: 42, name: 'Ноутбук ASUS ROG Strix G15', price: 120000, image: '/images/product_3.png', category: "Электроника", subcategory: "Компьютеры" },
    { id: 43, name: 'Фотоаппарат Canon EOS R6', price: 180000, image: '/images/product_1.png', category: "Электроника", subcategory: "Фото и видео" },
    { id: 44, name: 'Наушники Sony WH-1000XM4', price: 25000, image: '/images/product_2.png', category: "Электроника", subcategory: "Аудиотехника" },
];

export default function HomeScreen() {
    const [products, setProducts] = useState<typeof baseProducts>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);
    const searchParams = useSearchParams();

    const selectedCategory = searchParams.get('category');
    const selectedSubcategory = searchParams.get('subcategory');

    const filteredBaseProducts = useMemo(() => {
        return baseProducts.filter(product => {
            if (selectedCategory && selectedSubcategory) {
                return product.category === selectedCategory && product.subcategory === selectedSubcategory;
            } else if (selectedCategory) {
                return product.category === selectedCategory;
            }
            return true;
        });
    }, [selectedCategory, selectedSubcategory]);

    const loadMoreProducts = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            const startIndex = (page - 1) * 9 % filteredBaseProducts.length;
            const newProducts = Array.from({ length: 3 }, (_, i) => {
                const baseIndex = (startIndex + i) % filteredBaseProducts.length;
                return {
                    ...filteredBaseProducts[baseIndex],
                    id: (page - 1) * 3 + i + 1
                };
            });
            setProducts(prevProducts => [...prevProducts, ...newProducts]);
            setPage(prevPage => prevPage + 1);
            setLoading(false);
        }, 1000);
    }, [page, filteredBaseProducts]);

    useEffect(() => {
        setProducts([]);
        setPage(1);
    }, [selectedCategory, selectedSubcategory]);

    useEffect(() => {
        if (products.length === 0 && !loading) {
            loadMoreProducts();
        }
    }, [products, loading, loadMoreProducts]);

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
            loadMoreProducts();
        }
    }, [loading, loadMoreProducts]);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
        return () => {
            if (loader.current) observer.unobserve(loader.current);
        }
    }, [handleObserver]);

    return (
        <div className="pt-[30px] pb-32 flex flex-col h-full min-h-full">
            <SalesBoardHeader />
            <div className="flex-grow mt-16 px-5 lg:px-[46px] overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {loading && (
                    <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                )}
                <div ref={loader} />
            </div>
        </div>
    );
}