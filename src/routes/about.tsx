import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — አቡቀለምሲስ" },
      {
        name: "description",
        content:
          "ስለ አቡቀለምሲስ — በፍቅር የተሰናዳ መንፈሳዊ መጽሐፍት እና ሥጦታዎች ሱቅ።",
      },
      { property: "og:title", content: "About — አቡቀለምሲስ" },
      {
        property: "og:description",
        content: "ስለ አቡቀለምሲስ — በፍቅር የተሰናዳ።",
      },
    ],
  }),
  component: AboutPage,
});

const features = [
  { title: "Premium Quality", description: "Curated from the best sources." },
  { title: "Fast Delivery", description: "Shipping that keeps up with you." },
  { title: "Secure Payments", description: "Your data is always protected." },
];

function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h1 className="font-display text-6xl font-bold leading-none text-accent md:text-8xl">
        Abukelemsis
      </h1>

      <div className="mt-10 max-w-3xl space-y-6 text-base leading-relaxed text-foreground/90 md:text-lg">
        <p>
          Founded in 2025, Abukelemsis began with a simple idea that
          high-quality products should not be hard to find. We curated a
          collection that blends modern aesthetics with everyday functionality.
        </p>
        <p>
          Every item in our shop is a reflection of our commitment to{" "}
          <span className="font-semibold">excellence, durability, and style.</span>
        </p>

        <div className="space-y-3 pt-6 text-foreground">
          <p className="text-xl">ውድ ደንበኞቻችን ✨</p>
          <p>
            ለአገልግሎት ጥራት እንዲያመች የበዓል ትዕዛዞቻችሁን ቀደም ብላችሁ ብታዙን ስንል
            በትህትና እንጠይቃለን 🤍
          </p>
          <p className="font-display text-2xl text-accent">
            አቡቀለምሲስ በፍቅር የተሰናዳ ✨
          </p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border-l-2 border-accent bg-card/40 p-6 shadow-elegant"
          >
            <h3 className="font-display text-xl text-accent">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>

      {/* Address & contact */}
      <div className="mt-16 grid grid-cols-1 gap-8 rounded-xl border border-border bg-card/30 p-8 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Visit us
          </p>
          <p className="mt-3 leading-relaxed text-foreground">
            የሱቃችን አድራሻ ስታዲየም ቤተዛታ ሆስፒታል ጀርባ — አን ቢዝነስ ሴንተር (የድሮ ጫካ
            ቡና የነበረበት) የመጀመሪያው ፎቅ ላይ ነው 🤗
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Call us
          </p>
          <p className="mt-3 font-display text-2xl text-accent">0963469973</p>
          <p className="font-display text-2xl text-accent">0973133334</p>
        </div>
      </div>
    </section>
  );
}
