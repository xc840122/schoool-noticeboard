import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SearchBar = async () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Please input..." />
      <Button type="submit">Search</Button>
    </div>
  )
}

export default SearchBar