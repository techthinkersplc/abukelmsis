import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "አቡቀለምሲስ — መንፈሳዊ መጽሐፍት እና ስጦታዎች" },
      {
        name: "description",
        content:
          "አቡቀለምሲስ — መንፈሳዊ መጽሐፍት እና ስጦታዎች ጥቅል። ጥራት መለያችን።",
      },
      { property: "og:title", content: "አቡቀለምሲስ — መንፈሳዊ መጽሐፍት እና ስጦታዎች" },
      {
        property: "og:description",
        content: "ጥራት መለያችን። ፍጥነት እና ታማኝነት ዘውትር የምንመሰገንበት ነው።",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

function Home() {
  const pickYourPreference = products.slice(0, 8);
  const handpicked = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <h1 className="text-balance font-display text-4xl leading-[1.15] text-primary md:text-6xl">
              አቡቀለምሲስ መንፈሳዊ መጽሐፍት እና ስጦታዎች
            </h1>
            <div className="mt-6 max-w-md space-y-3 text-base text-muted-foreground">
              <p>ጥራት መለያችን ✨</p>
              <p>ፍጥነት እና ታማኝነት ዘውትር የምንመሰገንበት ነው 🎁</p>
              <p>ይመርጡናል እንጂ አያወዳድሩንም ✨</p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center rounded-sm bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
              >
                Shop the collection
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-foreground underline-offset-4 hover:underline"
              >
                Browse categories →
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-md shadow-elegant">
              <img
                src={heroImg}
                alt="አቡቀለምሲስ — መንፈሳዊ መጽሐፍት እና ስጦታዎች"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="border-y border-border/60 bg-primary py-6 text-primary-foreground">
        <div className="mx-auto max-w-7xl space-y-2 px-6 text-center text-sm leading-relaxed">
          <p>
            ማንኛውንም መንፈሳዊ ስጦታዎችን 🔔 ለወዳጅ ዘመድዎ ለመስጠት ሲያስቡ በዚህ ይደውሉ እና
            ያናግሩን 🔔
          </p>
          <p className="font-display text-xl tracking-wide">0963469973 · 0973133334</p>
        </div>
      </section>

      {/* Pick Your Preference */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              For you
            </p>
            <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
              Pick Your Preference
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden text-xs uppercase tracking-[0.2em] text-foreground underline-offset-4 hover:underline md:inline"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {pickYourPreference.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Handpicked for You */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Curated
          </p>
          <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
            Handpicked for You
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {handpicked.map((p) => (
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
