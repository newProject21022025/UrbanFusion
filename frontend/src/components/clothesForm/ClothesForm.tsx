import { useState } from "react";
import styles from "./ClothesForm.module.css";
import BasicInfoSection from "./BasicInfoSection";
import ImageSection from "./ImageSection";
import PriceSection from "./PriceSection";
import CategorySection from "./CategorySection";
import StockSection from "./StockSection";
import CareInstructionsSection from "./CareInstructionsSection";
import DetailsSection from "./DetailsSection";

interface Name {
  en: string;
  uk: string;
}

interface Description {
  en: string;
  uk: string;
}

interface ImageAlt {
  en: string;
  uk: string;
}

interface Image {
  url: string;
  alt: ImageAlt;
}

interface Price {
  amount: number;
  currency: string;
  discount: number;
}

interface Category {  
  en: string;
  uk: string;
}

interface StockColor {
  code: string;
  en: string;
  uk: string;
}

interface StockSize {
  size: string;
  quantity: number;
}

interface StockItem {
  color: StockColor;
  sizes: StockSize[];
}

interface CareInstruction {
  en: string;
  uk: string;
}

interface Detail {
  en: string;
  uk: string;
}

export interface FormData {
  // slug: string;
  name: Name;
  description: Description;
  mainImage: Image;
  price: Price;
  availability: boolean;
  category: Category;
  stock: StockItem[];
  careInstructions: CareInstruction[];
  details: Detail[];
  gender: "male" | "female";
}

export default function ClothesForm() {
  const [formData, setFormData] = useState<FormData>({  
    name: { en: "", uk: "" },
    description: { en: "", uk: "" },
    mainImage: {
      url: "",
      alt: { en: "", uk: "" },
    },
    price: {
      amount: 0,
      currency: "USD",
      discount: 0,
    },
    availability: true,
    category: {      
      en: "",
      uk: "",
    },   
    stock: [
      {
        color: { code: "", en: "", uk: "" },
        sizes: [{ size: "", quantity: 0 }],
      },
    ],
    careInstructions: [{ en: "", uk: "" }],
    details: [{ en: "", uk: "" }],
    gender: "male",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    if (name.includes(".")) {
      const [parent, child, subChild] = name.split(".");

      setFormData((prev) => {
        if (
          subChild &&
          parent in prev &&
          typeof prev[parent as keyof FormData] === "object" &&
          child in (prev[parent as keyof FormData] as object)
        ) {
          return {
            ...prev,
            [parent]: {
              ...(prev[parent as keyof FormData] as unknown as Record<
                string,
                unknown
              >),
              [child]: {
                ...((
                  prev[parent as keyof FormData] as unknown as Record<
                    string,
                    unknown
                  >
                )[child] as Record<string, unknown>),
                [subChild]: type === "number" ? Number(value) : value,
              },
            },
          };
        } else if (
          parent in prev &&
          typeof prev[parent as keyof FormData] === "object" &&
          child in (prev[parent as keyof FormData] as object)
        ) {
          return {
            ...prev,
            [parent]: {
              ...(prev[parent as keyof FormData] as unknown as Record<
                string,
                unknown
              >),
              [child]: type === "number" ? Number(value) : value,
            },
          };
        }
        return prev;
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
            ? Number(value)
            : value,
      }));
    }
  };

  const handleStockChange = (
    index: number,
    field: string, // Змінити на string
    value: string | number,
    sizeIndex?: number
  ) => {
    setFormData(prev => {
      const updatedStock = [...prev.stock];
      const stockItem = updatedStock[index];
      
      if (sizeIndex !== undefined) {
        
        if (field !== 'size' && field !== 'quantity') return prev;
        
        const updatedSizes = [...stockItem.sizes];
        updatedSizes[sizeIndex] = {
          ...updatedSizes[sizeIndex],
          [field]: field === 'quantity' ? Number(value) : value
        };
        
        updatedStock[index] = {
          ...stockItem,
          sizes: updatedSizes
        };
      } else {
        
        if (field !== 'code' && field !== 'en' && field !== 'uk') return prev;
        
        updatedStock[index] = {
          ...stockItem,
          color: {
            ...stockItem.color,
            [field]: value
          }
        };
      }
      return {
        ...prev,
        stock: updatedStock,
      };
    });
  };

  const handleArrayChange = (
    arrayName: "careInstructions" | "details", 
    index: number,
    field: "en" | "uk",
    value: string
  ) => {
    setFormData((prev) => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index] = {
        ...(updatedArray[index] as CareInstruction | Detail),
        [field]: value,
      };
      return {
        ...prev,
        [arrayName]: updatedArray,
      };
    });
  };

  const addStockItem = () => {
    setFormData((prev) => ({
      ...prev,
      stock: [
        ...prev.stock,
        {
          color: { code: "", en: "", uk: "" },
          sizes: [{ size: "", quantity: 0 }],
        },
      ],
    }));
  };

  const addSize = (stockIndex: number) => {
    const updatedStock = [...formData.stock];
    updatedStock[stockIndex].sizes.push({ size: "", quantity: 0 });
    setFormData((prev) => ({
      ...prev,
      stock: updatedStock,
    }));
  };

  const addArrayItem = (arrayName: "careInstructions" | "details") => { 
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { en: "", uk: "" }],
    }));
  };

  const removeStockItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stock: prev.stock.filter((_, i) => i !== index),
    }));
  };

  const removeSize = (stockIndex: number, sizeIndex: number) => {
    const updatedStock = [...formData.stock];
    updatedStock[stockIndex].sizes = updatedStock[stockIndex].sizes.filter(
      (_, i) => i !== sizeIndex
    );
    setFormData((prev) => ({
      ...prev,
      stock: updatedStock,
    }));
  };

  const removeArrayItem = (
    arrayName: "careInstructions" | "details", 
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(        
        `https://urban-fusion-amber.vercel.app/uk/clothes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("API URL:", `${process.env.BACKEND_URL}/clothes`);

      const result = await response.json();
      console.log("Success:", result);
      alert("Clothes item created successfully!");      
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating clothes item");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <BasicInfoSection formData={formData} handleChange={handleChange} />
      <ImageSection formData={formData} handleChange={handleChange} />
      <PriceSection
        formData={formData}
        handleChange={handleChange}
        setFormData={setFormData}
      />
      <CategorySection formData={formData} handleChange={handleChange} />    
      <StockSection
        formData={formData}
        handleStockChange={handleStockChange}
        addStockItem={addStockItem}
        removeStockItem={removeStockItem}
        addSize={addSize}
        removeSize={removeSize}
      />
      <CareInstructionsSection
        formData={formData}
        handleArrayChange={handleArrayChange}
        removeArrayItem={removeArrayItem}
        addArrayItem={addArrayItem}
      />
      <DetailsSection
        formData={formData}
        handleArrayChange={handleArrayChange}
        removeArrayItem={removeArrayItem}
        addArrayItem={addArrayItem}
      />
      <button type="submit" className={styles.submitButton}>
        Create Clothes Item
      </button>
    </form>
  );
}
