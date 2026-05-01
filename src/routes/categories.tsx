import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — አቡቀለምሲስ" },
      {
        name: "description",
        content: "Browse Abukelemsis categories — icons, crosses, books and gift sets.",
      },
      { property: "og:title", content: "Categories — አቡቀለምሲስ" },
      {
        property: "og:description",
        content: "Browse Abukelemsis categories.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const grouped = useMemo(() => {
    const map = new Map<string, typeof products>();
    for (const p of products) {
      const list = map.get(p.category) ?? [];
      list.push(p);
      map.set(p.category, list);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Categories</p>
      <h1 className="mt-3 font-display text-5xl text-primary md:text-6xl">
        Browse by category
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {grouped.map(([category, items]) => (
          <div key={category} className="rounded-md border border-border bg-card p-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl text-primary">{category}</h2>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {items.length} items
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {items.map((p) => (
                <li key={p.id} className="flex items-center justify-between">
                  <span>{p.name}</span>
                  <span className="text-muted-foreground">{p.category}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/shop"
              className="mt-6 inline-flex text-xs uppercase tracking-[0.2em] text-foreground underline-offset-4 hover:underline"
            >
              Shop {category} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
