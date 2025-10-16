"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:1337/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error?.message || "Something went wrong");

      toast.success("Email đặt lại mật khẩu đã được gửi!");
      setEmail("");
    } catch (err) {
      toast.error("Gửi email thất bại: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-card p-8 rounded-xl shadow"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Nhập email để nhận liên kết đặt lại mật khẩu
        </p>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? "Đang gửi..." : "Gửi liên kết đặt lại"}
        </Button>
      </form>
    </div>
  );
}
