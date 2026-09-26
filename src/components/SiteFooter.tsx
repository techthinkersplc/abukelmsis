import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

// Define the interface for SocialLink props to fix the 'unknown' error
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
  "aria-label"?: string;
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/40 bg-secondary/5 pt-20 pb-12 antialiased">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Social Section */}
          <div className="lg:col-span-5">
            <Link to="/" className="group flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border shadow-sm transition-transform duration-500 group-hover:scale-110">
                <img src={logo} alt="አቡቀለምሲስ logo" className="h-full w-full object-cover" />
              </div>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-xl font-bold tracking-tight text-primary">
                  አቡቀለምሲስ
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground/80">
                  Abukelemsis
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground/80">
              Redefining the digital marketplace through seamless design and high-performance
              commerce solutions.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <SocialLink
                href="https://www.instagram.com/abuqelemsis_gifts"
                hoverColor="hover:text-[#E4405F]"
                icon={<Instagram className="h-4 w-4" />}
                aria-label="Instagram"
              />
              <SocialLink
                href="https://t.me/abuqelemsisgifts"
                hoverColor="hover:text-[#24A1DE] hover:border-[#24A1DE]"
                icon={<TelegramIcon />}
                aria-label="Telegram"
              />
              <SocialLink
                href="https://www.tiktok.com/@abuqelemsisgifts"
                hoverColor="hover:text-black dark:hover:text-white"
                icon={<TikTokIcon />}
                aria-label="TikTok"
              />
              <SocialLink
                href="https://www.facebook.com/profile.php?id=61570425916623"
                hoverColor="hover:text-[#1877F2]"
                icon={<Facebook className="h-4 w-4" />}
                aria-label="Facebook"
              />
            </div>
          </div>

          {/* Navigation & Location Sections */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <FooterGroup title="Shop">
              <FooterLink to="/shop">New Arrivals</FooterLink>
              {/* <FooterLink to="/shop">Gifts</FooterLink> */}
              <FooterLink to="/categories">Categories</FooterLink>
            </FooterGroup>

            <FooterGroup title="Explore">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">Our Story</FooterLink>
              <FooterLink to="/contact">Support</FooterLink>
            </FooterGroup>

            <FooterGroup title="Visit Us">
              <div className="flex flex-col gap-3 text-xs leading-relaxed text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>Addis Ababa, Ethiopia</span>
                </div>
                <p className="pl-5 text-[11px] text-muted-foreground/60 italic">
                  Available for local delivery and nationwide shipping.
                </p>
              </div>
            </FooterGroup>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50">
          <p>© {new Date().getFullYear()} Abukelemsis. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hidden md:inline">•</span>
            <span className="hover:text-primary cursor-default transition-colors">
              Quality Gifts
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- HELPER COMPONENTS ---

function SocialLink({ href, icon, hoverColor, "aria-label": label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-current ${hoverColor} shadow-sm`}
    >
      {icon}
    </a>
  );
}

function FooterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-primary/90">
        {title}
      </h4>
      <div className="flex flex-col gap-3.5">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-[13px] text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-1"
    >
      {children}
    </Link>
  );
}

function TelegramIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.44-4.14-1.17-.11 3.51.02 7.02-.02 10.53-.14 1.61-.83 3.25-2.12 4.25-1.52 1.25-3.69 1.66-5.59 1.12-2.1-.56-3.88-2.31-4.38-4.4-.64-2.45.35-5.27 2.45-6.66.91-.59 1.96-.92 3.03-1.01v4.11c-.42.06-.85.16-1.23.36-1.07.52-1.7 1.77-1.48 2.95.17 1.05 1.08 1.93 2.13 2.05 1.06.13 2.19-.38 2.68-1.32.18-.34.25-.72.25-1.1V0h.01z" />
    </svg>
  );
}
