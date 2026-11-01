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
    categoryLabel: "Pure Chakki Flour",
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
    title: "Giggly Grains - Multigrain Blend",
    category: "flours",
    categoryLabel: "Kids Nutrition & Immunity Flour",
    price: 1100,
    originalPrice: 1400,
    priceFormatted: "₨1,100",
    originalPriceFormatted: "₨1,400",
    discountBadge: "Kids Nutrition • Save 21%",
    image: "/images/products/prod-5.jpg",
    images: [
      "/images/products/prod-5.jpg",
      "/images/products/prod-5-porridge.jpg",
    ],
    link: "https://usmanzpure.com/product/giggly-grains/",
    rating: 4.9,
    reviewCount: 56,
    weight: "2 lbs (900g)",
    tagline: "Immunity Boost for Kids (Rich in Fiber & Nutrients)",
    description:
      "A wholesome multigrain blend specially formulated for kids' healthy growth and strong immunity. Rich in dietary fiber, natural calcium, and essential nutrients to keep young ones energized all day without any artificial additives or preservatives.",
    benefits: [
      "Immunity boost for kids",
      "Rich in natural fiber and vitamins",
      "Easy to digest for growing children",
    ],
    inStock: true,
  },
  {
    id: "prod-6",
    title: "Nutra Prime - 100% Gluten Free Flour",
    category: "flours",
    categoryLabel: "100% Gluten Free Flour",
    price: 1350,
    originalPrice: 1650,
    priceFormatted: "₨1,350",
    originalPriceFormatted: "₨1,650",
    discountBadge: "Gluten Free • Save 18%",
    image: "/images/products/prod-6.jpg",
    images: ["/images/products/prod-6.jpg"],
    link: "https://usmanzpure.com/product/nutra-prime-gluten-free/",
    rating: 5.0,
    reviewCount: 71,
    weight: "2 lbs (900g)",
    tagline: "100% Gluten Free Flour (Rich in Fiber & Nutrients)",
    description:
      "Specially crafted 100% gluten-free multigrain flour packed with essential fiber, natural vitamins, and minerals. Safe and wholesome for sensitive diets, celiac care, and healthy daily digestion without any chemicals or additives.",
    benefits: [
      "100% Gluten Free",
      "Rich in fiber & nutrients",
      "Safe for sensitive diets",
    ],
    inStock: true,
  },

  // 2. HERBAL TEAS - 5 products
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
    images: ["/images/products/prod-2.jpg"],
    link: "https://usmanzpure.com/product/chamomile-tea/",
    rating: 5.0,
    reviewCount: 64,
    weight: "50g",
    tagline: "For Restful Sleep & Stress Relief",
    description:
      "Enjoy a calming cup of pure Chamomile tea. Perfect for relaxing your mind, reducing anxiety, and promoting deep, restful sleep.",
    benefits: [
      "Promotes deep, restful sleep",
      "Reduces stress & anxiety",
      "100% caffeine-free herbal infusion",
    ],
    inStock: true,
  },
  {
    id: "prod-8",
    title: "Olive Leaf Tea",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 850,
    originalPrice: 1100,
    priceFormatted: "₨850",
    originalPriceFormatted: "₨1,100",
    discountBadge: "Immunity • Save 23%",
    image: "/images/products/prod-8.jpg",
    images: ["/images/products/prod-8.jpg"],
    link: "https://usmanzpure.com/product/olive-leaf-tea/",
    rating: 4.9,
    reviewCount: 42,
    weight: "50g",
    tagline: "Immunity & Heart Health",
    description:
      "Rich in natural antioxidants, this tea supports cardiovascular health, boosts the immune system, and helps you stay active naturally.",
    benefits: [
      "Supports cardiovascular health",
      "Natural immune system booster",
      "Rich in oleuropein & antioxidants",
    ],
    inStock: true,
  },
  {
    id: "prod-9",
    title: "Oregano Tea",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 850,
    originalPrice: 1100,
    priceFormatted: "₨850",
    originalPriceFormatted: "₨1,100",
    discountBadge: "Digestive • Save 23%",
    image: "/images/products/prod-9.jpg",
    images: ["/images/products/prod-9.jpg"],
    link: "https://usmanzpure.com/product/oregano-tea/",
    rating: 4.9,
    reviewCount: 38,
    weight: "50g",
    tagline: "Digestive & Respiratory Support",
    description:
      "A traditional herbal remedy excellent for soothing digestion, clearing respiratory pathways, and providing natural antibacterial benefits.",
    benefits: [
      "Soothes digestion & bloating",
      "Clears respiratory pathways",
      "Natural antibacterial benefits",
    ],
    inStock: true,
  },
  {
    id: "prod-10",
    title: "Persian Rose Delight",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 950,
    originalPrice: 1200,
    priceFormatted: "₨950",
    originalPriceFormatted: "₨1,200",
    discountBadge: "Beauty • Save 21%",
    image: "/images/products/prod-10.jpg",
    images: ["/images/products/prod-10.jpg"],
    link: "https://usmanzpure.com/product/persian-rose-delight/",
    rating: 5.0,
    reviewCount: 57,
    weight: "50g",
    tagline: "Mood Booster & Glowing Skin",
    description:
      "A fragrant and luxurious rose tea blend that helps relieve stress, uplifts your mood, and promotes healthy, radiant skin.",
    benefits: [
      "Promotes healthy, radiant glowing skin",
      "Natural mood booster & stress reliever",
      "Luxurious floral aroma & gentle taste",
    ],
    inStock: true,
  },
  {
    id: "prod-11",
    title: "Rosella Tea",
    category: "teas",
    categoryLabel: "Pure Herbal Infusion",
    price: 850,
    originalPrice: 1100,
    priceFormatted: "₨850",
    originalPriceFormatted: "₨1,100",
    discountBadge: "Antioxidant • Save 23%",
    image: "/images/products/prod-11.jpg",
    images: ["/images/products/prod-11.jpg"],
    link: "https://usmanzpure.com/product/rosella-tea/",
    rating: 4.9,
    reviewCount: 49,
    weight: "50g",
    tagline: "Rich in Vitamin C & Antioxidants",
    description:
      "A tart and refreshing herbal drink packed with Vitamin C. Great for supporting healthy blood pressure and naturally detoxifying the body.",
    benefits: [
      "Packed with natural Vitamin C",
      "Supports healthy blood pressure",
      "Naturally detoxifying & refreshing",
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
      "Chamomile Herbal Tea (50g)",
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
      "Giggly Grains - Multigrain Blend (900g)",
      "Diabetic Glycemic Guide",
    ],
    description:
      "A wholesome pairing of slow-digesting pure milled fenugreek flour and Giggly Grains multigrain blend rich in natural fiber and immunity-boosting nutrients.",
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
      "Complete monthly wellness for the entire family. High mineral pure milled rotis for everyday energy, plus soothing chamomile tea for peaceful sleep.",
  },
];
