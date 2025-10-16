"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProductHeader({ sortBy, setSortBy }) {
   const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setSortBy(value);
    setOpen(false);
  };


  return (
    <div className="flex items-center justify-between mb-8 relative">
      <h1 className="text-3xl font-bold">Casual</h1>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>Showing 1-9 Products</span>
        <div className="relative">
          <Button
            variant="ghost"
            className="text-foreground font-medium flex items-center"
            onClick={() => setOpen(!open)}
          >
            {sortBy}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>

          {open && (
            <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-md z-10 min-w-32 text-right">
              <button
                onClick={() => handleSelect("Most Popular")}
                className="block w-full text-left px-4 py-2 hover:bg-[#f3f4f6] rounded-t-lg "
              >
                Most Popular
              </button>
              <button
                onClick={() => handleSelect("Most Selling")}
                className="block w-full text-left px-4 py-2 hover:bg-[#f3f4f6] rounded-b-lg"
              >
                Most Selling
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
