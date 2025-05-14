import { useState } from "react"

type SearchByProps = {
  setQueryParams: (name: string, value: string) => void
  "data-testid"?: string
}

export function ProductSearchInput({
  setQueryParams,
  "data-testid": dataTestId,
}: SearchByProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setQueryParams("q", value)
  }

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search products..."
      className="w-3/4 p-2 border border-gray-300 rounded-md"
      data-testid={dataTestId}
    />
  )
}
