import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "አቡቀለምሲስ — Quietly crafted objects" },
      {
        name: "description",
        content:
          "Abukelemsis: a small house of books and creative gifts, made in numbered editions.",
      },
      { property: "og:title", content: "አቡቀለምሲስ — The Cremisi Edition" },
      {
        property: "og:description",
        content: "Books and creative gifts, made in small numbers.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 3);

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
              A small house of books and creative gifts — each piece numbered,
              each detail decided by hand.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center rounded-sm bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
              >
                Shop the edition
              </Link>
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
                alt="Editorial portrait in burgundy tones"
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

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Featured
            </p>
            <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
              A glimpse of the season.
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden text-xs uppercase tracking-[0.2em] text-foreground underline-offset-4 hover:underline md:inline"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-14 text-center md:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center rounded-sm border border-border px-8 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            View all
          </Link>
        </div>
      </section>

    </>
  );
}
