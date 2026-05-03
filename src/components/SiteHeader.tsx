import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";
import logo from "@/assets/logo.jpg";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { location } = useRouterState();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const update = () => setCount(useCart.getState().count());
    update();
    return useCart.subscribe(update);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate({ to: "/shop", search: q ? { q } : undefined } as never);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="አቡቀለምሲስ logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl tracking-tight text-primary">
              አቡቀለምሲስ
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:block">
              Abukelemsis
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <form
            onSubmit={onSearch}
            className="hidden items-center rounded-full border border-border bg-card px-3 py-1.5 lg:flex"
          >
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="ml-2 w-36 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
          </form>
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
      </div>
    </header>
  );
}
