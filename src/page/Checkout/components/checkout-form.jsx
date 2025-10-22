"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet } from "lucide-react";

export default function CheckoutForm({ onFormChange ,paymentMethod, setPaymentMethod}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    note: "",   
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }
  useEffect(() => {
    onFormChange(formData);
  }, [formData, onFormChange]);

  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold text-card-foreground">
          Contact Information
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-sm text-muted-foreground">
              Full Name *
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1.5 h-12 rounded-lg border-input bg-background"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="email" className="text-sm text-muted-foreground">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-1.5 h-12 rounded-lg border-input bg-background"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm text-muted-foreground">
                Phone *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1.5 h-12 rounded-lg border-input bg-background"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold text-card-foreground">
          Shipping Address
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address" className="text-sm text-muted-foreground">
              Address *
            </Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              value={formData.address}
              onChange={handleChange}
              className="mt-1.5 h-12 rounded-lg border-input bg-background"
            />
          </div>

          <div>
            <Label htmlFor="note" className="text-sm text-muted-foreground">
              Order Note (Optional)
            </Label>
            <Textarea
              id="note"
              placeholder="Add any special instructions for your order..."
              value={formData.note}
              onChange={handleChange}
              className="mt-1.5 min-h-24 rounded-lg border-input bg-background"
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold text-card-foreground">
          Payment Method *
        </h2>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="space-y-3">
            <div
              className={`flex items-center justify-between rounded-lg border-2 p-4 transition-colors ${
                paymentMethod === "card"
                  ? "border-foreground bg-secondary"
                  : "border-border bg-background"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex cursor-pointer items-center gap-2 text-base font-medium"
                >
                  <CreditCard className="h-5 w-5" />
                  Credit / Debit Card
                </Label>
              </div>
            </div>

           

            <div
              className={`flex items-center justify-between rounded-lg border-2 p-4 transition-colors ${
                paymentMethod === "QRcode"
                  ? "border-foreground bg-secondary"
                  : "border-border bg-background"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="QRcode" id="QRcode" />
                <Label
                  htmlFor="QRcode"
                  className="cursor-pointer text-base font-medium"
                >
                  QR Code 
                </Label>
              </div>
            </div>
            <div
              className={`flex items-center justify-between rounded-lg border-2 p-4 transition-colors ${
                paymentMethod === "cod"
                  ? "border-foreground bg-secondary"
                  : "border-border bg-background"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="cod" id="cod" />
                <Label
                  htmlFor="cod"
                  className="cursor-pointer text-base font-medium"
                >
                  Cash on Delivery
                </Label>
              </div>
            </div>
          </div>
        </RadioGroup>

        {paymentMethod === "card" && (
          <div className="mt-6 space-y-4">
            <div>
              <Label
                htmlFor="cardNumber"
                className="text-sm text-muted-foreground"
              >
                Card Number
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="mt-1.5 h-12 rounded-lg border-input bg-background"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label
                  htmlFor="expiry"
                  className="text-sm text-muted-foreground"
                >
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="mt-1.5 h-12 rounded-lg border-input bg-background"
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-sm text-muted-foreground">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  className="mt-1.5 h-12 rounded-lg border-input bg-background"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
