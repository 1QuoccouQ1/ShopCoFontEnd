import { Star, StarHalf } from "lucide-react";
import { Link } from "react-router-dom";

export function ProductCard({ product }) {
const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => {
    if (i + 1 <= rating) {
      // sao đầy
      return (
        <Star
          key={i}
          className="h-4 w-4 fill-[color:var(--color-rating)] text-[color:var(--color-rating)]"
        />
      );
    } else if (i < rating && rating < i + 1) {
      // sao nửa
      return (
        <StarHalf
          key={i}
          className="h-4 w-4 fill-[color:var(--color-rating)] text-[color:var(--color-rating)]"
        />
      );
    } else {
      // sao trống
      return <Star key={i} className="h-4 w-4 text-gray-300" />;
    }
  });
};
  return (
    <Link to={`/DetailProduct/${product.documentId}`}>
    <div
      className={`bg-[color:var(--color-product-card-bg)] rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
        product.featured ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="aspect-square bg-gray-100 relative">
        {/* Dùng img thay vì next/image */}
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
       
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-balance">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          {renderStars(product.rating)}
          <span className="text-sm text-muted-foreground ml-1">
            {product.rating}/5
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[color:var(--color-price)]">
            ${product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
              <span className="text-sm text-[color:var(--color-discount)] font-medium bg-red-100 rounded-full px-2 py-1 ">
                -{product.discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}
