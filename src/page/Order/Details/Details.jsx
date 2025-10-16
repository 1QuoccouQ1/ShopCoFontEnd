import {
  ChevronRight,
  Package,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-800",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-800",
    icon: Package,
  },
  shipping: {
    label: "Shipping",
    className: "bg-sky-100 text-sky-800",
    icon: Package,
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-800",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

export default function OrderDetailsPage() {
  const { state } = useLocation();

  const order = state?.order;

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-8">
        <Package className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">Order not found</h2>
        <p className="text-muted-foreground mb-4">
          The order you are looking for doesn't exist.
        </p>
        <Link
          to="/orders"
          className="rounded-xl bg-foreground px-8 py-3 font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const StatusIcon = statusConfig[order.statusOrder]?.icon || Package;
  const items = order.order_items || [];
  const createdAt = new Date(order.createdAt);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            to="/orders"
            className="hover:text-foreground transition-colors"
          >
            Orders
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Order #{order.MDH}</span>
        </nav>

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-sans text-5xl font-black tracking-tight text-foreground">
              ORDER DETAILS
            </h1>
            <p className="text-muted-foreground mt-2">
              Placed on{" "}
              {createdAt.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at{" "}
              {createdAt.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div
            className={`flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold ${
              statusConfig[order.statusOrder]?.className ||
              "bg-gray-100 text-gray-800"
            }`}
          >
            <StatusIcon className="h-5 w-5" />
            {statusConfig[order.statusOrder]?.label || order.statusOrder}
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-8 rounded-2xl bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Customer Info
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">Full Name</p>
              <p className="font-semibold">{order.full_name}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="font-semibold">{order.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Phone</p>
              <p className="font-semibold">{order.phone}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Address</p>
              <p className="font-semibold">{order.address}</p>
            </div>
          </div>
        </div>

        {/* Items & Summary */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Items List */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              Items in this order
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-6 rounded-2xl bg-card p-6 shadow-sm"
                >
                  {/* Product Image */}
                  <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={
                        item.product_image
                          ? `http://localhost:1337${item.product_image}`
                          : "/placeholder.svg"
                      }
                      alt={item.product_name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="font-sans text-xl font-bold text-foreground mb-2">
                      {item.product_name}
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        Size:{" "}
                        <span className="text-foreground">{item.size}</span>
                      </p>
                      <p>
                        Color:{" "}
                        <span className="text-foreground">{item.color}</span>
                      </p>
                      <p>
                        Quantity:{" "}
                        <span className="text-foreground">{item.quantity}</span>
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-sans text-2xl font-bold text-foreground">
                      ${item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-card p-6 shadow-sm lg:sticky lg:top-8">
              <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-semibold text-foreground">
                    {order.payment_method}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-semibold text-foreground">
                    $15
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Price</span>
                  <span className="font-semibold text-foreground">
                    ${order.total_price}
                  </span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-lg font-bold text-foreground">
                      Status
                    </span>
                    <span className="font-sans text-lg font-bold text-foreground capitalize">
                      {order.statusOrder}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  to="/orders"
                  className="block w-full rounded-xl border-2 border-border py-3 text-center font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Back to Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
