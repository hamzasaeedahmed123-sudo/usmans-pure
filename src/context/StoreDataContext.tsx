"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from "@/data/products";

export interface OrderItem {
  id: string;
  name: string;
  pack: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = "Pending" | "Processing" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  city: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: "Cash on Delivery (COD)" | "JazzCash" | "Easypaisa" | "Bank Transfer";
  date: string;
  notes?: string;
  transactionId?: string;
  senderAccountTitle?: string;
  receiptImage?: string;
}

export interface CustomPromoBanner {
  id: string;
  badge: string;
  title: string;
  discountTag: string;
  description: string;
  link: string;
  buttonText: string;
  bgColor: string;
  enabled: boolean;
}

export interface SaleBannerConfig {
  enabled: boolean;
  badgeTitle: string;
  discountTag: string;
  subtext: string;
  buttonText?: string;
  link?: string;
}

export interface CMSContent {
  announcementBarText: string;
  announcementSubText: string;
  announcementBg: string;
  heroSlides: {
    flour: {
      title: string;
      subtitle: string;
      fullTitle: string;
      benefit: string;
      price: string;
      weight: string;
    };
    herbals: {
      title: string;
      subtitle: string;
      fullTitle: string;
      benefit: string;
      price: string;
      weight: string;
    };
    spices: {
      title: string;
      subtitle: string;
      fullTitle: string;
      benefit: string;
      price: string;
      weight: string;
    };
  };
  promotions: {
    doctorsChoiceEnabled: boolean;
    dietBannerEnabled: boolean;
    megaBundlesEnabled: boolean;
    consultationBannerEnabled: boolean;
  };
  saleBanner: SaleBannerConfig;
  customBanners: CustomPromoBanner[];
}

export const DEFAULT_CMS: CMSContent = {
  announcementBarText: "100% Traditional Stone-Ground • Zero Maida • Freshly Milled",
  announcementSubText: "Free Nationwide Shipping on Orders Rs 10,000+ • Cash on Delivery",
  announcementBg: "#2A1F17",
  heroSlides: {
    flour: {
      title: "MULTIGRAIN",
      subtitle: "FLOUR",
      fullTitle: "Chakki Multigrain Atta",
      benefit: "Maa ke haath ki narm phulka roti — 100% pathar ki chakki ka qudrati fiber, zero maida.",
      price: "Rs 2,450",
      weight: "10kg",
    },
    herbals: {
      title: "HERBAL",
      subtitle: "TEAS",
      fullTitle: "Desi Herbal Qehwa",
      benefit: "Buzurgo ke blood pressure aur sukoon ke liye asli zaitoon patti aur chamomile ka qehwa.",
      price: "Rs 1,250",
      weight: "250g",
    },
    spices: {
      title: "ORGANIC",
      subtitle: "SPICES",
      fullTitle: "Sil-Batta Pure Masalay",
      benefit: "Sil-batte aur pathar pe pise masalay — bina kisi rang ya chemical ke asli khushboo aur zaiqa.",
      price: "Rs 950",
      weight: "500g",
    },
  },
  promotions: {
    doctorsChoiceEnabled: true,
    dietBannerEnabled: true,
    megaBundlesEnabled: true,
    consultationBannerEnabled: true,
  },
  saleBanner: {
    enabled: false,
    badgeTitle: "Grand Opening Sale",
    discountTag: "Flat 15% OFF on Multigrain Flour",
    subtext: "Fresh stone-milled chakki flour packed with 100% natural wheat germ. Use code PURE15 at checkout.",
    buttonText: "Shop Flash Sale",
    link: "/products",
  },
  customBanners: [],
};

export interface PaymentCredentials {
  bankName: string;
  bankAccountTitle: string;
  bankIban: string;
  raastId: string;
  jazzCashNumber: string;
  jazzCashTitle: string;
  easyPaisaNumber: string;
  easyPaisaTitle: string;
  paymentInstructions: string;
}

export interface StoreSettings {
  storeName: string;
  storePhone: string;
  storeEmail: string;
  storeAddress: string;
  freeShippingThreshold: number;
  standardDeliveryFee: number;
  codEnabled: boolean;
  jazzCashEnabled: boolean;
  easyPaisaEnabled: boolean;
  bankTransferEnabled: boolean;
  paymentCredentials: PaymentCredentials;
}

export const DEFAULT_PAYMENT_CREDENTIALS: PaymentCredentials = {
  bankName: "Meezan Bank Ltd",
  bankAccountTitle: "Usman's Pure Products",
  bankIban: "PK36MEZN0001098472910101",
  raastId: "0300-8472910",
  jazzCashNumber: "0300-8472910",
  jazzCashTitle: "Usman's Pure Products",
  easyPaisaNumber: "0345-1234567",
  easyPaisaTitle: "Usman's Pure Products",
  paymentInstructions: "Please transfer the total order amount using Raast, Online Banking, or Mobile Wallet. Enter your Transaction ID (TID) or sender account title below for instant automated verification.",
};

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: "Usman's Pure Products",
  storePhone: "+92 300 8472910",
  storeEmail: "support@usmanspure.com",
  storeAddress: "Milling Facility, G.T. Road, Lahore, Punjab, Pakistan",
  freeShippingThreshold: 10000,
  standardDeliveryFee: 250,
  codEnabled: true,
  jazzCashEnabled: true,
  easyPaisaEnabled: true,
  bankTransferEnabled: true,
  paymentCredentials: DEFAULT_PAYMENT_CREDENTIALS,
};

export type ReviewStatus = "Published" | "Pending" | "Hidden";

export interface Review {
  id: string;
  name: string;
  city: string;
  product: string;
  rating: number; // 1 to 5
  date: string;
  review: string;
  verified: boolean;
  status: ReviewStatus;
  photos?: string[];
  helpfulCount?: number;
}

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-farhan",
    name: "Mrs. Farhan",
    city: "Lahore, Punjab (Model Town)",
    product: "Multigrain Diet & Diabetic Care Flour",
    rating: 5,
    date: "2 days ago",
    review: "MashaAllah rozana ke dastarkhwan pe ab sakht roti ka sawal hi paida nahi hota. Bachay pehle adhi roti chorr dete the, ab shauq se poori plate khatam karte hain. Sab se bari tasalli mere diabetic sasur ji ke liye hai—khane ke baad bilkul pait bhari nahi hota aur sugar bilkul control rehti hai. Asli maa ki tasalli hai ye atta!",
    verified: true,
    status: "Published",
    photos: ["/images/products/multigrain-flagship-family.jpg"],
    helpfulCount: 56,
  },
  {
    id: "rev-1",
    name: "Tariq Mahmood",
    city: "Lahore, Punjab",
    product: "Fat2Fuel Advance Multigrain Flour",
    rating: 5,
    date: "4 days ago",
    review: "Salam Usman bhai! Fat2Fuel multigrain use karte hue teesra hafta hai. MashaAllah 3.8 kg wazan kam hua hai aur subah se shaam tak thakan ya kamzori bilkul mehsoos nahi hoti. Ghar ke dastarkhwan pe roti itni naram banti hai ke Ammi aur begum dono ne regular bazaar ka atta bilkul band kar diya hai.",
    verified: true,
    status: "Published",
    photos: ["/images/products/prod-3.jpg", "/images/products/prod-1.jpg"],
    helpfulCount: 38,
  },
  {
    id: "rev-2",
    name: "Dr. Farzana Akhtar",
    city: "Islamabad, Capital",
    product: "FENUGREEK Plus – Diabetic Care Flour",
    rating: 5,
    date: "1 week ago",
    review: "Alhamdulillah as a doctor aur khud diabetic hone ke naate, mein rozana fasting aur random sugar check karti hoon. Fenugreek Plus flour se khane ke baad sugar spike bilkul nahi hoti. Roti ka zaiqa aur naram-pan 100% desi chakki jaisa hai bina kisi kadwahat ke.",
    verified: true,
    status: "Published",
    photos: ["/images/products/prod-4.png"],
    helpfulCount: 52,
  },
  {
    id: "rev-3",
    name: "Ayesha Imran",
    city: "Karachi, Sindh",
    product: "Wild Rosella Herbal Tea (Hibiscus)",
    rating: 5,
    date: "2 weeks ago",
    review: "Karachi mein aisi khalis cheez milna na-mumkin lagta tha. Rosella tea ice ke sath thandi pi hai, 5 din mein bloating bilkul theek ho gayi. Aur Haldi ka rang aur khushboo dekh kar nani jaan ne kaha yehi asli lakadong haldi hai.",
    verified: true,
    status: "Published",
    photos: ["/images/products/prod-9.jpg"],
    helpfulCount: 29,
  },
  {
    id: "rev-4",
    name: "Muhammad Bilal",
    city: "Faisalabad, Punjab",
    product: "Kids Giggly Grains Immunity Flour",
    rating: 5,
    date: "3 weeks ago",
    review: "Mera 6 saal ka beta school ke lunch mein roti nahi khata tha maida ki waja se pait dard hota tha. Giggly Grains se roti itni soft banti hai ke ab shauq se poori plate khatam karta hai. JazakAllah khair Usman bhai!",
    verified: true,
    status: "Published",
    helpfulCount: 19,
  },
  {
    id: "rev-5",
    name: "Begum Shahnaz",
    city: "Rawalpindi, Punjab",
    product: "Pure Lakadong High-Curcumin Turmeric",
    rating: 5,
    date: "1 month ago",
    review: "Walekumassalam, 20 saal baad gaon ki chakki ka zaiqa yaad agaya. Haldi aur garam masalay mein zero milawat hai. Raat ko doodh mein haldi peene se ghutno ka dard kafi behtar hai. Allah barkat de aapke kaam mein.",
    verified: true,
    status: "Published",
    photos: ["/images/spices-product.jpg"],
    helpfulCount: 44,
  },
  {
    id: "rev-6",
    name: "Usman Rafique",
    city: "Multan, Punjab",
    product: "Olive Leaf Cardiac Herbal Tea",
    rating: 5,
    date: "1 month ago",
    review: "Direct WhatsApp pe order kiya tha, agle din Multan mein fresh pack deliver ho gaya. Olive leaf tea se BP kafi stable hai. Packing aur stone-ground fresh khushboo ne dil jeet liya.",
    verified: true,
    status: "Published",
    helpfulCount: 16,
  },
  {
    id: "rev-7",
    name: "Fatima Zahra",
    city: "Gujranwala, Punjab",
    product: "Basic Stone-Ground Whole Wheat Atta",
    rating: 5,
    date: "1 month ago",
    review: "Bina maida khalis chakki ka atta hai. Phulkay sham tak bilkul taze aur naram rehte hain. Dastarkhwan ki barkat dobara wapis aagai hai. Har family ko yehi atta use karna chahiye.",
    verified: true,
    status: "Published",
    helpfulCount: 23,
  },
  {
    id: "rev-8",
    name: "Zeeshan Haider",
    city: "Peshawar, KPK",
    product: "Cold-Pounded Kashmiri Red Chili",
    rating: 5,
    date: "1 month ago",
    review: "Bina kisi artificial chemical color ke. Handi mein aisi khalis laal chamak aur shandaar khushboo aati hai bina pait mein jalan ke. Nihayat shandaar quality!",
    verified: true,
    status: "Published",
    helpfulCount: 31,
  },
  {
    id: "rev-9",
    name: "Sadia Naveed",
    city: "Sialkot, Punjab",
    product: "Royal Stone-Pounded Garam Masala",
    rating: 5,
    date: "2 months ago",
    review: "Sirf aadhi chutki kaafi hoti hai kyunke masalay slow stone-pound hain aur natural oils mehfooz hain. Handi bante hi poora mohalla khushboo se mehak uthta hai!",
    verified: true,
    status: "Published",
    helpfulCount: 31,
  },
  {
    id: "rev-10",
    name: "Kamran Siddiqui",
    city: "Karachi, Sindh",
    product: "Fat Loss Transformation Combo",
    rating: 5,
    date: "2 months ago",
    review: "Ordering again for the 3rd time. Fast delivery to Karachi in 48 hours, proper seal packaging, and authentic taste.",
    verified: true,
    status: "Published",
    helpfulCount: 27,
  },
];

export const INITIAL_ORDERS: Order[] = [];

interface StoreDataContextType {
  products: Product[];
  orders: Order[];
  reviews: Review[];
  cmsContent: CMSContent;
  storeSettings: StoreSettings;
  isLoaded: boolean;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Omit<Order, "id" | "date"> & { id?: string; date?: string; orderNumber?: string }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  addReview: (review: Omit<Review, "id" | "date"> & { id?: string; date?: string }) => Review;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  toggleReviewStatus: (id: string) => void;
  updateCMS: (updates: Partial<CMSContent>) => void;
  updateStoreSettings: (updates: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: "usman_admin_products",
  ORDERS: "usman_admin_orders",
  REVIEWS: "usman_admin_reviews",
  CMS: "usman_admin_cms",
  SETTINGS: "usman_admin_settings",
};

export function StoreDataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [cmsContent, setCmsContent] = useState<CMSContent>(DEFAULT_CMS);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted store data on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProducts) {
        const parsed = JSON.parse(storedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }

      const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        if (Array.isArray(parsed)) {
          // Check if stored orders are exclusively the legacy hardcoded mock orders
          const isLegacyMock =
            parsed.length > 0 &&
            parsed.every((o) => o.id && o.id.startsWith("ord-1084"));

          if (isLegacyMock) {
            setOrders([]);
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
          } else {
            setOrders(parsed);
          }
        }
      }

      const storedCMS = localStorage.getItem(STORAGE_KEYS.CMS);
      if (storedCMS) {
        const parsed = JSON.parse(storedCMS);
        if (parsed && parsed.heroSlides) {
          // Auto-migrate legacy shipping threshold string in cached localStorage
          if (parsed.announcementSubText && /2,?000/.test(parsed.announcementSubText)) {
            parsed.announcementSubText = parsed.announcementSubText.replace(/2,?000/g, "10,000");
            try {
              localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(parsed));
            } catch {}
          }
          setCmsContent({
            ...DEFAULT_CMS,
            ...parsed,
            saleBanner: { ...DEFAULT_CMS.saleBanner, ...(parsed.saleBanner || {}) },
            customBanners: parsed.customBanners || DEFAULT_CMS.customBanners,
          });
        }
      }

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (parsed) {
          // Auto-migrate legacy 2000 threshold to 10000 in cached localStorage
          if (parsed.freeShippingThreshold === 2000) {
            parsed.freeShippingThreshold = 10000;
            try {
              localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed));
            } catch {}
          }
          setStoreSettings({
            ...DEFAULT_STORE_SETTINGS,
            ...parsed,
            freeShippingThreshold: parsed.freeShippingThreshold === 2000 ? 10000 : (parsed.freeShippingThreshold || 10000),
            paymentCredentials: {
              ...DEFAULT_PAYMENT_CREDENTIALS,
              ...(parsed.paymentCredentials || {}),
            },
          });
        }
      }

      const storedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (storedReviews) {
        const parsed = JSON.parse(storedReviews);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch (e) {
      console.error("Error reading stored admin data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Listen for real-time order placements across tabs and components
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOrderPlaced = (e: Event) => {
      const customEvent = e as CustomEvent<Order>;
      if (customEvent.detail && customEvent.detail.id) {
        setOrders((prev) => {
          if (prev.some((o) => o.id === customEvent.detail.id)) return prev;
          return [customEvent.detail, ...prev];
        });
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.ORDERS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setOrders(parsed);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener("usman-order-placed", handleOrderPlaced);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("usman-order-placed", handleOrderPlaced);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Listen for real-time reviews submitted across storefront and tabs
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleReviewAdded = (e: Event) => {
      const customEvent = e as CustomEvent<Review>;
      if (customEvent.detail && customEvent.detail.id) {
        setReviews((prev) => {
          if (prev.some((r) => r.id === customEvent.detail.id)) return prev;
          return [customEvent.detail, ...prev];
        });
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.REVIEWS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setReviews(parsed);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener("usman-review-added", handleReviewAdded);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("usman-review-added", handleReviewAdded);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Debounced Sync to localStorage for 60FPS UI thread responsiveness
  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      } catch (e) {
        console.error(e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      } catch (e) {
        console.error(e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [orders, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("usman-reviews-updated", { detail: reviews }));
        }
      } catch (e) {
        console.error(e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [reviews, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(cmsContent));
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("usman-cms-updated", { detail: cmsContent }));
        }
      } catch (e) {
        console.error(e);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [cmsContent, isLoaded]);

  const addProduct = (newProd: Omit<Product, "id">) => {
    const id = `prod-${Date.now().toString(36)}`;
    const fullProduct: Product = {
      ...newProd,
      id,
    };
    setProducts((prev) => [fullProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updates,
            priceFormatted: updates.price !== undefined ? `₨${updates.price.toLocaleString()}` : p.priceFormatted,
            originalPriceFormatted:
              updates.originalPrice !== undefined
                ? `₨${updates.originalPrice.toLocaleString()}`
                : p.originalPriceFormatted,
          };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addOrder = (orderData: Omit<Order, "id" | "date"> & { id?: string; date?: string; orderNumber?: string }): Order => {
    const id = orderData.id || `ord-${Date.now().toString(36)}`;
    const orderNumber = orderData.orderNumber || `UP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      date: orderData.date || new Date().toISOString(),
      status: orderData.status || "Pending",
    };

    setOrders((prev) => {
      const updated = [newOrder, ...prev.filter((o) => o.id !== id)];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
      return updated;
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("usman-order-placed", { detail: newOrder }));
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const addReview = (reviewData: Omit<Review, "id" | "date"> & { id?: string; date?: string; status?: ReviewStatus }): Review => {
    const id = reviewData.id || `rev-${Date.now().toString(36)}`;
    const newReview: Review = {
      ...reviewData,
      id,
      date: reviewData.date || "Just now",
      verified: reviewData.verified !== undefined ? reviewData.verified : false,
      status: reviewData.status || "Pending",
      helpfulCount: reviewData.helpfulCount || 0,
    };

    setReviews((prev) => {
      const updated = [newReview, ...prev.filter((r) => r.id !== id)];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      }
      return updated;
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("usman-review-added", { detail: newReview }));
    }

    return newReview;
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleReviewStatus = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextStatus: ReviewStatus = r.status === "Published" ? "Hidden" : "Published";
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  };

  const updateCMS = (updates: Partial<CMSContent>) => {
    setCmsContent((prev) => ({
      ...prev,
      ...updates,
      heroSlides: {
        ...prev.heroSlides,
        ...(updates.heroSlides || {}),
      },
      promotions: {
        ...prev.promotions,
        ...(updates.promotions || {}),
      },
      saleBanner: {
        ...prev.saleBanner,
        ...(updates.saleBanner || {}),
      },
      customBanners: updates.customBanners !== undefined ? updates.customBanners : prev.customBanners,
    }));
  };

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(storeSettings));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("usman-settings-updated", { detail: storeSettings }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [storeSettings, isLoaded]);

  const updateStoreSettings = (updates: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({
      ...prev,
      ...updates,
      paymentCredentials: {
        ...prev.paymentCredentials,
        ...(updates.paymentCredentials || {}),
      },
    }));
  };

  const resetToDefaults = () => {
    setProducts(DEFAULT_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setReviews(DEFAULT_REVIEWS);
    setCmsContent(DEFAULT_CMS);
    setStoreSettings(DEFAULT_STORE_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.CMS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  };

  return (
    <StoreDataContext.Provider
      value={{
        products,
        orders,
        reviews,
        cmsContent,
        storeSettings,
        isLoaded,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        addReview,
        updateReview,
        deleteReview,
        toggleReviewStatus,
        updateCMS,
        updateStoreSettings,
        resetToDefaults,
      }}
    >
      {children}
    </StoreDataContext.Provider>
  );
}

export function useStoreData() {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error("useStoreData must be used within a StoreDataProvider");
  }
  return context;
}
