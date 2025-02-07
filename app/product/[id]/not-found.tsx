import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h2 className="text-6xl font-bold text-red-500">404</h2>
      <p className="text-2xl font-semibold mt-4">Страница не найдена</p>
      <p className="text-lg text-gray-600 mt-2">Не удалось найти запрашиваемый ресурс.</p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
