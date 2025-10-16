import React, { useEffect, useState } from "react";
import { ProductCard } from "./product-card";

const API_URL =
  "http://localhost:1337/api/products?populate=image&pagination[page]=1&pagination[pageSize]=9";

export function ProductGrid({ sortBy, page, setPagination, filters }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let apiUrl = `http://localhost:1337/api/products?populate=image&pagination[page]=${page}&pagination[pageSize]=9`;

        if (sortBy === "Most Selling") {
          apiUrl += "&sort=sold_count:desc"; // ví dụ bạn có trường `sold`
        } else if (sortBy === "Most Popular") {
          apiUrl += "&sort=average_rating:desc"; // ví dụ bạn có trường `rating`
        }

        // Filters
        if (filters) {
          const { priceMin, priceMax, colors, size } = filters;

          if (priceMin !== undefined)
            apiUrl += `&filters[price][$gte]=${priceMin}`;
          if (priceMax !== undefined)
            apiUrl += `&filters[price][$lte]=${priceMax}`;
          if (colors?.length)
            apiUrl += colors
              .map(
                (c) =>
                  `&filters[colorOption][Name][$in]=${encodeURIComponent(c)}`
              )
              .join("");
          if (size)
            apiUrl += `&filters[sizeOption][Name][$eq]=${encodeURIComponent(
              size
            )}`;
        }

        const res = await fetch(apiUrl);
        const data = await res.json();

        // Map dữ liệu từ Strapi về định dạng giống ProductCard
        const mappedProducts = data.data.map((item) => {
          const imageUrl = item.image?.[0]?.url
            ? `http://localhost:1337${item.image[0].url}`
            : "/placeholder.svg";

          const isSale = item.is_sale && item.sale_price;
          const discount = isSale
            ? Math.round(((item.price - item.sale_price) / item.price) * 100)
            : null;

          return {
            id: item.id,
            documentId: item.documentId,
            name: item.name,
            price: isSale ? item.sale_price : item.price,
            originalPrice: isSale ? item.price : null,
            discount: discount,
            rating: item.average_rating || 0,
            reviews: item.reviews_count || 0,
            image: imageUrl,
            featured: item.featured || false,
          };
        });

        setProducts(mappedProducts);
        setPagination(data.meta?.pagination || { page: 1, pageCount: 1 });
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [sortBy, page, filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-muted-foreground">
        <span>Loading products...</span>
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm mt-1">
          Try adjusting your filters or reset them.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {products.length > 0 &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}
