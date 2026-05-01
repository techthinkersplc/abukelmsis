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

function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">About</p>
      <h1 className="mt-3 font-display text-5xl text-primary md:text-6xl">
        አቡቀለምሲስ
      </h1>

      <div className="mt-10 space-y-8 text-lg leading-relaxed text-foreground">
        <p>ውድ ደንበኞቻችን ✨</p>
        <p>
          ለአገልግሎት ጥራት እንዲያመች የበዓል ትዕዛዞቻችሁን ቀደም ብላችሁ ብታዙን ስንል በትህትና
          እንጠይቃለን 🤍
        </p>
        <p className="font-display text-2xl text-primary">
          አቡቀለምሲስ በፍቅር የተሰናዳ ✨
        </p>

        <div className="my-10 h-px bg-border" />

        <p>
          የሱቃችን አድራሻ ስታዲየም ቤተዛታ ሆስፒታል ጀርባ
        </p>
        <p>
          አን ቢዝነስ ሴንተር (የድሮ ጫካ ቡና የነበረበት) የመጀመሪያው ፎቅ ላይ ነው — ይምጡ እና
          ይጎብኙን 🤗
        </p>
        <div className="pt-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Call us
          </p>
          <p className="mt-2 font-display text-3xl text-primary">0963469973</p>
          <p className="font-display text-3xl text-primary">0973133334</p>
        </div>
      </div>
    </section>
  );
}
