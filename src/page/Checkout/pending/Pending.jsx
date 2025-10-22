import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../../hooks/useCart/useCart";

export default function PendingPaymentPage() {
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    const savedOrder = sessionStorage.getItem("orderDetails");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    } else {
      navigate("/checkout");
    }
  }, [navigate]);

  const handleCheckPayment = async () => {
    if (!order) return;
    setChecking(true);

    try {
      const res = await fetch(
        `http://localhost:1337/api/payment/check-status/${order.MDH}`
      );
      const data = await res.json();

      if (data.success) {
        clearCart();
        navigate("/Success-Checkout");
      } else {
        toast.error(
          "Thanh toán chưa được xác nhận. Vui lòng thử lại sau 1–2 phút!"
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi khi kiểm tra thanh toán!");
    } finally {
      setChecking(false);
    }
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-medium">
        Loading order details...
      </div>
    );
  }

  const transferInfo = {
    bankName: "MBBank",
    accountName: "Nguyen Bao Quoc",
    accountNumber: "54525052004",
    amount: order.total,
    transferContent: order.MDH,
  };

  const qrUrl = `https://qr.sepay.vn/img?acc=${
    transferInfo.accountNumber
  }&bank=${encodeURIComponent(transferInfo.bankName)}&amount=${
    transferInfo.amount
  }&des=${encodeURIComponent(transferInfo.transferContent)}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">
              Home
            </a>
            <span>›</span>
            <a href="/cart" className="hover:text-foreground transition-colors">
              Cart
            </a>
            <span>›</span>
            <span className="text-foreground font-medium">Payment</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">
          QR CODE PAYMENT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Transfer Information */}
          <div className="lg:col-span-2">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h2 className="text-xl font-bold mb-6 text-foreground">
                Transfer Information
              </h2>

              <div className="space-y-4">
                {/* Bank Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bank Name
                  </label>
                  <div className="px-4 py-3 bg-muted rounded-md text-foreground font-medium">
                    {transferInfo.bankName}
                  </div>
                </div>

                {/* Account Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Account Name
                  </label>
                  <div className="px-4 py-3 bg-muted rounded-md text-foreground font-medium">
                    {transferInfo.accountName}
                  </div>
                </div>

                {/* Account Number */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Account Number
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 bg-muted rounded-md text-foreground font-medium">
                      {transferInfo.accountNumber}
                    </div>
                    <button
                      onClick={() => handleCopy(transferInfo.accountNumber)}
                      className="px-4 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity flex items-center gap-2 font-medium"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Transfer Content */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Transfer Content
                  </label>
                  <div className="px-4 py-3 bg-muted rounded-md text-foreground font-medium">
                    {order.MDH}
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Amount
                  </label>
                  <div className="px-4 py-3 bg-muted rounded-md text-foreground font-bold text-lg">
                    {transferInfo.amount.toLocaleString("vi-VN")}₫
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - QR Code */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 bg-card sticky top-8">
              <h2 className="text-xl font-bold mb-6 text-foreground">
                Scan to Pay
              </h2>

              {/* QR Code Image */}
              <div className="flex justify-center mb-6 p-4 bg-white rounded-lg">
                <img
                  src={qrUrl}
                  alt="QR Code Payment"
                  className="w-64 h-64 object-contain"
                />
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">$70.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="text-foreground font-medium">$15.00</span>
                </div>
              </div>
              {/* Total */}
              <div className="flex justify-between items-center mb-6 border-t border-border pt-4">
                <span className="text-foreground font-bold">Total</span>
                <span className="text-2xl font-bold text-foreground">
                  {transferInfo.amount.toLocaleString("vi-VN")}₫
                </span>
              </div>

              {/* Instructions */}
              <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground mb-6">
                <p className="font-medium text-foreground mb-2">
                  Payment Instructions:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Open your banking app</li>
                  <li>Scan this QR code</li>
                  <li>Confirm the transfer details</li>
                  <li>Complete the payment</li>
                </ol>
              </div>

              <button
                disabled={checking}
                onClick={handleCheckPayment}
                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold hover:opacity-90 transition-opacity"
              >
                {checking ? "Checking Payment..." : "I Have Completed Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
