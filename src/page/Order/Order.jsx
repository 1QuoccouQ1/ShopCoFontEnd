  import { useEffect, useState } from "react";
  import { ChevronRight, Package } from "lucide-react";
  import { Link } from "react-router-dom";

  const statusConfig = {
    pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
    confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-800" },
    shipping: { label: "Shipping", className: "bg-sky-100 text-sky-800" },
    completed: {
      label: "Completed",
      className: "bg-emerald-100 text-emerald-800",
    },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800" },
  };

  export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser) {
          const res = await fetch(
            `http://localhost:1337/api/orders?filters[user_name][$eq]=${parsedUser.id}&populate=*`
          );
          const data = await res.json();

          if (data?.data) {
            setOrders(data.data);
          }
        } else {
          const localOrders = JSON.parse(localStorage.getItem("guestOrders") || "[]");

          if (localOrders.length === 0) {
            setOrders([]);
          } else {
            const updatedOrders = await Promise.all(
              localOrders.map(async (order) => {
                if (order.documentId) {
                  try {
                    const res = await fetch(
                      `http://localhost:1337/api/orders/${order.documentId}?populate=*`
                    );
                    const data = await res.json();

                    if (data?.data) return data.data;

                    return order;
                  } catch (err) {
                    console.warn("Error fetching guest order:", err);
                    return order;
                  }
                }
                return order;
              })
            );

            setOrders(updatedOrders);
          }
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
    if (loading) {
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
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Orders</span>
          </nav>

          {/* Page Title */}
          <h1 className="mb-12 font-sans text-5xl font-black tracking-tight text-foreground">
            YOUR ORDERS
          </h1>

          {/* Empty State */}
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Package className="mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 font-sans text-2xl font-bold text-foreground">
                No orders yet
              </h2>
              <p className="mb-6 text-muted-foreground">
                Start shopping to see your orders here
              </p>
              <Link
                to="/"
                className="rounded-xl bg-foreground px-8 py-3 font-semibold text-background transition-colors hover:bg-foreground/90"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const created = new Date(order.createdAt);
                const itemCount = order.order_items.length;

                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-2xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Left Section */}
                    <div className="flex items-center gap-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-sans text-xl font-bold text-foreground">
                          Order #{order.MDH}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {created.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          at{" "}
                          {created.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </p>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-8">
                      <div
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                          statusConfig[order.statusOrder]?.className ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusConfig[order.statusOrder]?.label ||
                          order.statusOrder}
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-sans text-2xl font-bold text-foreground">
                          ${order.total_price}
                        </p>
                      </div>

                      <Link
                        to={`/Detail-Orders/${order.id}`}
                        state={{ order }}
                        className="flex h-12 items-center justify-center rounded-xl bg-foreground px-6 font-semibold text-background transition-colors hover:bg-foreground/90"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
