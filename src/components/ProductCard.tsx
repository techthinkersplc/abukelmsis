import { toast } from "sonner";
import { useCart } from "@/lib/cart-store";
import { type Product, formatPrice } from "@/lib/products"; // Added formatPrice import

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);

  const onAdd = () => {
    const res = add(product);
    if (res.ok) toast.success(`${product.name} added to bag`);
    else toast.error(res.reason ?? "Unable to add");
  };

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-md bg-secondary aspect-square">
        <img
          src={product.image as string} // Added type cast for safety
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <button
          onClick={onAdd}
          className="absolute inset-x-4 bottom-4 rounded-sm bg-primary py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-elegant"
        >
          Add to bag
        </button>
      </div>
      <div className="mt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {product.category}
        </p>
        <h3 className="mt-1 font-display text-xl text-foreground">{product.name}</h3>
        {/* --- DISPLAY PRICE HERE --- */}
        <p className="mt-2 text-sm font-medium text-accent">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
