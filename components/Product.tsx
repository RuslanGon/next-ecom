import Link from "next/link";
import ProductImage from "./ProductImage";

type Props = {
  product: Product;
};

const Product = ({ product }: Props) => {
  return (
    <Link prefetch={false}
    href={`/product/${product.id}`}
    className="w-72 h-[400px] flex flex-col border group-hover:scale-105 transition-transform ease-out duration-200">
<div className="relative h-60">
  <ProductImage product={product} fill />
</div>
<div className="flex flex-col mt-4 px-2">
  <p className="font-semibold">{product.title}</p>
  <p className="font-semibold">${product.price}</p>
  <p className="italic text-xs line-clamp-2 text-gray-600 mt-2">
    {product.description}
  </p>
</div>
</Link>


  );
};

export default Product;
