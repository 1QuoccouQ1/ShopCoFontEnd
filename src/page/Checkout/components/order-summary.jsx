"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CheckoutPage({
  cartItems = [],
  loading,
  error,
  onPlaceOrder,
}) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountPercent = 0;
  const discount = subtotal * (discountPercent / 100);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Hiển thị sản phẩm trong cart */}
      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.color}-${item.size}`}
            className="flex justify-between border p-4 rounded-lg"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                Size: {item.size} • Color: {item.color}
              </p>
            </div>
            <p className="font-medium">
              {item.quantity} × ${item.price}
            </p>
          </div>
        ))}
      </div>

      {/* Tóm tắt đơn hàng */}
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery Fee</span>
            <span>${deliveryFee}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-black">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <Button
          className="mt-6 w-full bg-black text-white hover:bg-gray-800 py-3 text-base font-medium"
          disabled={loading}
          onClick={onPlaceOrder}
        >
          {loading ? "Placing Order..." : "Place Order"}{" "}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
