import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop the collection — አቡቀለምሲስ" },
      {
        name: "description",
        content:
          "Browse the full Abukelemsis collection. Search, filter and sort our numbered editions.",
      },
      { property: "og:title", content: "Shop the collection — አቡቀለምሲስ" },
      {
        property: "og:description",
        content: "Browse, search and sort the full Abukelemsis collection.",
      },
    ],
  }),
  component: ShopPage,
});

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

function ShopPage() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [],
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [query, category, sort]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Shop</p>
        <h1 className="mt-3 font-display text-5xl text-primary md:text-6xl">
          The collection
        </h1>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative md:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the collection"
              className="h-11 w-full rounded-sm border border-border bg-card pl-11 pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary"
              aria-label="Search products"
            />
          </div>

          <label className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-11 rounded-sm border border-border bg-card px-3 text-sm tracking-normal text-foreground outline-none transition-colors focus:border-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price · Low to high</option>
              <option value="price-desc">Price · High to low</option>
              <option value="name">Name · A → Z</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-sm border border-dashed border-border bg-card/50 p-16 text-center">
          <p className="font-display text-2xl text-primary">No matches</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search or clear the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setSort("featured");
            }}
            className="mt-6 inline-flex items-center rounded-sm border border-border px-6 py-2 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
