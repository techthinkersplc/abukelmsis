import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, type Product } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "አቡቀለምሲስ · Abukelemsis — Books & Creative Gifts" },
      {
        name: "description",
        content:
          "አቡቀለምሲስ — discover the new edition of meaningful books and creative gifts.",
      },
      { property: "og:title", content: "አቡቀለምሲስ — The Cremisi Edition" },
      {
        property: "og:description",
        content: "Books and creative gifts, made with care.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchProducts()
      .then((data) => alive && setProducts(data))
      .catch((e) => alive && setError(e.message ?? "Failed to load"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-accent">
              አቡቀለምሲስ · Edition 2026
            </p>
            <h1 className="text-balance font-display text-5xl leading-[1.05] text-primary md:text-7xl">
              Quietly crafted<br />
              <em className="not-italic text-accent">objects</em> for a<br />
              considered life.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              የመጻሕፍት እና የመንፈሳዊ ሥጦታዎች ጥቅል — books and meaningful gifts,
              chosen carefully and sent from our small atelier.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#shop"
                className="inline-flex items-center rounded-sm bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
              >
                Shop the edition
              </a>
              <Link
                to="/about"
                className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-foreground underline-offset-4 hover:underline"
              >
                Inside the atelier →
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-md shadow-elegant">
              <img
                src={heroImg}
                alt="Editorial portrait in burgundy"
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

      <section className="border-y border-border/60 bg-primary py-4 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-2 px-6 text-[11px] uppercase tracking-[0.3em] opacity-90">
          <span>Complimentary worldwide shipping</span>
          <span className="opacity-40">·</span>
          <span>Hand-numbered editions</span>
          <span className="opacity-40">·</span>
          <span>Lifetime atelier care</span>
        </div>
      </section>

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

        {loading && (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-md bg-secondary" />
                <div className="mt-4 h-4 w-2/3 rounded bg-secondary" />
                <div className="mt-2 h-3 w-1/3 rounded bg-secondary" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            Couldn't load the catalog. {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
