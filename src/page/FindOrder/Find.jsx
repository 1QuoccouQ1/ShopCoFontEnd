"use client";

import { useEffect, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OrderDetails from "./OrderDetail/OrderDetail";

export default function FindOrder() {
  const [searchCode, setSearchCode] = useState("");
  const [foundOrder, setFoundOrder] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [debouncedCode, setDebouncedCode] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCode(searchCode.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchCode]);

  useEffect(() => {
    if (!debouncedCode) return;

    const fetchOrder = async () => {
      setSearched(true);
      setFoundOrder(null);
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:1337/api/orders?filters[MDH][$eq]=${encodeURIComponent(
            debouncedCode
          )}&populate=*`
        );

        const data = await response.json();

        if (data?.data?.length > 0) {
          setFoundOrder(data.data[0]);
        } else {
          setFoundOrder(null);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setFoundOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [debouncedCode]);

  const handleSubmit = (e) => e.preventDefault();

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-foreground mb-3">
                Find Your Order
              </h2>
              <p className="text-base text-foreground/60">
                Enter your order code to view complete order details and
                tracking information
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <Input
                  type="text"
                  placeholder="Enter order code (e.g., #46)"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="pl-10 h-12 text-base border-border/50 focus:border-primary transition-colors"
                />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold hover:shadow-lg transition-all"
              >
                {loading ? "Searching..." : "Search Order"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {searched && !foundOrder && (
              <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 backdrop-blur-sm">
                <p className="text-sm text-destructive font-medium">
                  Order not found. Try again with a different code.
                </p>
              </div>
            )}
          </div>
        </div>

        {foundOrder && (
          <div className="mt-16 pt-12 border-t border-border/30">
            <OrderDetails order={foundOrder} />
          </div>
        )}
      </main>
    </div>
  );
}
