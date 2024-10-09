export default function SearchBar() {
    return (
      <div className="flex">
        <input type="text" placeholder="Поиск в Lettera" className="flex-grow p-2 border rounded-l-lg" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Найти</button>
      </div>
    );
  }