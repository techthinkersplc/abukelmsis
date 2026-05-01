import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — አቡቀለምሲስ" },
      {
        name: "description",
        content: "Browse Abukelemsis categories — የራሺያ ሥእሎች, crosses, books and gift sets.",
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
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
        Pick <span className="text-accent">Your Preference</span>
      </h1>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {grouped.map(([category, items]) => {
          const cover = items[0]?.image;
          return (
            <Link
              key={category}
              to="/shop"
              className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-accent"
            >
              {cover && (
                <img
                  src={cover}
                  alt={category}
                  className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:opacity-70 group-hover:scale-105"
                />
              )}
              <span className="absolute left-3 top-3 rounded-md bg-background/80 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground">
                {category}
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-4">
                <p className="text-center font-medium text-foreground">
                  {category}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
