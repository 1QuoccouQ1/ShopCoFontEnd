"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function SearchDropdown() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // 🧠 Gọi API Strapi mỗi khi người dùng nhập từ khóa
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:1337/api/products?filters[name][$containsi]=${encodeURIComponent(
            searchQuery
          )}&populate=image`
        );

        const data = await res.json();
        if (data?.data) {
          const mapped = data.data.map((item) => {
            const img =
              item.image?.[0]?.url ||
              item.image?.url ||
              item.attributes?.image?.data?.[0]?.attributes?.url ||
              "/placeholder.svg";

            return {
              id: item.id,
              name: item.name || item.attributes?.name,
              price: item.price || item.attributes?.price,
              image: img.startsWith("http")
                ? img
                : `http://localhost:1337${img}`,
              documentId: item.documentId,
            };
          });
          setFilteredProducts(mapped);
        } else {
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API tìm kiếm:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchProducts, 400); // ⏳ debounce 400ms
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search for products..."
          className="pl-10 pr-10 bg-muted/50 border-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Dropdown kết quả tìm kiếm */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background  rounded-lg shadow-lg max-h-[480px] overflow-y-auto z-10">
          {loading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Đang tìm sản phẩm...
            </div>
          ) : searchQuery && filteredProducts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Không tìm thấy sản phẩm cho "{searchQuery}"
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Hãy thử với từ khóa khác
              </p>
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 && (
                <>
                  <div className="p-3 border-b border-border">
                    <p className="text-xs font-medium text-muted-foreground">
                      Kết quả cho “{searchQuery}”
                    </p>
                  </div>

                  <div className="p-2">
                    {filteredProducts.slice(0, 5).map((product) => (
                      <Link
                        key={product.id}
                        to={`/DetailProduct/${product.documentId}`}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {product.category || "Product"}
                          </p>
                        </div>
                        <div className="text-sm font-semibold whitespace-nowrap">
                          ${product.price}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
