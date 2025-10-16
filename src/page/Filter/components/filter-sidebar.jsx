"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const colors = [
  { name: "Green", value: "bg-green-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Yellow", value: "bg-yellow-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Cyan", value: "bg-cyan-500" },
  { name: "Blue", value: "bg-blue-600" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "White", value: "bg-white border border-gray-300" },
  { name: "Black", value: "bg-black" },
];
const sizes = ["Small", "Medium", "Large", "X-Large"];
const dressStyles = ["Casual", "Formal", "Party", "Gym"];

export function FilterSidebar({ setFilters }) {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    colors: true,
    size: true,
    dressStyle: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleColor = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  const applyFilters = () => {
    setFilters({
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      colors: selectedColors,
      size: selectedSize,
      style: selectedStyle,
    });
  };

  return (
    <div className="w-80 bg-[color:var(--color-filter-bg)] border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
      </div>

      {/* Price */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full py-3 text-left"
        >
          <span className="font-medium">Price</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.price && (
          <div className="mt-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={300}
              min={0}
              step={10}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("colors")}
          className="flex items-center justify-between w-full py-3 text-left"
        >
          <span className="font-medium">Colors</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              expandedSections.colors ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.colors && (
          <div className="grid grid-cols-5 gap-3 mt-4">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`w-8 h-8 rounded-full ${color.value} ${
                  selectedColors.includes(color.name)
                    ? "ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Size */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("size")}
          className="flex items-center justify-between w-full py-3 text-left"
        >
          <span className="font-medium">Size</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              expandedSections.size ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.size && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  selectedSize === size
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:bg-muted"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dress Style */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("dressStyle")}
          className="flex items-center justify-between w-full py-3 text-left"
        >
          <span className="font-medium">Dress Style</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              expandedSections.dressStyle ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.dressStyle && (
          <div className="mt-4">
            {dressStyles.map((style) => (
              <div
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`flex items-center justify-between py-3 border-b border-border last:border-b-0 cursor-pointer ${
                  selectedStyle === style ? "text-primary font-medium" : ""
                }`}
              >
                <span>{style}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={applyFilters}
      >
        Apply Filter
      </Button>
    </div>
  );
}
