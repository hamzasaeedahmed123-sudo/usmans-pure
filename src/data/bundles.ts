export interface BundleIncludedItem {
  name: string;
  size: string;
  role: string;
  desc: string;
  image?: string;
}

export interface BundleSynergyStep {
  time: string;
  title: string;
  instruction: string;
}

export interface BundleAccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface LuxuryBundle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  price: number;
  originalPrice: number;
  savings: number;
  image: string;
  tint: string;
  includedTags: string[];
  description: string;
  whatsInTheBox: BundleIncludedItem[];
  synergy: {
    headline: string;
    description: string;
    routineSteps: BundleSynergyStep[];
  };
  accordions: BundleAccordionItem[];
}

export const LUXURY_BUNDLES: LuxuryBundle[] = [
  {
    id: "bundle-1",
    slug: "fat-loss-transformation-combo",
    title: "Purity Starter Bundle",
    subtitle: "Cold-Ground Multi-Seed Chakki Flour + Pure Lemongrass Herbal Tea",
    tagline: "Natural metabolic stimulation with zero starvation and zero sugar crashes.",
    badge: "Most Popular • Save ₨700",
    price: 2050,
    originalPrice: 2750,
    savings: 700,
    image: "/images/products/prod-3.jpg",
    tint: "bg-[#F1E8DA]",
    includedTags: ["5kg Fat2Fuel Atta", "50g Lemongrass Tea", "Personalized Meal Guide"],
    description:
      "Our flagship metabolic routine. By swapping standard commercial refined wheat flour for Fat2Fuel (cold-milled barley, oats, chia, and chickpeas) and drinking pure lemongrass herbal tea twice daily, your body stays satiated for hours while naturally detoxifying and supporting metabolism.",
    whatsInTheBox: [
      {
        name: "Fat2Fuel Advance Multigrain Flour",
        size: "5kg Family Zip-Lock Pack",
        role: "Primary Daily Carbohydrate",
        desc: "Excellent multigrain flour for weight loss and fitness maintenance. Boosts metabolism and helps convert body fat into energy to keep you active.",
        image: "/images/products/prod-3.jpg",
      },
      {
        name: "Lemongrass Herbal Tea",
        size: "50g UV-Shielded Aroma Pouch",
        role: "Metabolism & Detoxification",
        desc: "A refreshing herbal tea that improves digestion and boosts immunity. Detoxifies the body naturally and provides a refreshing sensation.",
        image: "/images/products/prod-7.jpg",
      },
      {
        name: "Ghar Ka Roti & Hydration Schedule",
        size: "Printed Booklet + Digital PDF",
        role: "Actionable Daily Routine",
        desc: "Step-by-step guidance on meal timing, water intake, and proper dough hydration for soft, pliable multigrain rotis.",
      },
    ],
    synergy: {
      headline: "How It Works Together: The Dual Metabolic Strategy",
      description:
        "Weight loss succeeds when meals provide sustained satiety. Fat2Fuel flour provides complex carbs to control hunger, while refreshing lemongrass tea aids digestion, promotes detoxification, and keeps you feeling light throughout the day.",
      routineSteps: [
        {
          time: "Morning (7:30 AM — Breakfast)",
          title: "Warm Fat2Fuel Roti with Healthy Sides",
          instruction:
            "Make 1 to 2 rotis with Fat2Fuel flour. The high fiber suppresses hunger until past lunch.",
        },
        {
          time: "Mid-Day (1:30 PM — Post-Lunch)",
          title: "First Cup of Fresh Lemongrass Tea",
          instruction:
            "Brew 1 tsp Lemongrass tea in hot water for 5 minutes. Drink 20 minutes after lunch to stimulate digestion and detoxify.",
        },
        {
          time: "Evening (7:00 PM — Dinner)",
          title: "Light Multigrain Dinner + Second Cup Herbal Tea",
          instruction:
            "Eat 1 fresh roti with vegetable sabzi or lentils. Sip a warm cup of lemongrass tea to prevent evening bloating.",
        },
      ],
    },
    accordions: [
      {
        id: "nutrition",
        title: "Nutritional Composition (Per 100g Flour / Serving)",
        content:
          "Energy: 345 kcal • Dietary Fiber: 18.2g (55% Daily Value) • Plant Protein: 14.8g • Net Carbs: 48g • Glycemic Index: 44 • Potassium: 420mg • Zero Added Sodium • Zero Bleaching Chemicals.",
      },
      {
        id: "purity",
        title: "Laboratory Tested & Verified Purity Guarantee",
        content:
          "Certified zero heavy metals. Zero benzoyl peroxide, zero potassium bromate, zero chemical preservatives. Freshly stone-milled in traditional chakki upon order confirmation.",
      },
      {
        id: "brewing",
        title: "Dough Kneading & Tea Preparation Wisdom",
        content:
          "For soft multigrain rotis: Knead with lukewarm water and let dough rest for 15 minutes before rolling. For tea: Steep 1 teaspoon of lemongrass tea in boiled water for 5 minutes.",
      },
    ],
  },
  {
    id: "bundle-2",
    slug: "diabetic-care-heart-health-pack",
    title: "Diabetic Family Flour Kit",
    subtitle: "FENUGREEK Plus Low-GI Chakki Flour + Pure Barley (Jau) Flour",
    tagline: "Wholesome whole-grain synergy rich in dietary fiber and natural diabetic care.",
    badge: "Dietary Care • Save ₨650",
    price: 1850,
    originalPrice: 2500,
    savings: 650,
    image: "/images/products/prod-4.png",
    tint: "bg-[#E9ECDF]",
    includedTags: ["5kg FENUGREEK Plus Atta", "5kg Barley Flour", "Glycemic Food Tracker"],
    description:
      "Formulated for households seeking high-fiber, slow-digesting whole grain staples. Cold-ground whole wheat blended with fenugreek seeds, paired with 100% pure barley flour with cooling properties for cholesterol control and heart health.",
    whatsInTheBox: [
      {
        name: "FENUGREEK Plus – Flour for Good Diabetic Control",
        size: "5kg Vacuum-Sealed Saver Pack",
        role: "Glycemic Stabilizer",
        desc: "Specially formulated for diabetic patients. Contains natural ingredients that help control blood sugar levels and promote a healthy lifestyle.",
        image: "/images/products/prod-4.png",
      },
      {
        name: "Pure Barley (Jau) Flour",
        size: "5kg Pack",
        role: "Cholesterol & Heart Health",
        desc: "100% pure barley flour with cooling properties and countless benefits. An excellent option for controlling cholesterol and improving heart health.",
        image: "/images/products/prod-5.jpg",
      },
      {
        name: "Low-GI Food Chart & Glycemic Tracker",
        size: "Pocket Reference Card",
        role: "Patient Self-Monitoring",
        desc: "Clear breakdown of local Pakistani food glycemic indices to eliminate hidden sugars and glucose spikes.",
      },
    ],
    synergy: {
      headline: "How It Works Together: Dual-Action Glycemic & Heart Guard",
      description:
        "The natural ingredients in FENUGREEK Plus slow carbohydrate absorption and help regulate blood sugar levels, while Pure Barley flour lowers cholesterol and promotes cardiac health.",
      routineSteps: [
        {
          time: "Breakfast & Lunch Meals",
          title: "Daily FENUGREEK Plus Rotis",
          instruction:
            "Replace ordinary refined flour rotis. The rotis are soft, pliable, and taste pleasantly earthy with zero bitter aftertaste.",
        },
        {
          time: "Dinner or Alternative Days",
          title: "Pure Barley Flour Rotis or Porridge",
          instruction:
            "Enjoy cooling barley rotis for dinner or prepared as traditional talbina for easy evening digestion and heart health.",
        },
      ],
    },
    accordions: [
      {
        id: "nutrition",
        title: "Clinical Glycemic & Mineral Analysis",
        content:
          "Low Glycemic Index • High Soluble Fiber • Zero Cholesterol • High Natural Magnesium for cellular insulin uptake.",
      },
      {
        id: "purity",
        title: "Purity & Zero-Chemical Certification",
        content:
          "Lab-tested free of synthetic additives, heavy metals, or industrial fillers. Natural whole grains sourced directly from registered pesticide-monitored Punjab farms.",
      },
    ],
  },
  {
    id: "bundle-3",
    slug: "family-immunity-vitality-pack",
    title: "Family Immunity & Vitality Pack",
    subtitle: "Basic Flour (5kg) + Whole Wheat Chakki Atta (10kg) + Chamomile Tea (50g)",
    tagline: "Pure daily nutrition for the family's health and restorative sleep.",
    badge: "Family Size • Save ₨800",
    price: 2800,
    originalPrice: 3600,
    savings: 800,
    image: "/images/products/prod-5.jpg",
    tint: "bg-[#F3E3DA]",
    includedTags: ["5kg Basic Health Atta", "10kg Whole Wheat Atta", "50g Chamomile Tea"],
    description:
      "Ghar ke har fard ke liye mukammal mahana pack. Basic Flour aur Whole Wheat Chakki Atta rozana ki ghiza ke liye, aur pur-sukoon neend ke liye qudrati chamomile kehwa.",
    whatsInTheBox: [
      {
        name: "Basic – Flour For General Health",
        size: "5kg Daily Household Pack",
        role: "Everyday Wholesome Roti",
        desc: "100% pure and natural everyday flour. Rich in fiber and essential nutrients for better digestion and all-day energy. Free from artificial chemicals.",
        image: "/images/products/prod-1.jpg",
      },
      {
        name: "Whole Wheat Chakki Atta",
        size: "10kg Traditional Pack",
        role: "Stone-Ground Whole Grain",
        desc: "Pure stone-ground whole wheat flour retaining the grain's original nutrition and fiber. Makes soft rotis and keeps you feeling full all day.",
        image: "/images/products/prod-6.jpg",
      },
      {
        name: "Chamomile Tea",
        size: "50g Aroma Lock Pouch",
        role: "Deep Rest & Relaxation",
        desc: "The perfect herbal tea for restful sleep and stress relief. A cup before bedtime relaxes the body and eliminates fatigue.",
        image: "/images/products/prod-2.jpg",
      },
    ],
    synergy: {
      headline: "How It Works Together: All-Day Vitality & Night Rest",
      description:
        "Family members enjoy wholesome fiber-rich digestion all day from stone-ground whole grains, capped by soothing chamomile tea that gently relaxes the body and mind before bedtime.",
      routineSteps: [
        {
          time: "Morning & Lunch",
          title: "Fresh Whole Wheat Chakki Rotis",
          instruction:
            "Make soft rotis retaining all natural bran and germ for sustained energy throughout work and school.",
        },
        {
          time: "Night (30 Minutes Before Bed)",
          title: "Chamomile Calming Cup",
          instruction:
            "Steep 1 teaspoon of chamomile in warm water for 5 minutes. Naturally caffeine-free and promotes gentle, deep sleep.",
        },
      ],
    },
    accordions: [
      {
        id: "nutrition",
        title: "Family Mineral & Vitamin Profile",
        content:
          "High dietary calcium for bone density • Bioavailable iron for hemoglobin • Rich in natural B-vitamins and magnesium • Naturally caffeine-free chamomile.",
      },
      {
        id: "purity",
        title: "Zero-Chemical Assurance",
        content:
          "Milled on traditional low-temperature chakkis under 40°C. Never exposed to steel roller friction or chemical bleaching. Wholesome food as nature intended.",
      },
    ],
  },
];

export function getBundleBySlug(slug: string): LuxuryBundle | undefined {
  return LUXURY_BUNDLES.find((b) => b.slug === slug);
}
