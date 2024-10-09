import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import CartIcon from '/public/icons/cart_icon.svg';
import HeartIcon from '/public/icons/heart_icon.svg';
import { useCart } from '@/context/cartContext';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-3.5">
      <div className="relative h-48">
        <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded-xl" />
      </div>
      <div className="flex justify-between mt-2 mb-3">
        <div className="flex space-x-1">
          <button className="bg-black text-[10px] text-white rounded-full p-1 w-6 h-6 flex items-center justify-center">◀</button>
          <button className="bg-black text-[10px] text-white rounded-full p-1 w-6 h-6 flex items-center justify-center">▶</button>
        </div>
        <div className="flex justify-end items-center space-x-2">
          <button className="hover:text-blue_primary text-gray_primary">
            <HeartIcon className="h-6 w-6" />
          </button>
          <button onClick={handleAddToCart} className="hover:text-blue_primary text-gray_primary">
            <CartIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between items-start">
          <p className="text-sm text-gray-600 line-clamp-2 flex-grow">{product.name}</p>
          <h3 className="font-bold text-lg ml-2 whitespace-nowrap text-blue_primary">{product.price} ₽</h3>
        </div>
        <p className="text-xs text-gray-500">Название стены</p>
        <div className="flex items-center">
          <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-sm text-gray-600">4.9</span>
          <span className="text-sm text-gray-400 ml-1">(133 отзыва)</span>
        </div>
      </div>
    </div>
  );
}