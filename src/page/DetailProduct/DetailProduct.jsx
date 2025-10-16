"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Star,
  Minus,
  Plus,
  MoreHorizontal,
  Filter,
  ChevronDown,
  Check,
} from "lucide-react";
import EmblaCarousel from "../../hooks/useThumbnailsProduct/useThumbnails";
import { useParams } from "react-router-dom";
import { StarHalf } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useCart } from "../../hooks/useCart/useCart";
import { ReviewModal } from "./components/review-modal";
import { toast } from "react-toastify";

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    // ✅ Kiểm tra xem user đã chọn đủ option chưa
    if (!selectedColor || !selectedSize) {
      toast.error(
        "Vui lòng chọn màu sắc và kích thước trước khi thêm vào giỏ hàng!"
      );
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      product_image: product.image?.[0]?.url || "",
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    toast.success("Đã thêm sản phẩm vào giỏ hàng !");
  };

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/products?populate=image&pagination[limit]=4"
        );
        const data = await res.json();

        if (data.data) {
          const mapped = data.data.map((item) => {
            const imgUrl = item.image?.[0]?.url
              ? `http://localhost:1337${item.image[0].url}`
              : "/placeholder.svg";

            const isSale = item.is_sale && item.sale_price;
            const discount = isSale
              ? Math.round(((item.price - item.sale_price) / item.price) * 100)
              : null;

            return {
              id: item.id,
              name: item.name,
              image: imgUrl,
              rating: item.average_rating || 4,
              currentPrice: isSale ? item.sale_price : item.price,
              originalPrice: isSale ? item.price : null,
              discount,
            };
          });

          setRecommendedProducts(mapped);
        }
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm gợi ý:", err);
      }
    };

    fetchRecommended();
  }, []);

  // 🔹 Fetch sản phẩm từ Strapi
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // 🧠 Gọi song song 2 API cùng lúc để tiết kiệm thời gian
        const [productRes] = await Promise.all([
          fetch(
            `http://localhost:1337/api/products/${id}?` +
              `populate[reviews][populate][users_permissions_user][fields][0]=username&` +
              `populate[reviews][populate][users_permissions_user][fields][1]=email&` +
              `populate[image][fields][0]=url&` +
              `populate[image][fields][1]=name&` +
              `populate[category][fields][0]=title&` +
              `populate[colorOption][fields][0]=Name&` +
              `populate[sizeOption][fields][0]=Name`
          ),
        ]);

        const productData = await productRes.json();

        // Kiểm tra có sản phẩm không
        if (!productData.data) throw new Error("Product not found");

        const item = productData.data;
        const isSale = item.is_sale && item.sale_price;
        const discount = isSale
          ? Math.round(((item.price - item.sale_price) / item.price) * 100)
          : null;

        // 🧩 Chuẩn hóa dữ liệu sản phẩm
        const formattedProduct = {
          id: item.id,
          documentId: item.documentId,
          name: item.name,
          short_description: item.short_description,
          description: item.description,
          price: isSale ? item.sale_price : item.price,
          originalPrice: isSale ? item.price : null,
          discount,
          rating: item.average_rating || 0,
          reviews_count: item.reviews_count || 0,
          image: item.image || [],
          colors: item.colorOption || [],
          sizes: item.sizeOption || [],
        };

        // 🧩 Chuẩn hóa dữ liệu review
        const formattedReviews = (item?.reviews || []).map((r) => ({
          id: r.id,
          name: r.users_permissions_user.username,
          rating: r.rating,
          text: r.comment,
          verified: true,
          date: new Date(r.createdAt).toLocaleDateString(),
        }));

        setProduct(formattedProduct);
        setReviews(formattedReviews);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Không thể tải dữ liệu sản phẩm hoặc đánh giá.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Đang tải sản phẩm...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        <p>{error}</p>
      </div>
    );

  if (!product) return null;

  const {
    name,
    short_description,
    price,
    originalPrice,
    discount,
    colors,
    sizes,
    image,
  } = product;

  // ⭐ render sao đánh giá (tạm cứng 4.5)
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
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <nav className="px-6 py-4 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-foreground cursor-pointer">Shop</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{name}</span>
          </div>
        </div>
      </nav>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Carousel */}
          <div className="lg:col-span-8">
            {image.length > 0 ? (
              <EmblaCarousel images={image} options={{ loop: true }} />
            ) : (
              <div className="w-full h-[400px] bg-muted flex items-center justify-center rounded-lg">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tên & Đánh giá */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">{renderStars(4.5)}</div>
                <span className="text-sm text-muted-foreground">4.5/5</span>
              </div>
            </div>

            {/* Giá */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">${price}</span>
              {originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${originalPrice}
                </span>
              )}
              {discount && (
                <span className="text-sm font-medium text-destructive bg-destructive/10 px-2 py-1 rounded">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Mô tả */}
            <p className="text-muted-foreground leading-relaxed">
              {short_description}
            </p>

            {/* Màu sắc */}
            {colors?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Select Color</h3>
                <div className="flex gap-3">
                  {colors.map((color) => {
                    const colorName = color.Name || color.name || color; // fallback nếu là string
                    return (
                      <button
                        key={color.id || colorName}
                        onClick={() => setSelectedColor(colorName)}
                        className={`w-8 h-8 rounded-full border-2 transition ${
                          selectedColor === colorName
                            ? "border-primary ring-2 ring-ring"
                            : "border-border"
                        }`}
                        style={{ backgroundColor: colorName }}
                        title={colorName}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Kích thước */}
            {sizes?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => {
                    const sizeName = size.Name || size.name || size;
                    return (
                      <button
                        key={size.id || sizeName}
                        onClick={() => setSelectedSize(sizeName)}
                        className={`px-4 py-2 rounded-md border ${
                          selectedSize === sizeName
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        {sizeName}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Số lượng & Add to Cart */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-muted transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-muted transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button className="flex-1" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          {/* Tab Navigation */}
          <div className="border-b border-border">
            <div className="flex items-center justify-center">
              <nav className="flex space-x-8">
                {[
                  { id: "details", label: "Product Details" },
                  { id: "reviews", label: "Rating & Reviews" },
                  { id: "faqs", label: "FAQs" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Reviews Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    All Reviews{" "}
                    <span className="text-muted-foreground font-normal text-base">
                      ({reviews.length})
                    </span>
                  </h2>
                  <div className="flex items-center gap-3">
                    <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 hover:bg-muted transition-colors cursor-pointer">
                      <span className="text-sm">Latest</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setIsModalOpen(true)}
                      className="bg-foreground text-background hover:bg-foreground/90"
                    >
                      Write a Review
                    </Button>
                  </div>
                </div>

                {/* Reviews Grid */}
                {reviews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-border rounded-lg p-6 space-y-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                          <button className="text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            {review.name}
                          </span>
                          {review.verified && (
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {review.text}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Posted on {review.date}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Chưa có đánh giá nào cho sản phẩm này.
                  </p>
                )}

                {/* Load More Button */}
                <div className="flex justify-center pt-6">
                  <Button variant="outline" className="px-8 bg-transparent">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            )}
            <ReviewModal open={isModalOpen} onOpenChange={setIsModalOpen} productId={product?.id} />

            {activeTab === "details" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Product Details
                </h2>

                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <ReactMarkdown>{product?.description || ""}</ReactMarkdown>
                </div>
              </div>
            )}

            {activeTab === "faqs" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">
                      What is the fabric composition?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      This t-shirt is made from 100% premium cotton for maximum
                      comfort and breathability.
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">
                      How should I care for this t-shirt?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Machine wash cold with like colors. Tumble dry low or hang
                      dry for best results.
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <h3 className="font-medium text-foreground mb-2">
                      What is your return policy?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      We offer a 30-day return policy for unworn items in
                      original condition with tags attached.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground text-balance">
              YOU MIGHT ALSO LIKE
            </h2>
          </div>

          {recommendedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                      <span className="text-sm text-muted-foreground ml-1">
                        {product.rating}/5
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">
                        ${product.currentPrice}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                          <span className="text-xs font-medium text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">
                            -{product.discount}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Không có sản phẩm gợi ý.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
