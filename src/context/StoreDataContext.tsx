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
  announcementBarText: "90% Pathar Ki Chakki Ka Khalis Atta • Zero Maida • Lahore & Rawalpindi/Islamabad Mein Taaza Delivery",
  announcementSubText: "Free Nationwide Shipping on Orders Rs 10,000+ • Cash on Delivery",
  announcementBg: "#2A1F17",
  heroSlides: {
    flour: {
      title: "MULTIGRAIN",
      subtitle: "FLOUR",
      fullTitle: "Chakki Multigrain Atta",
      benefit: "Maa ke haath ki narm phulka roti — 90% pathar ki chakki ka qudrati fiber, zero maida.",
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
    subtext: "Fresh stone-milled chakki flour packed with 90% natural wheat germ. Use code PURE15 at checkout.",
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
    id: "rev-farhan-dha",
    name: "Mrs. Farhan (DHA Lahore)",
    city: "DHA, Lahore",
    product: "Multigrain Diet & Diabetic Care Flour",
    rating: 5,
    date: "2 days ago",
    review: "Buzurg ghar mein diabetic hain, pehle bazaar ke aate se khana khate hi pait mein bhari-pan aur gas ki shikayat hoti thi. Usman's Pure ka Multigrain chakki atta use karte 3 haftay ho gaye hain, tabiyat bilkul halki phulki rehti hai aur roti bhi bohat narm banti hai.",
    verified: true,
    status: "Published",
    helpfulCount: 68,
  },
  {
    id: "rev-sadia-tariq",
    name: "Sadia Tariq (F-10 Islamabad)",
    city: "F-10, Islamabad",
    product: "Fat2Fuel Advance Multigrain Flour",
    rating: 5,
    date: "4 days ago",
    review: "Mere bachay chokar wale aate ki roti dekh kar munh banate the. Lekin is aate ka phulka itna narm aur mithaas bhara banta hai ke ammi ke hath ki roti bache be-fikar shauq se kha lete hain. Pure taste, koi chemical bleach nahi.",
    verified: true,
    status: "Published",
    helpfulCount: 54,
  },
  {
    id: "rev-kamran-gulberg",
    name: "Chaudhry Kamran (Gulberg, Lahore)",
    city: "Gulberg, Lahore",
    product: "Taaza Pure Stone-Ground Chakki Atta",
    rating: 5,
    date: "1 week ago",
    review: "Subah pisa hua taaza chakki atta direct ghar deliver ho gaya. Asli gandum aur jau ki khushboo aati hai jab taway par roti banti hai. Quality 10/10 hai.",
    verified: true,
    status: "Published",
    helpfulCount: 47,
  },
  {
    id: "rev-3",
    name: "Ayesha Imran",
    city: "Karachi, Sindh",
    product: "Wild Rosella Herbal Tea (Hibiscus)",
    rating: 5,
    date: "2 weeks ago",
    review: "Rosella tea bohat zabardast hai, thandi karke peene se fresh feeling aati hai aur pait ka bhari pan bhi kam ho gaya. Packing aur safai bohat achi thi.",
    verified: true,
    status: "Published",
    helpfulCount: 29,
  },
  {
    id: "rev-4",
    name: "Muhammad Bilal",
    city: "Faisalabad",
    product: "Kids Giggly Grains Immunity Flour",
    rating: 5,
    date: "3 weeks ago",
    review: "Mera beta pehle roti se bhagta tha. Giggly Grains se roti itni soft banti hai ke ab shauq se khata hai. JazakAllah Usman bhai.",
    verified: true,
    status: "Published",
    helpfulCount: 19,
  },
  {
    id: "rev-5",
    name: "Begum Shahnaz",
    city: "Rawalpindi",
    product: "Pure Lakadong High-Curcumin Turmeric",
    rating: 5,
    date: "1 month ago",
    review: "Haldi aur garam masalay mein koi milawat nahi lagti, khushboo se hi pata chal jata hai. Raat ko doodh mein haldi dal ke peene se kafi aaram mila hai. Allah barkat de aapke rizq mein.",
    verified: true,
    status: "Published",
    helpfulCount: 44,
  },
  {
    id: "rev-6",
    name: "Usman Rafique",
    city: "Multan",
    product: "Olive Leaf Cardiac Herbal Tea",
    rating: 5,
    date: "1 month ago",
    review: "Direct WhatsApp pe order kiya tha, agle din Multan mein fresh pack deliver ho gaya. Qehway ka zaiqa qudrati hai aur service bohat tez hai.",
    verified: true,
    status: "Published",
    helpfulCount: 16,
  },
  {
    id: "rev-7",
    name: "Fatima Zahra",
    city: "Gujranwala",
    product: "Basic Stone-Ground Whole Wheat Atta",
    rating: 5,
    date: "1 month ago",
    review: "Bina maida khalis chakki ka atta hai. Phulkay sham tak bilkul naram rehte hain. Dastarkhwan ke liye behtareen cheez hai.",
    verified: true,
    status: "Published",
    helpfulCount: 23,
  },
  {
    id: "rev-8",
    name: "Zeeshan Haider",
    city: "Peshawar",
    product: "Cold-Pounded Kashmiri Red Chili",
    rating: 5,
    date: "1 month ago",
    review: "Bina kisi masnooi rang ke asli kashmiri mirch hai. Handi mein pyari rangat aur munasib teekha-pan aata hai bina pait mein jalan ke.",
    verified: true,
    status: "Published",
    helpfulCount: 31,
  },
  {
    id: "rev-9",
    name: "Sadia Naveed",
    city: "Sialkot",
    product: "Royal Stone-Pounded Garam Masala",
    rating: 5,
    date: "2 months ago",
    review: "Garam masala bohat taaza aur khushbudaar hai, thori si miqdaar hi kaafi hoti hai. Khane ka maza dobala ho jata hai.",
    verified: true,
    status: "Published",
    helpfulCount: 31,
  },
  {
    id: "rev-10",
    name: "Kamran Siddiqui",
    city: "Karachi",
    product: "Fat Loss Transformation Combo",
    rating: 5,
    date: "2 months ago",
    review: "Dosri dafa order kar raha hoon. Karachi mein 48 ghantay mein delivery mili, seal pack safe tha aur taste bilkul fresh.",
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
  REVIEWS: "usman_admin_reviews_v4",
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
          }
          // Auto-migrate legacy robotic AI hero slide benefits if detected in cached storage
          if (
            parsed.heroSlides.herbals?.benefit?.includes("Hand-harvested") ||
            parsed.heroSlides.flour?.benefit?.includes("Cold-milled under 40°C with 100%") ||
            parsed.heroSlides.spices?.benefit?.includes("Slow stone-pounded aroma lock")
          ) {
            parsed.heroSlides = DEFAULT_CMS.heroSlides;
          }
          try {
            localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(parsed));
          } catch {}
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
          // Ensure Mrs. Farhan (rev-farhan) is present even if user has older cached reviews
          const hasFarhan = parsed.some((r) => r.id === "rev-farhan");
          const mergedReviews = hasFarhan ? parsed : [DEFAULT_REVIEWS[0], ...parsed];
          setReviews(mergedReviews);
          try {
            localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(mergedReviews));
          } catch {}
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
