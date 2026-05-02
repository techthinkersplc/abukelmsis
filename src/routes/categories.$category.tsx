import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/categories/$category")({
  head: ({ params }) => ({
    meta: [
      { title: `${decodeURIComponent(params.category)} — አቡቀለምሲስ` },
      {
        name: "description",
        content: `Browse ${decodeURIComponent(params.category)} items at Abukelemsis.`,
      },
      {
        property: "og:title",
        content: `${decodeURIComponent(params.category)} — አቡቀለምሲስ`,
      },
    ],
  }),
  component: CategoryDetailPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl text-foreground">Category not found</h1>
      <Link
        to="/categories"
        className="mt-6 inline-block text-sm uppercase tracking-[0.2em] text-accent hover:underline"
      >
        Back to categories
      </Link>
    </div>
  ),
});

function CategoryDetailPage() {
  const { category } = Route.useParams();
  const decoded = decodeURIComponent(category);

  const items = useMemo(
    () => products.filter((p) => p.category === decoded),
    [decoded],
  );

  if (items.length === 0) throw notFound();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex items-center justify-between gap-4">
        <div>
          <Link
            to="/categories"
            className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-accent"
          >
            ← All categories
          </Link>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
            {decoded}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {items.length} item{items.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
