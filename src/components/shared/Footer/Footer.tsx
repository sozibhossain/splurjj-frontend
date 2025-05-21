import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* CATEGORIES Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">CATEGORIES</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Latest
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Art & Culture
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Gear
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Music
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Quiet Calm
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Ride
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Videos
                </Link>
              </li>
            </ul>
          </div>

          {/* SHOP Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">SHOP</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Latest
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Tech
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* OTHER Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">OTHER</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Brand Directory
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Brand Recognition
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT US Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">ABOUT US</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Splurj Nation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Career Opportunities
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Advertising
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Legal
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* FOLLOW US Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider">FOLLOW US</h3>
              <div className="flex space-x-4">
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                </Link>
                <Link href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                </Link>
                <Link href="#" aria-label="TikTok">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-gray-400 hover:text-white transition-colors"
                  >
                    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                    <path d="M15 8a4 4 0 0 0 0 8" />
                    <path d="M15 8a4 4 0 0 1 4 4V4" />
                  </svg>
                </Link>
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                </Link>
                <Link href="#" aria-label="YouTube">
                  <Youtube className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                Don&apos;t miss out on the latest news by signing up for our newsletters.
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-r-none bg-transparent border-gray-700 focus:border-white"
                />
                <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">Subscribe</Button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our{" "}
                <Link href="#" className="underline hover:text-gray-400">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline hover:text-gray-400">
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm">Download our App</h3>
              <div className="flex space-x-4">
                <Link href="#">
                  <Image
                    src="/app-store-button.png"
                    alt="Download on App Store"
                    width={120}
                    height={40}
                    className="h-10"
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="/google-play-button.png"
                    alt="Get it on Google Play"
                    width={120}
                    height={40}
                    className="h-10"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            ©2025 Splurj Limited. All Rights Reserved. Splurj is a registered trademark of Splurj Nation LLC.
            <Link href="#" className="underline hover:text-gray-400 ml-1">
              Terms & Conditions
            </Link>{" "}
            |
            <Link href="#" className="underline hover:text-gray-400 ml-1">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="#" className="underline hover:text-gray-400 ml-1">
              Cookie Policy
            </Link>{" "}
            |
            <Link href="#" className="underline hover:text-gray-400 ml-1">
              Investment Disclaimer
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
