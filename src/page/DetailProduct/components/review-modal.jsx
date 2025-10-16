"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "react-toastify";

export function ReviewModal({ open, onOpenChange, productId }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("Vui lòng đăng nhập để viết đánh giá!");
      onOpenChange(false);
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user?.id;
    const token = user?.jwt;

    // TODO: Gửi dữ liệu lên API Strapi ở đây (ví dụ):
    try {
      const res = await fetch("http://localhost:1337/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            rating,
            comment: reviewText,
            product: productId,
            users_permissions_user: userId,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Không thể gửi đánh giá");
      }
      toast.success("Cảm ơn bạn đã gửi đánh giá!");
      setRating(0);
      setReviewText("");
      onOpenChange(false);
    } catch (err) {
      console.error("Lỗi gửi review:", err);
      toast.error("Gửi đánh giá thất bại!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border border-border bg-white p-0 shadow-lg">
        <div className="border-b border-border px-8 py-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Write a Review
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Write a review form dialog.
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-8 py-6">
          {/* Rating Section */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">
              Your Rating
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 stroke-yellow-400"
                        : "fill-none stroke-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                You rated this product {rating} out of 5 stars
              </p>
            )}
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label
              htmlFor="review"
              className="text-sm font-semibold text-foreground"
            >
              Your Review
            </Label>
            <Textarea
              id="review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="min-h-[150px] border border-border bg-white text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Share your thoughts about this product..."
              required
            />
            <p className="text-xs text-muted-foreground">
              Minimum 20 characters ({reviewText.length}/20)
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border border-border bg-white px-6 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={rating === 0 || reviewText.length < 20}
              className="bg-black px-6 py-2 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
