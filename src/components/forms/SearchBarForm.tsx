'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchInputSchema } from "@/validators/notice-validator";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | null>(null);


  // Clear search query and reset list
  const clearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`${path}?${params.toString()}`, { scroll: false });
  };

  // Handle the search action
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent default form submission (page reload)
    // Get the input value
    const value = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
    // Validate the input
    const result = searchInputSchema.safeParse({ keyword: value });
    if (!result.success) {
      setError("Please input valid characters,suport a-z,A-Z,0-9");
      return;
    }

    // Create a new URLSearchParams instance to clear existing parameters
    const params = new URLSearchParams();

    if (value) {
      // Set the search query parameter
      params.set("search", value.toString());
      // Reset page number 1 after triggering search
      params.set("page", "1");
      // Update the URL with search query and reset page
      router.push(`${path}?${params.toString()}`, { scroll: false });
      // Clear the input field after search
      (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value = '';
      setError(null);  // Clear any previous errors on successful search
    }
  };

  return (
    <form
      onSubmit={searchHandler}
      className="flex flex-col justify-center items-star w-full md:max-w-max gap-2">
      <span
        className={`text-red-500 text-xs w-full h-4 ${error ? 'block' : 'hidden'}`}>
        {error}
      </span>
      {/* Display current search keyword with a remove option */}
      {searchParams.get('search') && (
        <div className={`flex items-center w-fit px-2 rounded-lg bg-gray-100 opacity-70`}>
          <span className="text-sm text-gray-500">{searchParams.get('search')}</span>
          <Button
            className="text-gray-500 h-1"
            variant="link"
            onClick={clearSearch}
          >
            <X size={12} className="text-gray-500" />
          </Button>
        </div>
      )}
      <div className="flex flex-col items-center md:flex-row w-full gap-2">
        <Input
          className="md:w-64"
          name="search"
          type="text"
          placeholder="Please input..."
        />
        <Button
          type="submit"
          className="w-full md:w-auto">
          Search
        </Button>
      </div>
    </form>
  )
}

export default SearchBar