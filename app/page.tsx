import Product from "../components/Product";

export default async function Home() {

  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();
  console.log(products);


  return (
    <main className="min-h-screen w-full mx-auto px-8 xl:px-0 mt-12">
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <h1 className="text-5xl font-bold text-center col-span-full">DEALS OF THE DAY</h1>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  </main>
  
  );
}
