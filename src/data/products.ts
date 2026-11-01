export interface Product {
  id: string;
  title: string;
  category: "flours" | "teas";
  categoryLabel: string;
  price: number;
  originalPrice: number;
  priceFormatted: string;
  originalPriceFormatted: string;
  discountBadge: string;
  image: string;
  images?: string[];
  link: string;
  rating: number;
  reviewCount: number;
  weight: string;
  tagline: string;
  description: string;
  benefits: string[];
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  // 1. FLOURS (Atta) - 5 products
  {
    id: "prod-1",
    title: "Basic – Flour For General Health",
    category: "flours",
    categoryLabel: "Stone-Ground Chakki Flour",
    price: 1200,
    originalPrice: 1500,
    priceFormatted: "₨1,200",
    originalPriceFormatted: "₨1,500",
    discountBadge: "Save 20%",
    image: "/images/products/prod-1.jpg",
    images: [
      "/images/products/prod-1.jpg",
      "/images/products/prod-1-field.jpg",
    ],
    link: "https://usmanzpure.com/product/flour-basic/",
    rating: 4.9,
    reviewCount: 48,
    weight: "5kg",
    tagline: "100% pure and natural everyday flour for daily family health",
    description:
      "100% pure and natural everyday flour. Rich in fiber and essential nutrients for better digestion and all-day energy. Free from artificial chemicals.",
    benefits: [
      "Improves digestion",
      "Provides natural energy",
      "Best for daily family health",
    ],
    inStock: true,
  },
  {
    id: "prod-4",
    title: "FENUGREEK Plus – Flour for Good Diabetic Control",
    category: "flours",
    categoryLabel: "Specialized Diabetic Flour",
    price: 1200,
    originalPrice: 1500,
    priceFormatted: "₨1,200",
    originalPriceFormatted: "₨1,500",
    discountBadge: "Dietary Care • Save 20%",
    image: "/images/products/prod-4.jpg",
    images: [
      "/images/products/prod-4.jpg",
      "/images/products/prod-4-kitchen.jpg",
    ],
    link: "https://usmanzpure.com/product/flour-fenugreek/",
    rating: 4.9,
    reviewCount: 97,
    weight: "5kg",
    tagline: "Specially formulated natural ingredients for healthy diabetic control",
    description:
      "Specially formulated for diabetic patients. Contains natural ingredients that help control blood sugar levels and promote a healthy lifestyle.",
    benefits: [
      "Regulates blood sugar",
      "High in protein",
      "A complete diet for diabetics",
    ],
    inStock: true,
  },
  {
    id: "prod-3",
    title: "Fat2Fuel Advance Multigrain Flour",
    category: "flours",
    categoryLabel: "Diet & Fitness Flour",
    price: 1150,
    originalPrice: 1500,
    priceFormatted: "₨1,150",
    originalPriceFormatted: "₨1,500",
    discountBadge: "Best Seller • Save 23%",
    image: "/images/products/prod-3.jpg",
    images: [
      "/images/products/prod-3.jpg",
      "/images/products/prod-3-stone.jpg",
    ],
    link: "https://usmanzpure.com/product/flour-weight-loss/",
    rating: 5.0,
    reviewCount: 112,
    weight: "5kg",
    tagline: "Excellent multigrain flour for weight loss and fitness maintenance",
    description:
      "Excellent multigrain flour for weight loss and fitness maintenance. Boosts metabolism and helps convert body fat into energy to keep you active.",
    benefits: [
      "Aids in weight loss",
      "Provides complex carbs to control hunger",
    ],
    inStock: true,
  },
  {
    id: "prod-5",
    title: "Pure Barley (Jau) Flour",
    category: "flours",
    categoryLabel: "Pure Grain Flour",
    price: 1100,
    originalPrice: 1400,
    priceFormatted: "₨1,100",
    originalPriceFormatted: "₨1,400",
    discountBadge: "Heart Care • Save 21%",
    image: "/images/products/prod-5.jpg",
    link: "https://usmanzpure.com/product/pure-barley-flour/",
    rating: 4.9,
    reviewCount: 56,
    weight: "5kg",
    tagline: "100% pure barley flour with cooling properties and heart benefits",
    description:
      "100% pure barley flour with cooling properties and countless benefits. An excellent option for controlling cholesterol, improving heart health, and natural weight management.",
    benefits: [
      "Heart-friendly",
      "Lowers cholesterol",
      "Very easy to digest",
    ],
    inStock: true,
  },
  {
    id: "prod-6",
    title: "Whole Wheat Chakki Atta",
    category: "flours",
    categoryLabel: "Stone-Ground Chakki Flour",
    price: 1350,
    originalPrice: 1650,
    priceFormatted: "₨1,350",
    originalPriceFormatted: "₨1,650",
    discountBadge: "Whole Grain • Save 18%",
    image: "/images/products/prod-6.jpg",
    link: "https://usmanzpure.com/product/whole-wheat-chakki-atta/",
    rating: 4.9,
    reviewCount: 71,
    weight: "10kg",
    tagline: "Pure stone-ground whole wheat flour retaining original nutrition and fiber",
    description:
      "Pure stone-ground whole wheat flour retaining the grain's original nutrition and fiber. Makes soft rotis and keeps you feeling full all day.",
    benefits: [
      "100% whole grain",
      "Rich in vitamins and minerals",
      "Perfect for soft rotis",
    ],
    inStock: true,
  },

  // 2. HERBAL TEAS - 3 products
  {
    id: "prod-2",
    title: "Chamomile Tea",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 800,
    originalPrice: 1000,
    priceFormatted: "₨800",
    originalPriceFormatted: "₨1,000",
    discountBadge: "Save 20%",
    image: "/images/products/prod-2.jpg",
    link: "https://usmanzpure.com/product/chamomile-tea/",
    rating: 5.0,
    reviewCount: 64,
    weight: "50g",
    tagline: "The perfect herbal tea for restful sleep and stress relief",
    description:
      "The perfect herbal tea for restful sleep and stress relief. A cup before bedtime relaxes the body and eliminates fatigue.",
    benefits: [
      "Improves sleep quality",
      "Caffeine-free",
      "Calms the mind",
    ],
    inStock: true,
  },
  {
    id: "prod-7",
    title: "Lemongrass Herbal Tea",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 750,
    originalPrice: 950,
    priceFormatted: "₨750",
    originalPriceFormatted: "₨950",
    discountBadge: "Save 21%",
    image: "/images/products/prod-7.jpg",
    link: "https://usmanzpure.com/product/lemongrass-tea/",
    rating: 4.9,
    reviewCount: 52,
    weight: "50g",
    tagline: "Refreshing herbal tea to improve digestion and boost immunity",
    description:
      "A refreshing herbal tea that improves digestion and boosts immunity. Detoxifies the body naturally and provides a refreshing sensation.",
    benefits: [
      "Detoxifies the body",
      "Boosts immunity",
      "Natural refreshing aroma",
    ],
    inStock: true,
  },
  {
    id: "prod-8",
    title: "Moringa Herbal Tea",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 850,
    originalPrice: 1100,
    priceFormatted: "₨850",
    originalPriceFormatted: "₨1,100",
    discountBadge: "Superfood • Save 23%",
    image: "/images/products/prod-8.jpg",
    link: "https://usmanzpure.com/product/moringa-tea/",
    rating: 5.0,
    reviewCount: 68,
    weight: "50g",
    tagline: "Pure tea made from superfood moringa leaves rich in antioxidants",
    description:
      "Pure tea made from superfood moringa leaves, a treasure trove of vitamins and antioxidants. Naturally increases the body's immunity and energy levels.",
    benefits: [
      "Rich in antioxidants",
      "Boosts energy",
      "Supports overall health",
    ],
    inStock: true,
  },
];

export interface BundleItem {
  id: string;
  title: string;
  badge: string;
  price: number;
  originalPrice: number;
  savings: number;
  image: string;
  includes: string[];
  description: string;
}

export const MEGA_BUNDLES: BundleItem[] = [
  {
    id: "bundle-1",
    title: "Fat Loss Transformation Combo",
    badge: "Mega Value • Save ₨700",
    price: 2050,
    originalPrice: 2750,
    savings: 700,
    image: "/images/products/prod-3.jpg",
    includes: [
      "Fat2Fuel Advance Multigrain Flour (5kg)",
      "Lemongrass Herbal Tea (50g)",
      "Complimentary Diet & Meal Schedule",
    ],
    description:
      "Ghar ke wazan kam karne walon ke liye behtareen jorha. Bazaar ke maiday walay aate ki jagah Fat2Fuel ka istemal karein aur rozana Lemongrass kehwa pi kar taaza-dam rahein.",
  },
  {
    id: "bundle-2",
    title: "Diabetic Care & Heart Health Pack",
    badge: "Dietary Care • Save ₨650",
    price: 1850,
    originalPrice: 2500,
    savings: 650,
    image: "/images/products/prod-4.jpg",
    includes: [
      "FENUGREEK Plus Diabetic Flour (5kg)",
      "Pure Barley (Jau) Flour (5kg)",
      "Diabetic Glycemic Guide",
    ],
    description:
      "A wholesome pairing of slow-digesting stone-ground fenugreek flour and pure barley flour rich in natural fiber and heart-healthy nutrients.",
  },
  {
    id: "bundle-3",
    title: "Family Immunity & Vitality Pack",
    badge: "Family Size • Save ₨800",
    price: 2800,
    originalPrice: 3600,
    savings: 800,
    image: "/images/products/prod-5.jpg",
    includes: [
      "Basic Flour For General Health (5kg)",
      "Whole Wheat Chakki Atta (10kg)",
      "Chamomile Night Calming Tea (50g)",
    ],
    description:
      "Complete monthly wellness for the entire family. High mineral stone-ground rotis for everyday energy, plus soothing chamomile tea for peaceful sleep.",
  },
];
