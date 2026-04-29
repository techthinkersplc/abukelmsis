import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Cremisi — Quietly crafted objects" },
      {
        name: "description",
        content:
          "Discover the new edition: leather, silk, timepieces and fragrance, made in small numbers.",
      },
      { property: "og:title", content: "Maison Cremisi — The Cremisi Edition" },
      {
        property: "og:description",
        content: "Leather, silk, timepieces and fragrance, made in small numbers.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

function Home() {
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
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-accent">
              The Cremisi Edition · 2026
            </p>
            <h1 className="text-balance font-display text-5xl leading-[1.05] text-primary md:text-7xl">
              Quietly crafted<br />
              <em className="not-italic text-accent">objects</em> for a<br />
              considered life.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              A small house of leather, silk, timepieces and fragrance — each
              piece numbered, each detail decided by hand.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#shop"
                className="inline-flex items-center rounded-sm bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
              >
                Shop the edition
              </a>
              <Link
                to="/order"
                className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-foreground underline-offset-4 hover:underline"
              >
                Track your order →
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-md shadow-elegant">
              <img
                src={heroImg}
                alt="Model in burgundy holding a leather bag"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute -bottom-6 -left-6 hidden rounded-md bg-card px-6 py-4 shadow-soft md:block">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Edition of
              </p>
              <p className="font-display text-3xl text-primary">120</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="border-y border-border/60 bg-primary py-4 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-2 px-6 text-[11px] uppercase tracking-[0.3em] opacity-90">
          <span>Complimentary worldwide shipping</span>
          <span className="opacity-40">·</span>
          <span>Hand-numbered editions</span>
          <span className="opacity-40">·</span>
          <span>Lifetime atelier care</span>
        </div>
      </section>

      {/* Catalog */}
      <section id="shop" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              The collection
            </p>
            <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
              Four objects, one season.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
            Every piece is photographed, weighed and inspected at our atelier
            before it leaves us.
          </p>
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
    </>
  );
}
