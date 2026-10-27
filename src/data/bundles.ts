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
    subtitle: "Cold-Ground Multi-Seed Chakki Flour + Whole Wild Rosella Tea",
    tagline: "Natural metabolic stimulation with zero starvation and zero sugar crashes.",
    badge: "Most Popular • Save ₨700",
    price: 2050,
    originalPrice: 2750,
    savings: 700,
    image: "/images/products/prod-3.jpg",
    tint: "bg-[#F1E8DA]",
    includedTags: ["5kg Fat2Fuel Atta", "50g Pure Rosella Tea", "Personalized Meal Guide"],
    description:
      "Our flagship metabolic routine. By swapping standard commercial refined wheat flour for Fat2Fuel (cold-milled barley, oats, chia, and chickpeas) and drinking pure wild Rosella hibiscus infusion twice daily, your body stays satiated for 5+ hours while naturally torching visceral fat.",
    whatsInTheBox: [
      {
        name: "Fat2Fuel Advance Multigrain Flour",
        size: "5kg Family Zip-Lock Pack",
        role: "Primary Daily Carbohydrate",
        desc: "Slow stone-ground under 40°C with whole barley, roasted oats, chia, and chickpeas. Zero maida, zero preservatives, low glycemic index (<50).",
        image: "/images/products/prod-3.jpg",
      },
      {
        name: "Pure Organic Rosella (Hibiscus) Herbal Tea",
        size: "50g UV-Shielded Aroma Pouch",
        role: "Metabolism Aur Taazgi",
        desc: "Whole wild-harvested shade-dried ruby calyces rich in organic anthocyanins, hibiscus acid, and vitamin C. 90% caffeine-free.",
        image: "/images/products/prod-9.jpg",
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
        "Weight loss fails when meals cause blood sugar spikes followed by insulin crashes. Fat2Fuel flour provides sustained, slow-burning complex fiber that keeps insulin flat. Rosella tea's active anthocyanins act as natural phaseolamin enzyme inhibitors, reducing carbohydrate absorption after heavy meals.",
      routineSteps: [
        {
          time: "Morning (7:30 AM — Breakfast)",
          title: "Warm Fat2Fuel Roti with Organic Eggs / Dal",
          instruction:
            "Make 1 to 2 rotis with Fat2Fuel flour. The high beta-glucan fiber suppresses ghrelin (hunger hormone) until past 1:00 PM.",
        },
        {
          time: "Mid-Day (1:30 PM — Post-Lunch)",
          title: "First Cup of Fresh Rosella Tea",
          instruction:
            "Brew 1 tsp Rosella in 200ml hot water (90°C) for 5 minutes. Drink 20 minutes after lunch to stimulate bile and support lipid breakdown.",
        },
        {
          time: "Evening (7:00 PM — Dinner)",
          title: "Light Multigrain Dinner + Second Cup Rosella",
          instruction:
            "Eat 1 fresh roti with vegetable sabzi or lean chicken. Sip a chilled or warm glass of unsweetened Rosella tea to prevent night bloating.",
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
        title: "90% Laboratory Tested & Verified Purity Guarantee",
        content:
          "Certified zero heavy metals (Lead 0.0 ppm, Arsenic 0.0 ppm). Zero benzoyl peroxide, zero potassium bromate, zero calcium propionate preservatives. Freshly stone-milled in traditional chakki upon order confirmation.",
      },
      {
        id: "brewing",
        title: "Dough Kneading & Tea Preparation Wisdom",
        content:
          "For soft multigrain rotis: Knead with lukewarm water and let dough rest for 15 minutes before rolling. For tea: Steep 1 teaspoon of whole dried Rosella petals in boiled water for 5 minutes. No milk required; can be sweetened with raw mountain honey.",
      },
    ],
  },
  {
    id: "bundle-2",
    slug: "diabetic-care-heart-health-pack",
    title: "Diabetic Family Flour Kit",
    subtitle: "FENUGREEK Plus Low-GI Chakki Flour + Organic Olive Leaf Tea",
    tagline: "Clinical botanical synergy to maintain healthy HbA1c and clear arterial vitality.",
    badge: "Doctor Recommended • Save ₨650",
    price: 1850,
    originalPrice: 2500,
    savings: 650,
    image: "/images/products/prod-4.png",
    tint: "bg-[#E9ECDF]",
    includedTags: ["5kg FENUGREEK Plus Atta", "50g Olive Leaf Tea", "Glycemic Food Tracker"],
    description:
      "Formulated specifically for individuals managing pre-diabetes, Type-2 diabetes, and cardiovascular wellness. Cold-ground whole wheat blended with sprouted fenugreek, roasted barley, and cold-pressed flaxseed, paired with Mediterranean olive leaf tea loaded with heart-protective oleuropein.",
    whatsInTheBox: [
      {
        name: "FENUGREEK Plus Diabetic-Care Flour",
        size: "5kg Vacuum-Sealed Saver Pack",
        role: "Glycemic Stabilizer",
        desc: "Enriched with 4-hydroxyisoleucine from sprouted fenugreek to stimulate natural insulin sensitivity. Milled under 40°C.",
        image: "/images/products/prod-4.png",
      },
      {
        name: "Pure Organic Olive Leaf Herbal Infusion",
        size: "50g UV-Shielded Aroma Pouch",
        role: "Arterial Health & Blood Pressure",
        desc: "Whole shade-dried young olive leaves containing 20%+ active oleuropein polyphenol to promote healthy vascular flexibility.",
        image: "/images/products/prod-9.jpg",
      },
      {
        name: "Low-GI Food Chart & Glycemic Tracker",
        size: "Pocket Reference Card",
        role: "Patient Self-Monitoring",
        desc: "Clear breakdown of local Pakistani food glycemic indices to eliminate hidden sugars and glucose spikes.",
      },
    ],
    synergy: {
      headline: "How It Works Together: Dual-Action Glycemic Guard",
      description:
        "The soluble galactomannan fiber in sprouted fenugreek slows gastric emptying, preventing sharp glucose absorption spikes after rotis. Concurrently, olive leaf polyphenols protect endothelial cells and support normal arterial blood pressure throughout the day.",
      routineSteps: [
        {
          time: "Breakfast & Lunch Meals",
          title: "Daily FENUGREEK Plus Rotis",
          instruction:
            "Replace ordinary refined flour rotis. The rotis are soft, pliable, and taste pleasantly earthy with zero bitter aftertaste.",
        },
        {
          time: "Mid-Afternoon (4:00 PM)",
          title: "Olive Leaf Antioxidant Cup",
          instruction:
            "Steep 1 teaspoon of whole dried olive leaves in boiling water for 6 minutes. Drink plain or with fresh lemon slice.",
        },
        {
          time: "Night (Before Sleep)",
          title: "Vascular Rest Tonic",
          instruction:
            "Drink half a cup of warm olive leaf infusion to support endothelial relaxation and steady nocturnal fasting glucose.",
        },
      ],
    },
    accordions: [
      {
        id: "nutrition",
        title: "Clinical Glycemic & Mineral Analysis",
        content:
          "Glycemic Index: 41 (Low Glycemic) • Soluble Galactomannan Fiber: 9.8g • Oleuropein Potency: >18mg/cup • Zero Cholesterol • High Natural Magnesium (185mg/100g) for cellular insulin uptake.",
      },
      {
        id: "purity",
        title: "Purity & Zero-Chemical Certification",
        content:
          "Lab-tested 90% free of synthetic antidiabetic adulterants, heavy metals, or industrial fillers. Natural whole grains sourced directly from registered pesticide-monitored Punjab farms.",
      },
      {
        id: "brewing",
        title: "Usage Wisdom & Consistency",
        content:
          "Allow 3 to 4 weeks of consistent daily usage for measurable improvements in fasting blood glucose and postprandial glucose stability. Always consult your attending physician regarding medication titration.",
      },
    ],
  },
  {
    id: "bundle-3",
    slug: "family-immunity-vitality-pack",
    title: "Family Immunity & Vitality Pack",
    subtitle: "Kids Giggly Grains Flour (5kg) + Basic Whole Wheat (5kg) + Chamomile Relax Tea",
    tagline: "Pure daily nutrition for children's growth and parents' restorative sleep.",
    badge: "Family Size • Save ₨800",
    price: 2800,
    originalPrice: 3600,
    savings: 800,
    image: "/images/products/prod-5.jpg",
    tint: "bg-[#F3E3DA]",
    includedTags: ["5kg Giggly Grains Atta", "5kg Basic Chakki Atta", "50g Chamomile Tea"],
    description:
      "Ghar ke har fard ke liye mukammal mahana pack. Bacchon ki sehat aur taaqat ke liye makhsoos multigrain atta, ghar ke dastarkhwan ke liye 90% pathar ki chakki ka khalis atta, aur pur-sukoon neend ke liye qudrati chamomile kehwa.",
    whatsInTheBox: [
      {
        name: "Giggly Grains Growing-Kids Multigrain Flour",
        size: "5kg Kid-Friendly Pouch",
        role: "Cognitive & Physical Stamina",
        desc: "Blended with roasted chickpeas, ragi (finger millet), oats, and golden wheat. Rich in natural iron, calcium, and zinc.",
        image: "/images/products/prod-5.jpg",
      },
      {
        name: "Traditional Basic Stone-Ground Chakki Atta",
        size: "5kg Daily Household Pack",
        role: "Everyday Wholesome Roti",
        desc: "90% unbleached whole wheat containing the full germ and bran. Yields exceptionally sweet, aromatic rotis that remain soft all day.",
        image: "/atta-bag.png",
      },
      {
        name: "Whole Blossom Chamomile Night Relax Tea",
        size: "50g Aroma Lock Pouch",
        role: "Deep Rest & Digestive Comfort",
        desc: "Pure shade-dried whole golden chamomile flower heads rich in natural apigenin to calm nerves and encourage deep restorative sleep.",
        image: "/images/products/prod-9.jpg",
      },
    ],
    synergy: {
      headline: "How It Works Together: All-Day Vitality & Night Rest",
      description:
        "Kids get lasting school focus from slow-release ragi and chickpea carbohydrates, avoiding hyperactivity and sugar crashes. Parents enjoy wholesome fiber-rich digestion all day, capped by soothing chamomile apigenin that gently relaxes the nervous system before bedtime.",
      routineSteps: [
        {
          time: "Morning (Breakfast)",
          title: "Giggly Grains Parathas / Rotis for Kids",
          instruction:
            "Make soft breakfast rotis with a touch of pure desi ghee. Provides steady energy for school and sports without mid-morning lethargy.",
        },
        {
          time: "Lunch & Dinner",
          title: "Family Stone-Ground Chakki Rotis",
          instruction:
            "Serve hot rotis with home-cooked lentils or meat curries. 90% whole bran ensures comfortable, easy digestion for elder family members.",
        },
        {
          time: "Night (30 Minutes Before Bed)",
          title: "Parent & Child Chamomile Calming Cup",
          instruction:
            "Steep 1 teaspoon of whole chamomile blossoms in warm water for 5 minutes. Naturally caffeine-free and promotes gentle, deep REM sleep.",
        },
      ],
    },
    accordions: [
      {
        id: "nutrition",
        title: "Family Mineral & Vitamin Profile",
        content:
          "High dietary calcium (120mg/100g) for bone density • Bioavailable iron (4.2mg/100g) for hemoglobin • Rich in natural thiamine (B1) and magnesium • 90% caffeine-free chamomile containing zero sedatives.",
      },
      {
        id: "purity",
        title: "Zero-Maida & Zero-Preservative Assurance",
        content:
          "Milled on traditional low-temperature chakkis under 40°C. Never exposed to steel roller friction or chlorine dioxide bleaching. 90% wholesome food as nature created.",
      },
      {
        id: "brewing",
        title: "Child-Safe & Family Friendly Instructions",
        content:
          "Safe for children aged 2 and up. Chamomile tea can be given to children before bed with a small teaspoon of natural raw honey to calm tummy aches and restlessness.",
      },
    ],
  },
  {
    id: "bundle-4",
    slug: "royal-organic-spice-kitchen-box",
    title: "Master Chef Spice & Tea Box",
    subtitle: "Kashmiri Chili (200g) + Lakadong Turmeric (200g) + Whole Garam Masala (150g) + Pink Salt (800g)",
    tagline: "Cold stone-pounded pure spices to restore the authentic soul of Pakistani cooking.",
    badge: "Kitchen Upgrade • Save ₨620",
    price: 2300,
    originalPrice: 2920,
    savings: 620,
    image: "/spices-jar.png",
    tint: "bg-[#F7EBE3]",
    includedTags: ["200g Kashmiri Chili", "200g Turmeric 7% Curcumin", "150g Garam Masala", "800g Pink Salt"],
    description:
      "Commercial market spices are scorched in high-speed pulverizers and routinely contaminated with artificial dyes, sawdust, and lead chromate. This royal kitchen box replaces your daily essentials with 90% pure cold-pounded spices that retain their full volatile essential oils, deep fragrance, and vibrant natural color.",
    whatsInTheBox: [
      {
        name: "Hand-Pounded Kashmiri Red Chili Jar",
        size: "200g Heavy Glass Spice Jar",
        role: "Natural Vibrant Crimson & Gentle Warmth",
        desc: "Sun-dried whole Kashmiri chilies hand-pounded at room temperature. Zero Sudan Red dye, zero added oil.",
        image: "/spices-jar.png",
      },
      {
        name: "Pure Lakadong Turmeric (7%+ Active Curcumin)",
        size: "200g Heavy Glass Spice Jar",
        role: "Immunity & Anti-Inflammatory Core",
        desc: "High-curcumin organic turmeric with a golden earthy glow. Zero chalk powder, zero lead chromate colorants.",
        image: "/spices-jar.png",
      },
      {
        name: "Royal Whole Garam Masala Hand Blend",
        size: "150g Heavy Glass Spice Jar",
        role: "Fragrant Aristocratic Aroma",
        desc: "Whole green cardamom, black cardamom, cloves, cinnamon bark, star anise, and mace, gently stone-bruised to release oils.",
        image: "/spices-jar.png",
      },
      {
        name: "Raw Himalayan Mineral Pink Rock Salt",
        size: "800g Food-Grade Zip Pouch",
        role: "Essential Trace Minerals",
        desc: "Unrefined Khewra mine crystalline salt containing 84+ natural trace minerals including iron, magnesium, and calcium.",
      },
    ],
    synergy: {
      headline: "How It Works Together: The Artisan Culinary Difference",
      description:
        "Cold-pounding retains fragile aromatic terpenes that evaporate in industrial mills. Because these spices are 90% pure without fillers or starch, you need only half the quantity compared to commercial brands to achieve richer flavor, deeper color, and real anti-inflammatory health benefits.",
      routineSteps: [
        {
          time: "Tempering (Tarka & Curries)",
          title: "Low-Temperature Oil Infusion",
          instruction:
            "Add a pinch of Royal Garam Masala and Lakadong Turmeric to warm ghee. The aroma blooms instantly without burning.",
        },
        {
          time: "Crimson Stews & Roasts",
          title: "Kashmiri Chili Color Bloom",
          instruction:
            "Use 1 teaspoon of hand-pounded Kashmiri chili for intense natural red color with gentle, aromatic heat that won't upset sensitive stomachs.",
        },
        {
          time: "Everyday Seasoning",
          title: "Pink Rock Salt Balance",
          instruction:
            "Replace industrial bleached free-flowing table salt. Provides natural electrolyte balance without synthetic anti-caking agents.",
        },
      ],
    },
    accordions: [
      {
        id: "nutrition",
        title: "Curcumin Potency & Volatile Oil Analysis",
        content:
          "Lakadong Turmeric: 7.2% active Curcumin (vs 1.8% in market brands) • Kashmiri Chili: 90% natural capsaicin with zero artificial color additive (Sudan dye negative) • Himalayan Salt: 98% pure NaCl with natural trace mineral matrix.",
      },
      {
        id: "purity",
        title: "Heavy Metal & Adulterant Screening Report",
        content:
          "Screened by independent third-party laboratory. Negative for lead chromate, negative for metanil yellow, negative for starch fillers or brick dust. Food-grade glass jar packaging.",
      },
      {
        id: "brewing",
        title: "Storage & Shelf-Life Wisdom",
        content:
          "Keep sealed tightly in provided glass jars away from direct sunlight. High natural essential oil content maintains peak culinary pungency and fragrance for up to 18 months.",
      },
    ],
  },
];

export function getBundleBySlug(slug: string): LuxuryBundle | undefined {
  return LUXURY_BUNDLES.find((b) => b.slug === slug);
}
