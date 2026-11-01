export interface FaqItem {
  id: number;
  category: "flours" | "clinical" | "teas" | "sourcing" | "orders";
  categoryLabel: string;
  q: string;
  a: string;
}

export const FAQS_DATA: FaqItem[] = [
  // Category: chakki mill & Flours
  {
    id: 1,
    category: "flours",
    categoryLabel: "chakki mill & Flours",
    q: "How does your traditional chakki mill differ from commercial roller flour mills?",
    a: "Commercial roller mills operate at high speeds (>90°C), burning away delicate wheat germ oils, bran fiber, and vital micronutrients. Our traditional heavy hygienic chakkis rotate slowly at strictly under 40°C, preserving vital live enzymes, vitamin E, and natural dietary fiber.",
  },
  {
    id: 2,
    category: "flours",
    categoryLabel: "chakki mill & Flours",
    q: "Do you mix maida (white refined flour) or bran fillers in your chakki atta?",
    a: "Absolutely zero. We guarantee 100% pure whole wheat. No maida, no bran stripping, and no chemical bleaching agents like benzoyl peroxide or chlorine dioxide.",
  },
  {
    id: 3,
    category: "flours",
    categoryLabel: "chakki mill & Flours",
    q: "How long does Freshly milled chakki flour stay fresh?",
    a: "Because our flour contains live wheat germ with natural, cold-preserved oils and zero synthetic preservatives, we recommend consuming it within 30 to 45 days. Store in a cool, dry place in an airtight container.",
  },
  {
    id: 4,
    category: "flours",
    categoryLabel: "chakki mill & Flours",
    q: "Why are rotis made with your whole grain flour slightly darker in color?",
    a: "Commercial flour uses chemical bleaching to look artificially white. Natural unbleached pure milled wheat retains the dark outer bran and germ layers, resulting in a healthy, rich golden-brown wholesome roti with superior aroma.",
  },
  {
    id: 5,
    category: "flours",
    categoryLabel: "chakki mill & Flours",
    q: "Is your flour easy to knead and roll into soft rotis?",
    a: "Yes. Because of the fine slow cold-grinding process, simply knead with lukewarm water, let the dough rest for 10–15 minutes, and your rotis will remain remarkably soft, pliable, and puffy throughout the day.",
  },

  // Category: Dietary Care & Wellness
  {
    id: 6,
    category: "clinical",
    categoryLabel: "Dietary Care & Wellness",
    q: "Can non-diabetic family members safely eat FENUGREEK Plus flour?",
    a: "Yes, absolutely. FENUGREEK Plus is a wholesome multi-grain flour infused with organic methi seeds and soluble fiber. It supports healthy digestion and prevents sluggish sugar crashes in anyone, making it a great daily staple for the entire family.",
  },
  {
    id: 7,
    category: "clinical",
    categoryLabel: "Dietary Care & Wellness",
    q: "How does Fat2Fuel Advance Multigrain Flour help with weight management?",
    a: "It provides complex carbs to control hunger, boosts metabolism, and helps convert body fat into energy to keep you active while blunting insulin spikes.",
  },
  {
    id: 8,
    category: "clinical",
    categoryLabel: "Dietary Care & Wellness",
    q: "What are the benefits of Giggly Grains - Multigrain Blend?",
    a: "Giggly Grains is an immunity-boosting multigrain blend specially formulated for kids and growing families. It is rich in dietary fiber, natural vitamins, and minerals that support healthy digestion and sustained daily energy without any artificial additives.",
  },

  // Category: Herbal Teas & Storage
  {
    id: 13,
    category: "teas",
    categoryLabel: "Herbal Teas & Storage",
    q: "How should I prepare and brew Chamomile and Herbal Teas?",
    a: "Steep 1 teaspoon of herbal tea in hot water for 4–5 minutes in a covered cup. Strain and sip warm, or chill with a slice of lemon for a refreshing antioxidant drink.",
  },
  {
    id: 14,
    category: "teas",
    categoryLabel: "Herbal Teas & Storage",
    q: "How are your herbal teas packaged to preserve freshness?",
    a: "All herbal teas are packed in UV-shielded, moisture-barrier food-grade sealed pouches with airtight locks to preserve natural aromas and volatile antioxidants.",
  },

  // Category: Sourcing, Purity & Verification
  {
    id: 15,
    category: "sourcing",
    categoryLabel: "Sourcing & Purity",
    q: "Where do you source your grains and botanicals?",
    a: "We partner directly with smallholder certified farms across Punjab and fertile regions that follow regenerative, pesticide-conscious, and natural farming traditions.",
  },
  {
    id: 16,
    category: "sourcing",
    categoryLabel: "Sourcing & Purity",
    q: "Do you perform third-party lab testing for purity?",
    a: "Yes, every seasonal batch undergoes rigorous testing to verify zero adulterants, zero chemicals, and 100% natural purity.",
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
