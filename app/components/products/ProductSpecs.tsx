// app/components/products/ProductSpecs.tsx
"use client";

import { Product } from "@/types/product";

interface ProductSpecsProps {
  product: Product;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  const specs = product.specifications;

  if (!specs || Object.keys(specs).length === 0) {
    return null;
  }

  const specLabels: Record<string, { fa: string; en: string }> = {
    size: { fa: "سایز", en: "Size" },
    lengthCm: { fa: "طول (سانتی‌متر)", en: "Length (cm)" },
    lengthMm: { fa: "طول (میلی‌متر)", en: "Length (mm)" },
    diameterCm: { fa: "قطر (سانتی‌متر)", en: "Diameter (cm)" },
    diameterMm: { fa: "قطر (میلی‌متر)", en: "Diameter (mm)" },
    weightG: { fa: "وزن (گرم)", en: "Weight (g)" },
    material: { fa: "جنس", en: "Material" },
    flexibility: { fa: "انعطاف‌پذیری", en: "Flexibility" },
    vibrationModes: { fa: "مدل‌های ویبره", en: "Vibration Modes" },
    batteryType: { fa: "نوع باتری", en: "Battery Type" },
    remoteRange: { fa: "برد ریموت (متر)", en: "Remote Range (m)" },
    appControl: { fa: "کنترل با اپلیکیشن", en: "App Control" },
    waterproof: { fa: "ضدآب", en: "Waterproof" },
    suctionCup: { fa: "چسبدار", en: "Suction Cup" },
    harnessCompatible: {
      fa: "قابل نصب بر روی کمربند",
      en: "Harness Compatible",
    },
  };

  const specValues: Record<string, { fa: string; en: string }> = {
    xs: { fa: "XXS", en: "XXS" },
    s: { fa: "کوچک", en: "Small" },
    m: { fa: "متوسط", en: "Medium" },
    l: { fa: "بزرگ", en: "Large" },
    xl: { fa: "بزرگتر", en: "XL" },
    xxl: { fa: "غول", en: "XXL" },
    adjustable: { fa: "قابل تنظیم", en: "Adjustable" },
    low: { fa: "کم", en: "Low" },
    medium: { fa: "متوسط", en: "Medium" },
    high: { fa: "زیاد", en: "High" },
    rechargeable: { fa: "شارژی", en: "Rechargeable" },
    battery: { fa: "باتری خور", en: "Battery" },
    electric: { fa: "برقی", en: "Electric" },
    "magnetic-rechargeable": {
      fa: "شارژی مغناطیسی",
      en: "Magnetic Rechargeable",
    },
    true: { fa: "بله", en: "Yes" },
    false: { fa: "خیر", en: "No" },
  };

  const formatValue = (key: string, value: any): string => {
    if (typeof value === "boolean") {
      return specValues[String(value)]?.fa || (value ? "بله" : "خیر");
    }

    if (typeof value === "string") {
      const lower = value.toLowerCase();
      return specValues[lower]?.fa || value;
    }

    return String(value);
  };

  const getLabel = (key: string): string => {
    return specLabels[key]?.fa || key;
  };

  // Filter out empty or null values
  const filteredSpecs = Object.entries(specs).filter(
    ([, value]) => value !== null && value !== undefined && value !== "",
  );

  if (filteredSpecs.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">مشخصات فنی</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 glass rounded-xl p-6">
        {filteredSpecs.map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0"
          >
            <span className="text-muted text-sm">{getLabel(key)}</span>
            <span className="font-medium text-sm">
              {formatValue(key, value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
