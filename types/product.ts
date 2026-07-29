// types/product.ts

export interface Product {
  id: string;
  code: string;
  slug: string;

  name: {
    fa: string;
    en: string;
  };

  description: {
    short: string;
    full: string;
  };

  categoryId: string;
  subcategoryId: string | null;

  materialIds: string[];

  brandId: string | null;

  colorIds: string[];

  tagIds: string[];

  featureIds: string[];

  specifications: ProductSpecifications;

  images: ProductImage[];

  videos: ProductVideo[];

  price: number | null;
  salePrice?: number;
  currency: "IRT" | "IRR" | "USD" | "EUR";

  status: "available" | "out-of-stock" | "discontinued" | "pre-order";

  badges: string[];

  keywords: string[];

  relatedProducts: string[];

  seo: {
    title: string;
    description: string;
  };

  display: {
    featured: boolean;
    showOnHomepage: boolean;
    sortOrder: number;
    hidePrice: boolean;
  };

  // Optional fields for analytics
  views?: number;
  reactions?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductSpecifications {
  // Common fields
  size?: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "adjustable" | string;
  lengthCm?: number;
  lengthMm?: number;
  diameterCm?: number;
  diameterMm?: number;
  material?: string;
  flexibility?: "low" | "medium" | "high";
  weightG?: number;

  // Butt plugs
  steps?: number;
  gemstone?: boolean;
  plating?: string;

  // Dildos
  totalLengthCm?: number;
  totalLengthMm?: number;
  usableLengthCm?: number;
  suctionCup?: boolean;
  harnessCompatible?: boolean;
  harness?: boolean;
  testicles?: boolean;
  realistic?: boolean;

  // Vibrators
  vibrationModes?: number;
  linearModes?: number;
  pulseModes?: number;
  functions?: number;
  batteryType?:
    | "rechargeable"
    | "battery"
    | "electric"
    | "magnetic-rechargeable";
  powerSource?: "rechargeable" | "battery" | "electric";
  remoteRange?: number;
  connectionType?: "bluetooth" | "wifi" | "none";
  appControl?: boolean;
  suctionPower?: "low" | "medium" | "strong";
  usage?: "internal" | "external" | "internal-external";
  origin?: string;

  // Cock rings
  type?: string;
  staminaEnhancing?: boolean;

  // Gags
  innerDiameterCm?: number;
  outerDiameterCm?: number;
  strapMaterial?: string;

  // Belts
  adjustmentType?: string;
  hardware?: string;

  // BDSM sets
  pieces?: number;
  lining?: string;

  // Penis sleeves
  lengthIncreaseCm?: number;
  diameterIncreaseCm?: number;
  highGrip?: boolean;
  naturalFeel?: boolean;

  // General
  color?: string;
  colors?: string[];
  waterproof?: boolean;
  washable?: boolean;
  hypoallergenic?: boolean;
  bodySafe?: boolean;
  imported?: boolean;
  packaging?: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  isCover: boolean;
  width?: number;
  height?: number;
}

export interface ProductVideo {
  src: string;
  alt: string;
  duration: number;
  thumbnail: string;
}

// Filter Types
export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

export interface FilterOptions {
  categories: FilterOption[];
  subcategories: FilterOption[];
  materials: FilterOption[];
  colors: FilterOption[];
  tags: FilterOption[];
  sizes: FilterOption[];
  priceRange: {
    min: number;
    max: number;
  };
  badges: FilterOption[];
}

export interface AppliedFilters {
  categories: string[];
  subcategories: string[];
  materials: string[];
  colors: string[];
  tags: string[];
  sizes: string[];
  priceRange: {
    min: number | null;
    max: number | null;
  };
  badges: string[];
  search: string;
  sortBy: "newest" | "popular" | "price-asc" | "price-desc" | "relevance";
  inStock: boolean;
  onSale: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: {
    fa: string;
    en: string;
  };
  slug: string;
  icon?: string;
  description?: string;
  subcategories?: Subcategory[];
  image?: string;
  count: number;
  featured?: boolean;
  sortOrder?: number;
}

export interface Subcategory {
  id: string;
  name: {
    fa: string;
    en: string;
  };
  slug: string;
  categoryId: string;
  description?: string;
  count: number;
  featured?: boolean;
}

// Tag Types
export interface Tag {
  id: string;
  name: {
    fa: string;
    en: string;
  };
  slug: string;
  count: number;
  type?: "category" | "feature" | "material" | "color" | "badge" | "brand";
}

// Brand Types
export interface Brand {
  id: string;
  name: {
    fa: string;
    en: string;
  };
  slug: string;
  logo?: string;
  description?: string;
  website?: string;
  count: number;
  featured?: boolean;
}

// Material Types
export interface Material {
  id: string;
  name: {
    fa: string;
    en: string;
  };
  slug: string;
  description?: string;
  icon?: string;
  count: number;
  features?: string[];
}

// Color Types
export interface Color {
  id: string;
  name: {
    fa: string;
    en: string;
  };
  hex: string;
  slug: string;
  count: number;
}

// Feature Types
export interface Feature {
  id: string;
  name: {
    fa: string;
    en: string;
  };
  slug: string;
  icon?: string;
  description?: string;
  count: number;
}

// Product Listing Response
export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: FilterOptions;
}

// Product Detail Response
export interface ProductDetailResponse {
  product: Product;
  relatedProducts: Product[];
  similarProducts: Product[];
}

// Cart/Order Types (optional)
export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

// Search Types
export interface SearchResult {
  products: Product[];
  total: number;
  query: string;
  suggestions?: string[];
  filters?: AppliedFilters;
}

// Product Badge Types
export type ProductBadge =
  | "new"
  | "popular"
  | "best-seller"
  | "premium"
  | "trending"
  | "recommended"
  | "budget"
  | "compact"
  | "minimal"
  | "challenge"
  | "xl"
  | "xxl"
  | "couples"
  | "bdsm"
  | "anal"
  | "beginner"
  | "accessory"
  | "rechargeable"
  | "powerful"
  | "electric"
  | "classic"
  | "on-sale"
  | "limited"
  | "imported";

// Feature Types (Common product features)
export type ProductFeature =
  | "body-safe"
  | "washable"
  | "waterproof"
  | "hypoallergenic"
  | "flexible"
  | "durable"
  | "smooth-finish"
  | "easy-clean"
  | "soft-touch"
  | "graduated-design"
  | "suction-cup"
  | "harness-compatible"
  | "vacuum-sealed"
  | "realistic-design"
  | "natural-feel"
  | "high-grip"
  | "adjustable"
  | "comfortable"
  | "premium-quality"
  | "rechargeable"
  | "powerful"
  | "quiet"
  | "silent"
  | "dual-function"
  | "magnetic-charging"
  | "tear-resistant"
  | "odor-free"
  | "beginner-friendly"
  | "travel-friendly"
  | "discreet"
  | "compact"
  | "heavy-duty"
  | "stamina-enhancing";

// Material Types (Predefined material IDs)
export type MaterialId =
  | "silicone"
  | "steel"
  | "pu-leather"
  | "wood"
  | "abs"
  | "silk"
  | "glass"
  | "plastic"
  | "metal"
  | "latex"
  | "rubber"
  | "jelly"
  | "cyberskin"
  | "pvc"
  | "tpe";

// Color Types (Predefined color IDs)
export type ColorId =
  | "random"
  | "red"
  | "pink"
  | "black"
  | "skin-tone"
  | "cream"
  | "silver"
  | "gold"
  | "purple"
  | "blue"
  | "green"
  | "yellow"
  | "orange"
  | "white"
  | "clear"
  | "rainbow"
  | "multi-color";

// Category Types (Predefined category IDs)
export type CategoryId =
  | "butt-plugs"
  | "dildos"
  | "vibrators"
  | "penis-sleeves"
  | "whips"
  | "cock-rings"
  | "bondage"
  | "gags"
  | "anal-beads"
  | "belts"
  | "lubricants"
  | "massagers"
  | "pumps"
  | "kits"
  | "lingerie";

// Subcategory Types
export type SubcategoryId =
  | "silicone"
  | "steel"
  | "remote-controlled"
  | "suction"
  | "mini"
  | "electric"
  | "rechargeable"
  | "multi-function"
  | "double-ended"
  | "anal"
  | "strapless"
  | "sets"
  | "glass"
  | "wood"
  | "leather";

// Helper type for form data
export type ProductFormData = Omit<
  Product,
  "id" | "slug" | "createdAt" | "updatedAt" | "views" | "reactions"
>;

// Helper type for product sorting
export type SortOption = {
  id: string;
  label: {
    fa: string;
    en: string;
  };
  value: AppliedFilters["sortBy"];
};

// Helper type for product status badge colors
export type StatusColorMap = {
  [key in Product["status"]]: {
    bg: string;
    text: string;
    label: {
      fa: string;
      en: string;
    };
  };
};

// Helper type for currency formatting
export interface CurrencyFormat {
  code: string;
  symbol: string;
  locale: string;
  minFractionDigits: number;
  maxFractionDigits: number;
}

// Review/rating types (optional)
export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  images?: string[];
  verifiedPurchase: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Inventory types (optional)
export interface ProductInventory {
  productId: string;
  quantity: number;
  reserved: number;
  available: number;
  lastRestocked?: string;
  nextRestock?: string;
  location: string;
  warehouse: string;
}

// Price history (optional)
export interface PriceHistory {
  productId: string;
  price: number;
  salePrice?: number;
  effectiveFrom: string;
  effectiveTo?: string;
  reason?: string;
}

// Bulk import types
export interface ProductImportResult {
  success: boolean;
  productId?: string;
  errors?: string[];
  warnings?: string[];
}

export interface ProductExportFilter {
  categories?: string[];
  status?: Product["status"][];
  dateFrom?: string;
  dateTo?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
}

// Analytics types
export interface ProductAnalytics {
  productId: string;
  views: number;
  uniqueViews: number;
  addToCart: number;
  purchases: number;
  revenue: number;
  conversionRate: number;
  averageRating: number;
  totalReviews: number;
  period: "day" | "week" | "month" | "year";
  date: string;
}

export interface FilterState {
  categories: string[];
  subcategories: string[];
  materials: string[];
  colors: string[];
  tags: string[];
  sizes: string[];
  priceRange: {
    min: number | null;
    max: number | null;
  };
  badges: string[];
  search: string;
  sortBy: "newest" | "popular" | "price-asc" | "price-desc" | "relevance";
  inStock: boolean;
  onSale: boolean;
}
