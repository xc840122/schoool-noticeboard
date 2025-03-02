'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";

const SearchBar = () => {

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  // Apply new hook useActionState
  const searchAction = async (previousState: unknown, formData: FormData) => {
    const value = formData.get('search') as string;
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    // Reset page number 1 after triggering search
    if (params.has("page")) params.set("page", "1");
    router.push(`${path}?${params}`);
  };

  const [, action,] = useActionState(searchAction, undefined);

  return (
    <form
      action={action}
      className="flex justify-center w-full md:max-w-max items-center space-x-2">
      <Input
        className="md:w-64"
        name="search"
        type="text"
        placeholder="Please input..."
      />
      <Button type="submit">Search</Button>
    </form>
  )
}

export default SearchBar