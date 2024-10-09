'use client'

import Image from 'next/image';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/cartContext';
import { toast } from 'react-toastify';

const paymentMethods = [
  { id: 'visa', name: 'Karta Visa', icon: '💳' },
  { id: 'mastercard', name: 'Mastercard', icon: '💳' },
  { id: 'sberbank', name: 'Sberbank', icon: '🏦' },
  { id: 'tinkoff', name: 'T-Bank', icon: '🏦' },
  { id: 'paypal', name: 'PayPal', icon: '📱' },
];

const currencies = ['Рубль ₽', 'Доллар $', 'Евро €', 'Криптовалюта'];

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      removeFromCart(id);
    }
    toast.error(`"${item.name}" удален из корзины`);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Корзина</h1>

      <div className="bg-white rounded-xl shadow-md p-6">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Ваша корзина пуста</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
              <div className="flex items-center space-x-4">
                <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-md" />
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-2">
                  <button
                    className="w-6 h-6 text-gray-500 font-bold"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    className="w-6 h-6 text-gray-500 font-bold"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <p className="font-bold text-sm w-20 text-right">{item.price} ₽</p>
                <button><HeartIcon className="w-5 h-5 text-gray-400" /></button>
                <button onClick={() => removeFromCart(item.id)}>
                  <TrashIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <h2 className="text-xl font-bold">Итого</h2>
            <p className="text-xl font-bold">{total}₽</p>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex space-x-6 mb-6">
            <div className="w-1/2">
              <h2 className="text-sm font-semibold mb-2">Способ оплаты:</h2>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="flex items-center space-x-2">
                    <input type="radio" name="paymentMethod" className="form-radio" />
                    <span className="text-sm">{method.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="w-1/2">
              <h2 className="text-sm font-semibold mb-2">Валюта:</h2>
              <div className="space-y-2">
                {currencies.map((currency) => (
                  <label key={currency} className="flex items-center space-x-2">
                    <input type="radio" name="currency" className="form-radio" />
                    <span className="text-sm">{currency}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Номер карты</label>
              <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-2 border rounded-md bg-gray-100 mt-1" />
            </div>
            <div>
              <label className="text-sm font-semibold">Дата и CVV</label>
              <div className="flex space-x-4 mt-1">
                <select className="w-1/3 p-2 border rounded-md bg-gray-100">
                  <option>10</option>
                </select>
                <select className="w-1/3 p-2 border rounded-md bg-gray-100">
                  <option>2020</option>
                </select>
                <input type="text" placeholder="000" className="w-1/3 p-2 border rounded-md bg-gray-100" />
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-500 text-white py-3 rounded-md mt-6 font-semibold">Оплатить</button>
        </div>
      )}
    </div>
  );
}