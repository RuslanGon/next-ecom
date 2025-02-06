export default async function Home() {

  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();
  console.log(products);


  return (
    <main>
      <section className="flex flex-col space-y-12 pd-44">
        <h1 className="text-5xl font-bold text-center">DEALS OF THE DAY</h1>
        {products.map((product) => (
          <div key={product.id}>
             <h1 className="text-2xl md:text-4xl font-semibold">
            {product.title}
          </h1>
          <h2 className="text-gray-600 font-bold text-xl md:text-3xl">
            ${product.price}
          </h2>
          </div>
        ))}
      </section>
    </main>
  );
}
