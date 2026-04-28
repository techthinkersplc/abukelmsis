import { toast } from "sonner";
import { useCart } from "@/lib/cart-store";
import { formatPrice, type Product } from "@/lib/products";

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
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        )}
        <button
          onClick={onAdd}
          className="absolute inset-x-4 bottom-4 translate-y-2 rounded-sm bg-primary py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground opacity-0 shadow-elegant transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to bag
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 font-display text-xl text-foreground">{product.name}</h3>
        </div>
        <p className="font-display text-lg text-primary">{formatPrice(product.price_cents)}</p>
      </div>
    </article>
  );
}
