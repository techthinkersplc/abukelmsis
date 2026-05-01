import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-store";
import logo from "@/assets/logo.jpg";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Products" },
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

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    navigate({ to: "/shop", search: q ? { q } : {} } as never);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="አቡቀለምሲስ logo"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-contain"
            />
            <span className="font-display text-base tracking-tight text-primary">
              Abukelemsis<span className="text-foreground">|Shop</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-[11px] uppercase tracking-[0.18em] transition-colors ${
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
        </div>

        {/* Right: search + cart */}
        <div className="ml-auto flex items-center gap-3">
          <form onSubmit={onSearch} className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="h-9 w-56 rounded-full border border-border bg-card pl-9 pr-4 text-xs text-foreground outline-none transition-colors focus:border-primary md:w-72"
            />
          </form>

          <Link
            to="/cart"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card transition-colors hover:border-primary hover:text-primary"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-4 w-4" />
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
