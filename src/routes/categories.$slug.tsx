import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products, slugToCategory } from "@/lib/products";

export const Route = createFileRoute("/categories/$slug")({
  head: ({ params }) => {
    const category = slugToCategory(params.slug) ?? "Category";
    return {
      meta: [
        { title: `${category} — አቡቀለምሲስ` },
        {
          name: "description",
          content: `Browse ${category} from አቡቀለምሲስ.`,
        },
        { property: "og:title", content: `${category} — አቡቀለምሲስ` },
      ],
    };
  },
  loader: ({ params }) => {
    const category = slugToCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  notFoundComponent: () => (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl text-primary">Category not found</h1>
      <Link
        to="/categories"
        className="mt-6 inline-flex rounded-full border border-border px-6 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary hover:text-primary"
      >
        Back to Categories
      </Link>
    </section>
  ),
  errorComponent: ({ error }) => (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </section>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = useMemo(
    () => products.filter((p) => p.category === category),
    [category],
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10">
        <Link
          to="/categories"
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
        >
          ← All categories
        </Link>
        <h1 className="mt-4 font-display text-4xl text-foreground md:text-6xl">
          <span className="text-accent">{category}</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-md border border-dashed border-border bg-card/50 p-16 text-center">
          <p className="font-display text-2xl text-primary">Nothing here yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
