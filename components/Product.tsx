import Link from "next/link";

type Props = {
  product: Product;
};

const Product = ({ product }: Props) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="h-96 flex flex-col border group-hover:scale-105 transition-transform ease-out duration-200">
      <div></div>
      <div className="font-semibold flex items-center justify-between mt-4 mb-1">
        <p>{product.title}</p>
        <p>${product.price}</p>
        <p className="italic text-xs w-64 line-clamp-2 text-gray-600">
          {product.description}
        </p>
      </div>
    </Link>
  );
};

export default Product;
