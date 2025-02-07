"use client";

import ProductImage from "../../../components/ProductImage";
import { Dialog } from "@headlessui/react";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Импорт иконки крестика
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const id = useParams().id;
  const [product, setProduct] = useState<Product>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product: Product = await res.json();
      setProduct(product);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      {/* Затемненный фон */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Контейнер модального окна */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="relative mx-auto max-w-3xl h-[500px] rounded bg-white p-10 flex flex-col justify-between" >
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

            {loading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <ProductImage product={product} fill />
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium text-sm">{product?.price}</p>
                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating.rate}</p>
                      {product?.rating.rate && (
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
                      <p className=" text-blue-600 hover:underline cursor-pointer text-xs">
                        See all {product?.rating.count} reviews
                      </p>
                    </div>
                    <p className="line-clamp-5 text-sm">
                      {product?.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <button className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black transition-all duration-300">
                      Add to basket
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black transition-all duration-300"
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
