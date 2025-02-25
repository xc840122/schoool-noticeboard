import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SearchBar = async () => {
  return (
    <div className="flex justify-center w-full md:max-w-max items-center space-x-2">
      <Input
        className="md:w-64"
        type="email"
        placeholder="Please input..." />
      <Button type="submit">Search</Button>
    </div>
  )
}

export default SearchBar