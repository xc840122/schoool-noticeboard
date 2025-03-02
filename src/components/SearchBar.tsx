'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Handle the search action
  const searchAction = (e: React.FormEvent) => {
    e.preventDefault();  // Prevent default form submission (page reload)

    const value = searchValue.trim();
    if (!value) {
      setError("Search value cannot be empty");
      return;
    }

    // Validate the input using regex
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (!regex.test(value)) {
      setError("Please input valid characters,suport a-z,A-Z,0-9 and space");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setError(null);  // Clear error on new input
  };


  return (
    <form
      onSubmit={searchAction}
      className="flex justify-center items-start w-full md:max-w-max space-x-2">
      <div className="flex w-full flex-col">
        <Input
          className="md:w-64"
          name="search"
          type="text"
          placeholder="Please input..."
          value={searchValue}
          onChange={handleChange}
        />
        <span
          className={`text-red-500 text-xs w-full h-2 ${error ? 'block' : 'invisible'}`}>
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