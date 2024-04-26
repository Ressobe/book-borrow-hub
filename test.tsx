=== component.jsx ===

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/L8bapcFNQSN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function Component() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input className="w-full" id="search" placeholder="Search books..." type="search" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select className="w-full" id="category">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="biography">Biography</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" placeholder="Enter author name" type="text" />
                </div>
                <div>
                  <Label htmlFor="price">Price Range</Label>
                </div>
                <Button className="w-full" type="submit">
                  Apply Filters
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Books</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ListOrderedIcon className="mr-2 h-4 w-4" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuRadioGroup value="relevance">
                  <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <Link className="group relative block h-[300px] overflow-hidden rounded-lg" href="#">
                <img
                  alt="Book Cover"
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/400",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900/75 to-transparent p-6 text-white">
                  <h3 className="text-lg font-semibold">The Great Gatsby</h3>
                  <p className="text-sm">F. Scott Fitzgerald</p>
                  <p className="text-lg font-bold">$12.99</p>
                </div>
              </Link>
            </Card>
            <Card>
              <Link className="group relative block h-[300px] overflow-hidden rounded-lg" href="#">
                <img
                  alt="Book Cover"
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/400",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900/75 to-transparent p-6 text-white">
                  <h3 className="text-lg font-semibold">To Kill a Mockingbird</h3>
                  <p className="text-sm">Harper Lee</p>
                  <p className="text-lg font-bold">$9.99</p>
                </div>
              </Link>
            </Card>
            <Card>
              <Link className="group relative block h-[300px] overflow-hidden rounded-lg" href="#">
                <img
                  alt="Book Cover"
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/400",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900/75 to-transparent p-6 text-white">
                  <h3 className="text-lg font-semibold">1984</h3>
                  <p className="text-sm">George Orwell</p>
                  <p className="text-lg font-bold">$7.99</p>
                </div>
              </Link>
            </Card>
            <Card>
              <Link className="group relative block h-[300px] overflow-hidden rounded-lg" href="#">
                <img
                  alt="Book Cover"
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/400",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900/75 to-transparent p-6 text-white">
                  <h3 className="text-lg font-semibold">Pride and Prejudice</h3>
                  <p className="text-sm">Jane Austen</p>
                  <p className="text-lg font-bold">$11.99</p>
                </div>
              </Link>
            </Card>
            <Card>
              <Link className="group relative block h-[300px] overflow-hidden rounded-lg" href="#">
                <img
                  alt="Book Cover"
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/400",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900/75 to-transparent p-6 text-white">
                  <h3 className="text-lg font-semibold">The Catcher in the Rye</h3>
                  <p className="text-sm">J.D. Salinger</p>
                  <p className="text-lg font-bold">$8.99</p>
                </div>
              </Link>
            </Card>
            <Card>
              <Link className="group relative block h-[300px] overflow-hidden rounded-lg" href="#">
                <img
                  alt="Book Cover"
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/400",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900/75 to-transparent p-6 text-white">
                  <h3 className="text-lg font-semibold">The Hobbit</h3>
                  <p className="text-sm">J.R.R. Tolkien</p>
                  <p className="text-lg font-bold">$14.99</p>
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ListOrderedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}

=== styles.css ===

body {
  font-family: var(--font-inter), sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-inter), sans-serif;
}

=== layout.jsx ===

// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { Inter } from 'next/font/google'
import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  )
}
