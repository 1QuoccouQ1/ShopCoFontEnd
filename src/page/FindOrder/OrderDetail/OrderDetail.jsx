
export default function OrderDetails({ order }) {
  const createdAt = new Date(order.createdAt);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
            {order.order_items.map((item) => (
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
                      Size: <span className="text-foreground">{item.size}</span>
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
                <span className="font-semibold text-foreground">$15</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
