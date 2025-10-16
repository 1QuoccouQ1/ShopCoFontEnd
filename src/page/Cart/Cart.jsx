"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Minus, Plus, Trash2, Tag, ArrowRight } from "lucide-react";
import { useCart } from "../../hooks/useCart/useCart";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  const [promoCode, setPromoCode] = useState("");

  const discountPercent = 0; // bạn có thể điều chỉnh hoặc đọc từ API
  const discount = Math.round(subtotal * (discountPercent / 100));
  const deliveryFee = cart.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-gray-500 hover:text-black">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-black mb-8">YOUR CART</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              Giỏ hàng của bạn đang trống.
            </p>
            <Link to="/">
              <Button className="bg-black text-white hover:bg-gray-800">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}`}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  {/* Product product_image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={
                        item.product_image?.startsWith("http")
                          ? item.product_image
                          : `http://localhost:1337${item.product_image}`
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-black">
                        {item.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          removeFromCart(item.id, item.size, item.color)
                        }
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-sm text-gray-600 mb-2">
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-black">
                        ${item.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.color, -1)
                          }
                          className="w-8 h-8 p-0 hover:bg-gray-200"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.color, 1)
                          }
                          className="w-8 h-8 p-0 hover:bg-gray-200"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold text-black mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-black">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Discount (-{discountPercent}%)</span>
                      <span className="font-medium text-red-500">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-black">
                      ${deliveryFee.toFixed(2)}
                    </span>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-lg font-bold text-black">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Add promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="pl-10 bg-gray-50 border-gray-200"
                      />
                    </div>
                    <Button
                      variant="default"
                      className="bg-black text-white hover:bg-gray-800 px-6"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full bg-black text-white hover:bg-gray-800 py-3 text-base font-medium">
                  <Link to="/Checkout">Go to Checkout</Link>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
