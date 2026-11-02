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
  subtotal?: number;
  shippingFee?: number;
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
  };
  promotions: {
    doctorsChoiceEnabled: boolean;
    dietBannerEnabled: boolean;
    megaBundlesEnabled: boolean;
    consultationBannerEnabled: boolean;
  };
  saleBanner: SaleBannerConfig;
  customBanners: CustomPromoBanner[];
  blocks?: any[];
}

export const DEFAULT_CMS: CMSContent = {
  announcementBarText: "100% Khalis Aur Taaza Chakki Atta • Zero Maida • Nationwide Cash on Delivery Across Pakistan",
  announcementSubText: "Free Nationwide Shipping on Orders Rs 10,000+ • Cash on Delivery",
  announcementBg: "#2A1F17",
  heroSlides: {
    flour: {
      title: "MULTIGRAIN",
      subtitle: "FLOUR",
      fullTitle: "Chakki Multigrain Atta",
      benefit: "Maa ke haath ki narm phulka roti — qudrati fiber, zero maida.",
      price: "Rs 2,450",
      weight: "10kg",
    },
    herbals: {
      title: "HERBAL",
      subtitle: "TEAS",
      fullTitle: "Desi Herbal Qehwa",
      benefit: "Rozmarrah ke sukoon aur pur-lutf zaiqay ke liye asli chamomile aur lemongrass ka qehwa.",
      price: "Rs 1,250",
      weight: "250g",
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
    subtext: "FRESHLY MILLED CHAKKI flour packed with natural wheat germ and fiber. Use code PURE15 at checkout.",
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
  raastId: "0312-9996658",
  jazzCashNumber: "0312-9996658",
  jazzCashTitle: "Usman's Pure Products",
  easyPaisaNumber: "0312-9996658",
  easyPaisaTitle: "Usman's Pure Products",
  paymentInstructions: "Please transfer the total order amount using Raast, Online Banking, or Mobile Wallet. Enter your Transaction ID (TID) or sender account title below for instant automated verification.",
};

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: "Usman's Pure Products",
  storePhone: "+92 312 9996658",
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
    product: "Taaza Pure Chakki Atta",
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
    product: "Chamomile Tea",
    rating: 5,
    date: "1 month ago",
    review: "Raat ko sonay se pehle aik cup Chamomile tea peeti hoon. Neend bohat pur-sukoon aati hai aur thakawat bilkul door ho jati hai. qudrati taste aur khushboo.",
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
    product: "Basic Whole Wheat Chakki Atta",
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
    product: "Royal Pure Garam Masala",
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

export function StoreDataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [cmsContent, setCmsContent] = useState<CMSContent>(DEFAULT_CMS);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch initial data dynamically from PostgreSQL database APIs
  useEffect(() => {
    let isCancelled = false;

    // Purge deprecated localStorage keys (preserving 'usman_cart' strictly)
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("usman_admin_products");
        localStorage.removeItem("usman_admin_orders");
        localStorage.removeItem("usman_admin_reviews_v4");
        localStorage.removeItem("usman_admin_cms");
        localStorage.removeItem("usman_admin_settings");
        localStorage.removeItem("usmans_pure_cms_blocks");
      } catch {}
    }

    async function loadDataFromDB() {
      try {
        const [prodRes, ordersRes, reviewsRes, settingsRes] = await Promise.allSettled([
          fetch("/api/products"),
          fetch("/api/orders"),
          fetch("/api/reviews"),
          fetch("/api/settings"),
        ]);

        if (isCancelled) return;

        // 1. Products from PostgreSQL
        if (prodRes.status === "fulfilled" && prodRes.value.ok) {
          try {
            const prodData = await prodRes.value.json();
            const items = Array.isArray(prodData) ? prodData : prodData?.products;
            if (Array.isArray(items) && items.length > 0) {
              setProducts(items);
            }
          } catch (e) {
            console.warn("Could not parse products response", e);
          }
        }

        // 2. Orders from PostgreSQL
        if (ordersRes.status === "fulfilled" && ordersRes.value.ok) {
          try {
            const ordersData = await ordersRes.value.json();
            if (ordersData && Array.isArray(ordersData.orders)) {
              setOrders(ordersData.orders);
            }
          } catch (e) {
            console.warn("Could not parse orders response", e);
          }
        }

        // 3. Reviews from PostgreSQL
        if (reviewsRes.status === "fulfilled" && reviewsRes.value.ok) {
          try {
            const reviewsData = await reviewsRes.value.json();
            if (reviewsData && Array.isArray(reviewsData.reviews) && reviewsData.reviews.length > 0) {
              setReviews(reviewsData.reviews);
            }
          } catch (e) {
            console.warn("Could not parse reviews response", e);
          }
        }

        // 4. Settings and CMS from PostgreSQL
        if (settingsRes.status === "fulfilled" && settingsRes.value.ok) {
          try {
            const settingsData = await settingsRes.value.json();
            if (settingsData && settingsData.settings) {
              setStoreSettings((prev) => ({
                ...prev,
                ...settingsData.settings,
                paymentCredentials: {
                  ...prev.paymentCredentials,
                  ...(settingsData.settings.paymentCredentials || {}),
                },
              }));
            }
            if (settingsData && settingsData.cms) {
              setCmsContent((prev) => ({
                ...prev,
                ...settingsData.cms,
                heroSlides: {
                  ...prev.heroSlides,
                  ...(settingsData.cms.heroSlides || {}),
                },
                promotions: {
                  ...prev.promotions,
                  ...(settingsData.cms.promotions || {}),
                },
                saleBanner: {
                  ...prev.saleBanner,
                  ...(settingsData.cms.saleBanner || {}),
                },
                customBanners: settingsData.banners || settingsData.cms.customBanners || prev.customBanners,
              }));
            }
          } catch (e) {
            console.warn("Could not parse settings response", e);
          }
        }
      } catch (err) {
        console.error("Error loading store data from PostgreSQL APIs", err);
      } finally {
        if (!isCancelled) {
          setIsLoaded(true);
        }
      }
    }

    loadDataFromDB();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Listen for real-time order placements across storefront components
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

    window.addEventListener("usman-order-placed", handleOrderPlaced);
    return () => {
      window.removeEventListener("usman-order-placed", handleOrderPlaced);
    };
  }, []);

  // Listen for real-time reviews submitted across storefront
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

    window.addEventListener("usman-review-added", handleReviewAdded);
    return () => {
      window.removeEventListener("usman-review-added", handleReviewAdded);
    };
  }, []);

  const addProduct = (newProd: Omit<Product, "id">) => {
    const id = `prod-${Date.now().toString(36)}`;
    const fullProduct: Product = {
      ...newProd,
      id,
    };
    setProducts((prev) => [fullProduct, ...prev]);

    fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullProduct),
    }).catch((err) => console.error("Failed to persist product to database:", err));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    let updatedProduct: Product | undefined;
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          updatedProduct = {
            ...p,
            ...updates,
            priceFormatted: updates.price !== undefined ? `₨${updates.price.toLocaleString()}` : p.priceFormatted,
            originalPriceFormatted:
              updates.originalPrice !== undefined
                ? `₨${updates.originalPrice.toLocaleString()}`
                : p.originalPriceFormatted,
          };
          return updatedProduct;
        }
        return p;
      })
    );

    if (updatedProduct) {
      fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      }).catch((err) => console.error("Failed to update product in database:", err));
    }
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

    setOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== id)]);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("usman-order-placed", { detail: newOrder }));
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );

    fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId, status }),
    }).catch((err) => console.error("Failed to update order status in PostgreSQL:", err));
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));

    fetch(`/api/orders?id=${encodeURIComponent(orderId)}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete order from PostgreSQL:", err));
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

    setReviews((prev) => [newReview, ...prev.filter((r) => r.id !== id)]);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("usman-review-added", { detail: newReview }));
    }

    fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    }).catch((err) => console.error("Failed to insert review into PostgreSQL:", err));

    return newReview;
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    let updated: Review | undefined;
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          updated = { ...r, ...updates };
          return updated;
        }
        return r;
      })
    );

    if (updated) {
      fetch("/api/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }).catch((err) => console.error("Failed to update review in PostgreSQL:", err));
    }
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));

    fetch(`/api/reviews?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete review from PostgreSQL:", err));
  };

  const toggleReviewStatus = (id: string) => {
    let nextStatus: ReviewStatus = "Published";
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          nextStatus = r.status === "Published" ? "Hidden" : "Published";
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );

    fetch("/api/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: nextStatus }),
    }).catch((err) => console.error("Failed to toggle review status in PostgreSQL:", err));
  };

  const updateCMS = (updates: Partial<CMSContent>) => {
    let updatedCms: CMSContent;
    setCmsContent((prev) => {
      updatedCms = {
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
      };
      return updatedCms;
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("usman-cms-updated", { detail: updates }));
    }

    fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cms: updates, banners: updates.customBanners }),
    }).catch((err) => console.error("Failed to update CMS in PostgreSQL:", err));
  };

  const updateStoreSettings = (updates: Partial<StoreSettings>) => {
    let updatedSettings: StoreSettings;
    setStoreSettings((prev) => {
      updatedSettings = {
        ...prev,
        ...updates,
        paymentCredentials: {
          ...prev.paymentCredentials,
          ...(updates.paymentCredentials || {}),
        },
      };
      return updatedSettings;
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("usman-settings-updated", { detail: updates }));
    }

    fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: updates }),
    }).catch((err) => console.error("Failed to update settings in PostgreSQL:", err));
  };

  const resetToDefaults = () => {
    setProducts(DEFAULT_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setReviews(DEFAULT_REVIEWS);
    setCmsContent(DEFAULT_CMS);
    setStoreSettings(DEFAULT_STORE_SETTINGS);

    fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: DEFAULT_STORE_SETTINGS, cms: DEFAULT_CMS }),
    }).catch((err) => console.error("Failed to reset settings in PostgreSQL:", err));
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

