import bag from "@/assets/product-bag.jpg";
import scarf from "@/assets/product-scarf.jpg";
import watch from "@/assets/product-watch.jpg";
import perfume from "@/assets/product-perfume.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "bag-001",
    name: "Aurelia Leather Tote",
    category: "Bags",
    price: 420,
    stock: 8,
    image: bag,
    description:
      "Hand-finished full-grain leather tote with brass hardware and a structured silhouette.",
  },
  {
    id: "scarf-001",
    name: "Cremisi Silk Scarf",
    category: "Accessories",
    price: 145,
    stock: 14,
    image: scarf,
    description:
      "Mulberry silk scarf woven in deep burgundy with a soft hand and luminous drape.",
  },
  {
    id: "watch-001",
    name: "Solene Gold Watch",
    category: "Timepieces",
    price: 680,
    stock: 5,
    image: watch,
    description:
      "Minimalist 38mm gold-tone case paired with a hand-stitched burgundy leather strap.",
  },
  {
    id: "perfume-001",
    name: "Velluto Eau de Parfum",
    category: "Fragrance",
    price: 195,
    stock: 22,
    image: perfume,
    description:
      "Amber, oud, and rose layered into an enveloping fragrance — 50ml flacon with brass cap.",
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
