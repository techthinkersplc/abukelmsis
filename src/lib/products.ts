import p1 from "@/assets/product-01.jpg";
import p2 from "@/assets/product-02.jpg";
import p3 from "@/assets/product-03.jpg";
import p4 from "@/assets/product-04.jpg";
import p5 from "@/assets/product-05.jpg";
import p6 from "@/assets/product-06.jpg";
import p7 from "@/assets/product-07.jpg";
import p8 from "@/assets/product-08.jpg";
import p9 from "@/assets/product-09.jpg";
import gabi1 from "@/assets/gabi-01.jpg";
import gabi2 from "@/assets/gabi-02.jpg";
import gabi3 from "@/assets/gabi-03.jpg";
import gabi4 from "@/assets/gabi-04.jpg";
import gabi5 from "@/assets/gabi-05.jpg";

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
    id: "item-01",
    name: "Item 1",
    category: "የራሺያ ሥእሎች",
    price: 1500,
    stock: 10,
    image: p1,
    description: "መንፈሳዊ ሥዕል — handcrafted spiritual scroll icon.",
  },
  {
    id: "item-02",
    name: "Item 2",
    category: "የራሺያ ሥእሎች",
    price: 1400,
    stock: 10,
    image: p2,
    description: "መንፈሳዊ ሥዕል — handcrafted spiritual scroll icon.",
  },
  {
    id: "item-03",
    name: "Item 3",
    category: "የራሺያ ሥእሎች",
    price: 1600,
    stock: 8,
    image: p3,
    description: "መንፈሳዊ ሥዕል — handcrafted spiritual scroll icon.",
  },
  {
    id: "item-04",
    name: "Item 4",
    category: "Crosses",
    price: 900,
    stock: 12,
    image: p4,
    description: "ባህላዊ መስቀል — traditional wooden cross.",
  },
  {
    id: "item-05",
    name: "Item 5",
    category: "Crosses",
    price: 2200,
    stock: 6,
    image: p5,
    description: "ባለ ቅርጽ መስቀል — ornate standing crucifix.",
  },
  {
    id: "item-06",
    name: "Item 6",
    category: "Books",
    price: 2500,
    stock: 5,
    image: p6,
    description: "መጽሐፍ ቅዱስ — engraved wooden bible set.",
  },
  {
    id: "item-07",
    name: "Item 7",
    category: "Books",
    price: 2300,
    stock: 5,
    image: p7,
    description: "መጽሐፍ ቅዱስ — engraved wooden bible.",
  },
  {
    id: "item-08",
    name: "Item 8",
    category: "Books",
    price: 2400,
    stock: 5,
    image: p8,
    description: "መጽሐፍ ቅዱስ — engraved wooden bible.",
  },
  {
    id: "item-09",
    name: "Item 9",
    category: "Gift Sets",
    price: 3500,
    stock: 4,
    image: p9,
    description: "የበዓል ሥጦታ — curated gift set with bag.",
  },
  {
    id: "item-10",
    name: "Item 10",
    category: "Gift Sets",
    price: 3200,
    stock: 4,
    image: p6,
    description: "የበዓል ሥጦታ — curated gift set.",
  },
  {
    id: "gabi-01",
    name: "ጋቢ ነጠላ — Tibeb Multicolor",
    category: "Gabi Netela",
    price: 3200,
    stock: 5,
    image: gabi1,
    description: "ጋቢ ነጠላ — handwoven cotton netela with vibrant multicolor tibeb border.",
  },
  {
    id: "gabi-02",
    name: "ጋቢ ነጠላ — White Tibeb",
    category: "Gabi Netela",
    price: 2900,
    stock: 5,
    image: gabi2,
    description: "ጋቢ ነጠላ — pure white handwoven netela with delicate white tibeb pattern.",
  },
  {
    id: "gabi-03",
    name: "ጋቢ ነጠላ — Gold Cross",
    category: "Gabi Netela",
    price: 3400,
    stock: 4,
    image: gabi3,
    description: "ጋቢ ነጠላ — white netela with gold embroidered cross motif border.",
  },
  {
    id: "gabi-04",
    name: "ጋቢ ነጠላ — Rainbow Tibeb",
    category: "Gabi Netela",
    price: 3300,
    stock: 4,
    image: gabi4,
    description: "ጋቢ ነጠላ — handwoven netela with rainbow tibeb diamond pattern.",
  },
  {
    id: "gabi-05",
    name: "ጋቢ ነጠላ — Green Border",
    category: "Gabi Netela",
    price: 2800,
    stock: 6,
    image: gabi5,
    description: "ጋቢ ነጠላ — soft white netela with bright green tibeb border.",
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(n);
