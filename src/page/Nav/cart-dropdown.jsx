"use client";

import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart/useCart";

export function CartDropdown() {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } =
    useCart();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="default"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0 border-slate-200">
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">Shopping Cart</h3>
          <p className="text-sm text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <Separator />

        {cart.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
            <Button asChild className="mt-4" size="sm">
              <Link to="/FilterProduct">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="max-h-[400px] overflow-y-auto">
              {cart.map((item, index) => (
                <div key={item.id}>
                  <div className="p-4 flex gap-3">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={
                          item.product_image?.startsWith("http")
                            ? item.product_image
                            : `http://localhost:1337${item.product_image}`
                        }
                        alt={item.name}
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-medium text-sm leading-tight line-clamp-2">
                          {item.name}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0"
                          onClick={() =>
                            removeFromCart(item.id, item.size, item.color)
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {(item.size || item.color) && (
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.color && `Color: ${item.color}`}
                          {item.color && item.size && " • "}
                          {item.size && `Size: ${item.size}`}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.color, -1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.color, 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-semibold text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < cart.length - 1 && <Separator />}
                </div>
              ))}
            </div>

            <Separator />

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>

              <div className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  <Link to="/Cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
