import { Breadcrumb } from "./components/breadcrumb";
import { FilterSidebar } from "./components/filter-sidebar";
import { ProductGrid } from "./components/product-grid";
import { ProductHeader } from "./components/product-header";
import { Pagination } from "./components/pagination";
import { useState } from "react";

export default function CasualPage() {
  const [sortBy, setSortBy] = useState("Most Popular");
  const [filters, setFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageCount: 1,
    total: 0,
  });
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb />

        <div className="flex gap-8 mt-6">
          <FilterSidebar setFilters={setFilters} />

          <div className="flex-1">
            <ProductHeader sortBy={sortBy} setSortBy={setSortBy} />
            <ProductGrid
              sortBy={sortBy}
              page={page}
              filters={filters}
              setPagination={setPagination}
            />
            <Pagination page={page} setPage={setPage} pagination={pagination} />
          </div>
        </div>
      </div>
    </div>
  );
}
