import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";

const links = [
  { to: "/", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { location } = useRouterState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(useCart.getState().count());
    update();
    return useCart.subscribe(update);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-display text-2xl tracking-tight text-primary">
          Maison <span className="text-accent">Cremisi</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm uppercase tracking-[0.2em] transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/cart"
          className="relative inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Bag</span>
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
