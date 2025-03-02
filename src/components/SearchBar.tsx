'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchInputSchema } from "@/schemas/messageSchema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  // Handle the search action
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent default form submission (page reload)
    const value = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;

    // Validate the input
    const result = SearchInputSchema.safeParse({ keyword: value });
    if (!result.success) {
      setError("Please input valid characters,suport a-z,A-Z,0-9");
      return;
    }

    // Create a new URLSearchParams instance to preserve existing parameters
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    // Reset page number 1 after triggering search
    params.set("page", "1");
    // Update the URL with search query and reset page
    router.push(`${path}?${params}`);
    setError(null);  // Clear any previous errors on successful search
  };

  return (
    <form
      onSubmit={searchHandler}
      className="flex justify-center items-start w-full md:max-w-max space-x-2">
      <div className="flex w-full flex-col">
        <Input
          className="md:w-64"
          name="search"
          type="text"
          placeholder="Please input..."
        />
        <span
          className={`text-red-500 text-xs w-full h-4 ${error ? 'block' : 'invisible'}`}>
          {error}
        </span>
      </div>
      <Button
        type="submit">
        Search
      </Button>
    </form>
  )
}

export default SearchBar