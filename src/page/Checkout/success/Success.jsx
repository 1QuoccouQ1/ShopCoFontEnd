"use client";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Package,
  MapPin,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  const [orderDetails, setOrderDetails] = useState(null);

  // ✅ Lấy dữ liệu từ sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("orderDetails");
    if (stored) {
      try {
        setOrderDetails(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse order details:", err);
      }
    }
     return () => {
    sessionStorage.removeItem("orderDetails");
  };
  }, []);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-muted-foreground">
        No order found. Please go back to checkout.
      </div>
    );
  }

  const {
    MDH,
    fullName,
    address,
    phone,
    paymentMethod,
    total,
    createdAt,
  } = orderDetails;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Cart</span>
          <ChevronRight className="h-4 w-4" />
          <span>Checkout</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Order Confirmation</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <CheckCircle2 className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="mb-2 font-sans text-4xl font-bold uppercase tracking-tight text-foreground">
            ORDER PLACED SUCCESSFULLY!
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <div className="mb-6 rounded-lg border border-border bg-card p-6">
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="text-lg font-semibold text-foreground">
                #{MDH}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="text-lg font-semibold text-foreground">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-foreground" />
                <h3 className="font-semibold text-foreground">
                  Shipping Address
                </h3>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{fullName}</p>
                <p>{address}</p>
                <p>Phone: {phone}</p>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-foreground" />
                <h3 className="font-semibold text-foreground">
                  Payment Method
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">{paymentMethod}</p>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <Package className="h-5 w-5 text-foreground" />
                <h3 className="font-semibold text-foreground">
                  Order Total
                </h3>
              </div>
              <p className="text-2xl font-bold text-foreground">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* <Button
            asChild
            className="flex-1 rounded-lg bg-primary py-6 text-base font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/orders">View Order Details</Link>
          </Button> */}
          <Button
            asChild
            variant="outline"
            className="flex-1 rounded-lg border-2 border-border py-6 text-base font-medium hover:bg-muted bg-transparent"
          >
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
