"use client";

import ProductImage from "@/components/ProductImage";
import { Dialog } from "@headlessui/react";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Импортируем иконку крестика
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Modal() {
  const [isOpen, setIsOpen] = useState(false);  // Сначала закрыто
  const id = useParams().id;
  const [product, setProduct] = useState<Product | null>(null);  // Устанавливаем null, пока данные не загрузятся
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product: Product = await res.json();
      setProduct(product);
      setIsOpen(true);  // Открываем модальное окно после загрузки данных
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return null; // Пока продукт не загружен, не показываем ничего
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel */}
          <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10 relative pt-12">
            {/* Кнопка закрытия */}
            <button
              onClick={() => {
                setIsOpen(false);
                router.back();
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex gap-x-8 h-96">
              {product.image && (
                <div className="relative w-72 h-full hidden md:inline">
                  <ProductImage product={product} fill />
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <div className="flex-1">
                  <h4 className="font-semibold">{product.title}</h4>
                  <p className="font-medium text-sm">{product.price}</p>
                  <div className="flex items-center text-sm my-4">
                    <p>{product.rating.rate}</p>
                    {product.rating.rate && (
                      <div className="flex items-center ml-2 mr-6">
                        {Array.from(
                          { length: Math.floor(product.rating.rate) },
                          (_, i) => (
                            <StarIcon
                              key={i}
                              className="h-4 w-4 text-yellow-500"
                            />
                          )
                        )}
                        {Array.from(
                          { length: 5 - Math.floor(product.rating.rate) },
                          (_, i) => (
                            <StarIconOutline
                              key={i}
                              className="h-4 w-4 text-yellow-500"
                            />
                          )
                        )}
                      </div>
                    )}
                    <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                      See all {product.rating.count} reviews
                    </p>
                  </div>
                  <p className="line-clamp-5 text-sm">{product.description}</p>
                </div>
                <div className="space-y-3 text-sm">
                  <button className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
                    Add to basket
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
                  >
                    View full details
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
