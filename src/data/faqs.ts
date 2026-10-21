export interface FaqItem {
  id: number;
  category: "flours" | "clinical" | "spices" | "sourcing" | "orders";
  categoryLabel: string;
  q: string;
  a: string;
}

export const FAQS_DATA: FaqItem[] = [
  // Category: Stone Chakki & Flours
  {
    id: 1,
    category: "flours",
    categoryLabel: "Stone Chakki & Flours",
    q: "How does your traditional stone chakki differ from commercial roller flour mills?",
    a: "Commercial roller mills operate at high speeds (>90°C), burning away delicate wheat germ oils, bran fiber, and vital micronutrients. Our traditional heavy stone chakkis rotate slowly at strictly under 40°C, preserving 100% live enzymes, vitamin E, and natural dietary fiber.",
  },
  {
    id: 2,
    category: "flours",
    categoryLabel: "Stone Chakki & Flours",
    q: "Do you mix maida (white refined flour) or bran fillers in your chakki atta?",
    a: "Absolutely zero. We guarantee 100% pure whole wheat. No maida, no bran stripping, and no chemical bleaching agents like benzoyl peroxide or chlorine dioxide.",
  },
  {
    id: 3,
    category: "flours",
    categoryLabel: "Stone Chakki & Flours",
    q: "How long does freshly stone-ground chakki flour stay fresh?",
    a: "Because our flour contains live wheat germ with natural, cold-preserved oils and zero synthetic preservatives, we recommend consuming it within 30 to 45 days. Store in a cool, dry place in an airtight container.",
  },
  {
    id: 4,
    category: "flours",
    categoryLabel: "Stone Chakki & Flours",
    q: "Why are rotis made with your whole grain flour slightly darker in color?",
    a: "Commercial flour uses chemical bleaching to look artificially white. Natural unbleached stone-ground wheat retains the dark outer bran and germ layers, resulting in a healthy, rich golden-brown wholesome roti with superior aroma.",
  },
  {
    id: 5,
    category: "flours",
    categoryLabel: "Stone Chakki & Flours",
    q: "Is your flour easy to knead and roll into soft rotis?",
    a: "Yes. Because of the fine stone-grinding process, simply knead with lukewarm water, let the dough rest for 10–15 minutes, and your rotis will remain remarkably soft, pliable, and puffy throughout the day.",
  },

  // Category: Clinical Wellness & Doctor's Choice
  {
    id: 6,
    category: "clinical",
    categoryLabel: "Clinical Wellness",
    q: "Can non-diabetic family members safely eat FENUGREEK Plus flour?",
    a: "Yes, absolutely. FENUGREEK Plus is a wholesome multi-grain flour infused with organic methi seeds and soluble galactomannan fiber. It supports healthy digestion and prevents sluggish sugar crashes in anyone, making it a great daily staple for the entire family.",
  },
  {
    id: 7,
    category: "clinical",
    categoryLabel: "Clinical Wellness",
    q: "How does Fat2Fuel Multigrain Flour help with weight management?",
    a: "It blends roasted barley, whole oats, chickpeas, flaxseed, and chia seeds. With a very low glycemic index (<50) and 18g dietary fiber per 100g, it blunts insulin spikes and prolongs feelings of fullness for over 5 hours, curbing unnecessary cravings naturally.",
  },
  {
    id: 8,
    category: "clinical",
    categoryLabel: "Clinical Wellness",
    q: "How quickly can I expect results with Fat2Fuel or Diabetic flours?",
    a: "Many customers notice lighter digestion and reduced post-meal lethargy within 3 to 5 days. For blood sugar stabilization (lower post-prandial spikes) and metabolic weight shifts, consistent use for 2 to 3 weeks yields visible, documented improvements.",
  },
  {
    id: 9,
    category: "clinical",
    categoryLabel: "Clinical Wellness",
    q: "Is Olive Leaf Tea safe for people on blood pressure medication?",
    a: "Olive leaf naturally contains oleuropein, which supports healthy arterial dilation. While safe as a whole-food beverage, we advise consulting your doctor if you take clinical antihypertensives, as natural pressure improvements may allow medication adjustments under physician supervision.",
  },
  {
    id: 10,
    category: "clinical",
    categoryLabel: "Clinical Wellness",
    q: "What makes your Lakadong Turmeric different from market haldi?",
    a: "Standard commercial turmeric contains only 2% to 3% curcumin and is often mixed with starch or lead chromate dye. Our single-origin Lakadong rhizomes are lab-verified to contain over 7% active bio-available curcumin, cold-pounded without friction heat.",
  },

  // Category: Spices, Teas & Storage
  {
    id: 11,
    category: "spices",
    categoryLabel: "Spices & Teas",
    q: "Why do you cold-pound spices instead of modern pulverizing?",
    a: "High-velocity pulverizers generate excessive heat that vaporizes the volatile essential oils that give spices their deep aroma and therapeutic properties. Slow cold-pounding retains maximum essential aroma and authentic pungency.",
  },
  {
    id: 12,
    category: "spices",
    categoryLabel: "Spices & Teas",
    q: "Are there added colors or preservatives in your Kashmiri Chili Powder?",
    a: "Never. Our Kashmiri chili powder is 100% pure sun-dried whole pods stone-ground without Sudan dyes, artificial food colors, or added salt.",
  },
  {
    id: 13,
    category: "spices",
    categoryLabel: "Spices & Teas",
    q: "How should I prepare and brew Rosella Ruby & Chamomile Tea?",
    a: "Steep 1 teaspoon of whole dried blossoms or leaves in 90°C hot water for 4–5 minutes in a covered cup. Strain and sip warm, or chill with a slice of lemon for a refreshing iced antioxidant drink.",
  },
  {
    id: 14,
    category: "spices",
    categoryLabel: "Spices & Teas",
    q: "How are your herbal teas packaged to prevent moisture damage?",
    a: "All herbal teas and infusions are packed in UV-shielded, moisture-barrier food-grade amber jars or multi-layer sealed kraft pouches with resealable zip-locks.",
  },

  // Category: Sourcing, Purity & Verification
  {
    id: 15,
    category: "sourcing",
    categoryLabel: "Sourcing & Purity",
    q: "Where do you source your grains and botanicals?",
    a: "We partner directly with smallholder certified farms across Punjab, Khyber Pakhtunkhwa, and high-altitude regions that follow regenerative, pesticide-conscious, and natural farming traditions.",
  },
  {
    id: 16,
    category: "sourcing",
    categoryLabel: "Sourcing & Purity",
    q: "Do you perform third-party lab testing for purity?",
    a: "Yes, every seasonal batch undergoes rigorous independent lab analysis to verify zero adulterants, zero heavy metals, and zero artificial coloring agents.",
  },

  // Category: Orders, Shipping & Guarantees
  {
    id: 17,
    category: "orders",
    categoryLabel: "Orders & Delivery",
    q: "Do you offer Cash on Delivery (COD) across Pakistan?",
    a: "Yes, we provide reliable Cash on Delivery service to all major cities, towns, and postal areas across Pakistan.",
  },
  {
    id: 18,
    category: "orders",
    categoryLabel: "Orders & Delivery",
    q: "What is your typical delivery timeframe?",
    a: "Orders are freshly milled and dispatched within 24 hours. Delivery takes 2 to 3 business days for major metropolitan areas (Karachi, Lahore, Islamabad/Rawalpindi) and 3 to 5 days for other regions.",
  },
  {
    id: 19,
    category: "orders",
    categoryLabel: "Orders & Delivery",
    q: "What is your 14-Day Money Back Guarantee?",
    a: "If you are genuinely dissatisfied with the aroma, freshness, or texture of our products, contact our support desk within 14 days of receiving your order for an immediate hassle-free replacement or refund.",
  },
  {
    id: 20,
    category: "orders",
    categoryLabel: "Orders & Delivery",
    q: "Can I speak directly with your team before placing an order?",
    a: "Yes, you can click our WhatsApp button anytime to discuss your specific dietary preferences, flour recommendations, or family order requirements with our team for free.",
  },
];
