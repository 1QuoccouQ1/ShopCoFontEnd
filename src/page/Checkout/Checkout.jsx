import { useEffect, useState } from "react";
import CheckoutForm from "./components/checkout-form";
import OrderSummary from "./components/order-summary";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart/useCart";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const validateForm = () => {
    const { fullName, email, phone, address } = formData;

    if (!fullName || !email || !phone || !address) {
      setError("Please fill out all required fields.");
      return false;
    }

    // Email regex cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    // Phone regex cơ bản (10–15 số)
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number.");
      return false;
    }

    return true;
  };

  // 🔹 Gửi đơn hàng
  const handlePlaceOrder = async () => {
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const savedUser = localStorage.getItem("user");
      const user = savedUser ? JSON.parse(savedUser) : null;

      const payload = {
        data: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          note: formData.note || "",
          paymentMethod: paymentMethod,
          userId: user ? user.id : null,
          cartItems: cartItems.map((item) => ({
            product_name: item.name,
            product_image: item.product_image,
            price: item.price,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          })),
        },
      };

      const res = await fetch("http://localhost:1337/api/orders/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order failed");

      if (!user) {
        const localOrders = JSON.parse(
          localStorage.getItem("guestOrders") || "[]"
        );

        const newOrder = {
          id: data?.orderId,
          MDH: data?.MDH,
          documentId: data?.documentId,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          note: formData.note || "",
          payment_method: formData.paymentMethod || "cod",
          total_price: data?.total || 0,
          statusOrder: "pending",
          order_items: cartItems,
          createdAt: new Date().toISOString(),
        };

        localOrders.push(newOrder);
        localStorage.setItem("guestOrders", JSON.stringify(localOrders));
      }

      setCartItems([]);

      sessionStorage.setItem("orderDetails", JSON.stringify(data));

      if (paymentMethod === "cod") {
        clearCart();
        navigate("/Success-Checkout");
      } else if (paymentMethod === "QRcode") {
        navigate("/Pending-Checkout");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Cart</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Checkout</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-sans text-4xl font-bold uppercase tracking-tight text-foreground">
          CHECKOUT
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm
              onFormChange={setFormData}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              loading={loading}
              error={error}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
