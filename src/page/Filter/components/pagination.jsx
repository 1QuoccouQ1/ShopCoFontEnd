import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pagination({ page, setPage, pagination }) {
  const totalPages = pagination?.pageCount || 1;

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between mt-8">
      <Button
        variant="outline"
        className="flex items-center gap-2 bg-transparent"
        onClick={handlePrev}
        disabled={page === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {pages.map((p) => (
          <Button
            key={p}
            variant={p === page ? "default" : "ghost"}
            size="sm"
            className="min-w-[40px]"
            onClick={() => setPage(p)}
          >
            {p}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        className="flex items-center gap-2 bg-transparent"
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
