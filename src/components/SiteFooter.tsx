export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl">አቡቀለምሲስ</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] opacity-70">
            Abukelemsis
          </p>
          <p className="mt-3 max-w-xs text-sm opacity-80">
            የመጻሕፍት እና የመንፈሳዊ ሥጦታዎች ጥቅል — books and creative spiritual gifts,
            curated with care.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="mb-3 text-xs uppercase tracking-[0.2em] opacity-70">House</h4>
          <ul className="space-y-2 opacity-90">
            <li>About the atelier</li>
            <li>Sustainability</li>
            <li>Press</li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="mb-3 text-xs uppercase tracking-[0.2em] opacity-70">Care</h4>
          <ul className="space-y-2 opacity-90">
            <li>Shipping & returns</li>
            <li>Client services</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 px-6 py-6 text-center text-xs opacity-70">
        © {new Date().getFullYear()} አቡቀለምሲስ · Abukelemsis. All rights reserved.
      </div>
    </footer>
  );
}
