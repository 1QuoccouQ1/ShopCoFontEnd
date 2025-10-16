import {
  X,
  Star,
  Twitter,
  Facebook,
  Instagram,
  Github,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "@/images/Rectangle3.png";
import Casual from "@/images/image 11.png";
import Formal from "@/images/image 13.png";
import Party from "@/images/image 12.png";
import Gym from "@/images/image 14.png";
import EmblaCarousel from "../../hooks/useCarousel/EmblaCarousel";
import { useEffect, useState } from "react";
import { fetchAPI } from "../../services/apiService";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [productsTopSale, setProductsTopSale] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const [isLoading, setIsLoading] = useState(true);

  if (token) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.setItem("jwt", token);
    const decoded = jwtDecode(token);
    localStorage.setItem("user", JSON.stringify(decoded));
    window.history.replaceState({}, document.title, "/");
  }
  useEffect(() => {
    // Dùng Promise.all để chờ tất cả fetch cùng lúc
    Promise.all([
      fetchAPI("/home-banners?filters[isFeatured][$eq]=true&populate=image"),
      fetchAPI(
        "/products?populate=image&pagination[page]=1&pagination[pageSize]=4"
      ),
      fetchAPI(
        "/products?populate=image&sort=sold_count:desc&pagination[page]=1&pagination[pageSize]=4"
      ),
      fetchAPI("/reviews?populate=*"),
    ])
      .then(([bannerRes, productRes, topSaleRes, reviewRes]) => {
        setBanners(bannerRes.data?.[0] || null);
        setProducts(productRes.data || []);
        setProductsTopSale(topSaleRes.data || []);
        setReviews(reviewRes.data || []);
      })
      .catch((err) => console.error("Error loading dashboard data:", err))
      .finally(() => setIsLoading(false)); // kết thúc => tắt loading
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black mx-auto mb-4"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 pt-16 lg:pt-24 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center inset-0 absolute">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-6xl font-black text-black leading-tight">
                    FIND CLOTHES THAT MATCHES YOUR STYLE
                  </h1>
                  <p className="text-gray-600 text-lg max-w-lg">
                    Browse through our diverse range of meticulously crafted
                    garments, designed to bring out your individuality and cater
                    to your sense of style.
                  </p>
                </div>

                <Button className="bg-black text-white px-12 py-6 text-lg rounded-full hover:bg-gray-800">
                  Shop Now
                </Button>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 pt-8">
                  <div>
                    <div className="text-3xl lg:text-4xl font-bold text-black">
                      200+
                    </div>
                    <div className="text-gray-600">International Brands</div>
                  </div>
                  <div className="border-l border-gray-300 pl-8">
                    <div className="text-3xl lg:text-4xl font-bold text-black">
                      2,000+
                    </div>
                    <div className="text-gray-600">High-Quality Products</div>
                  </div>
                  <div className="border-l border-gray-300 pl-8">
                    <div className="text-3xl lg:text-4xl font-bold text-black">
                      30,000+
                    </div>
                    <div className="text-gray-600">Happy Customers</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative ">
                {/* <img
                  src={HeroImage}
                  alt="Stylish couple wearing trendy clothing"
                  className="w-full h-auto object-cover"
                /> */}

                {/* Decorative Stars */}
                <div className="absolute top-12 right-8">
                  <Star className="h-12 w-12 text-black fill-black" />
                </div>
                <div className="absolute bottom-24 left-8">
                  <Star className="h-8 w-8 text-black fill-black" />
                </div>
              </div>
            </div>

            <img
              src={`http://localhost:1337${banners?.image?.url}`}
              alt={banners.length > 0 ? banners[0]?.title : "Banner"}
              className="w-full h-auto object-cover"
            />
          </div>
        </section>

        {/* Brand Logos Section */}
        <section className="bg-black py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between flex-wrap gap-8">
              <div className="text-white text-2xl lg:text-3xl font-bold tracking-wider">
                VERSACE
              </div>
              <div className="text-white text-2xl lg:text-3xl font-bold tracking-wider">
                ZARA
              </div>
              <div className="text-white text-2xl lg:text-3xl font-bold tracking-wider">
                GUCCI
              </div>
              <div className="text-white text-2xl lg:text-3xl font-bold tracking-wider">
                PRADA
              </div>
              <div className="text-white text-2xl lg:text-3xl font-bold tracking-wider">
                Calvin Klein
              </div>
            </div>
          </div>
        </section>
        {/* New Arrivals Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-12">
              NEW ARRIVALS
            </h2>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {products &&
                products.length > 0 &&
                products.map((product) => {
                  const imageUrl = product?.image[0]?.url
                    ? `http://localhost:1337${product?.image[0]?.url}`
                    : "/placeholder.png";

                  // Tính % giảm (nếu có)
                  const discountPercent =
                    product.is_sale && product.sale_price
                      ? Math.round(
                          ((product.price - product.sale_price) /
                            product.price) *
                            100
                        )
                      : 0;

                  // Hàm format USD
                  const formatUSD = (value) =>
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(value);

                  return (
                    <Link
                      to={`/DetailProduct/${product.documentId}`}
                      className="group cursor-pointer"
                      key={product.id}
                    >
                      {/* Hình ảnh */}
                      <div className="bg-gray-100 rounded-2xl p-4 mb-4 aspect-square flex items-center justify-center">
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Tên sản phẩm */}
                      <h3 className="font-semibold text-lg mb-2">
                        {product.name}
                      </h3>

                      {/* Rating (demo cứng) */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">5.0/5</span>
                      </div>

                      {/* Giá */}
                      {product.is_sale && product.sale_price ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-red-600">
                            {formatUSD(product.sale_price)}
                          </span>
                          <span className="text-gray-500 line-through">
                            {formatUSD(product.price)}
                          </span>
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                            -{discountPercent}%
                          </span>
                        </div>
                      ) : (
                        <div className="text-xl font-bold">
                          {formatUSD(product.price)}
                        </div>
                      )}
                    </Link>
                  );
                })}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button
                variant="outline"
                className="px-12 py-3 text-lg border-gray-300 hover:bg-gray-50"
              >
                View All
              </Button>
            </div>
          </div>
        </section>
        <hr className="my-8 border-gray-200 max-w-7xl mx-auto" />
        <section className="py-16 px-4 ">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-black mb-12">
              TOP SELLING
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Vertical Striped Shirt */}
              {productsTopSale &&
                productsTopSale.length > 0 &&
                productsTopSale.map((product) => {
                  const imageUrl = product?.image[0]?.url
                    ? `http://localhost:1337${product?.image[0]?.url}`
                    : "/placeholder.png";

                  // Tính % giảm (nếu có)
                  const discountPercent =
                    product.is_sale && product.sale_price
                      ? Math.round(
                          ((product.price - product.sale_price) /
                            product.price) *
                            100
                        )
                      : 0;

                  // Hàm format USD
                  const formatUSD = (value) =>
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(value);

                  return (
                    <Link
                      to={`/DetailProduct/${product.documentId}`}
                      className="group cursor-pointer"
                      key={product.id}
                    >
                      {/* Hình ảnh */}
                      <div className="bg-gray-100 rounded-2xl p-4 mb-4 aspect-square flex items-center justify-center">
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Tên sản phẩm */}
                      <h3 className="font-semibold text-lg mb-2">
                        {product.name}
                      </h3>

                      {/* Rating (demo cứng) */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">5.0/5</span>
                      </div>

                      {/* Giá */}
                      {product.is_sale && product.sale_price ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-red-600">
                            {formatUSD(product.sale_price)}
                          </span>
                          <span className="text-gray-500 line-through">
                            {formatUSD(product.price)}
                          </span>
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                            -{discountPercent}%
                          </span>
                        </div>
                      ) : (
                        <div className="text-xl font-bold">
                          {formatUSD(product.price)}
                        </div>
                      )}
                    </Link>
                  );
                })}
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                className="px-8 py-3 rounded-full border-gray-300 hover:bg-gray-50 bg-transparent"
              >
                View All
              </Button>
            </div>
          </div>
        </section>
        {/* Browse by Dress Style Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-100 rounded-3xl p-8 lg:p-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-center text-black mb-12">
                BROWSE BY DRESS STYLE
              </h2>

              <div className="w-full space-y-5">
                <div className="flex flex-nowrap gap-5">
                  <div className="bg-white w-1/3 rounded-2xl overflow-hidden relative h-64 lg:h-80 group cursor-pointer hover:shadow-lg transition-shadow">
                    <img
                      src={Casual}
                      alt="Casual style - man in white t-shirt"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6">
                      <h3 className="text-2xl lg:text-3xl font-bold text-black">
                        Casual
                      </h3>
                    </div>
                  </div>

                  {/* Formal */}
                  <div className="bg-white w-2/3 rounded-2xl overflow-hidden relative h-64 lg:h-80 group cursor-pointer hover:shadow-lg transition-shadow">
                    <img
                      src={Formal}
                      alt="Formal style - man in checkered blazer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6">
                      <h3 className="text-2xl lg:text-3xl font-bold text-black">
                        Formal
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex flex-nowrap gap-5">
                  {/* Party */}
                  <div className="bg-white w-2/3 rounded-2xl overflow-hidden relative h-64 lg:h-80 group cursor-pointer hover:shadow-lg transition-shadow">
                    <img
                      src={Party}
                      alt="Party style - woman in off-shoulder sweater"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6">
                      <h3 className="text-2xl lg:text-3xl font-bold text-black">
                        Party
                      </h3>
                    </div>
                  </div>
                  {/* Gym */}
                  <div className="bg-white w-1/3 rounded-2xl overflow-hidden relative h-64 lg:h-80 group cursor-pointer hover:shadow-lg transition-shadow">
                    <img
                      src={Gym}
                      alt="Gym style - woman in athletic wear with dumbbells"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6">
                      <h3 className="text-2xl lg:text-3xl font-bold text-black">
                        Gym
                      </h3>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Customer Testimonials Section */}
        <section className="py-16 px-4">
          <div className="max-w-[1500px] mx-auto">
            <EmblaCarousel
              options={{ loop: true }}
              title={"OUR HAPPY CUSTOMERS"}
              reviews={reviews}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
