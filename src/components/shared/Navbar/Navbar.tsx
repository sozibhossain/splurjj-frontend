"use client";
import { Input } from "@/components/ui/input";
import { ChevronDown, Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  // Menu items data
  const menuItems = [
    { name: "LATEST", href: "/", hasDropdown: false },
    { name: "ART & CULTURE", href: "#", hasDropdown: true },
    { name: "GEAR", href: "#", hasDropdown: true },
    { name: "MUSIC", href: "#", hasDropdown: true },
    { name: "QUIET CALM", href: "#", hasDropdown: true },
    { name: "VIDEOS", href: "/videos", hasDropdown: true },
    { name: "SHOP", href: "#", hasDropdown: true },
  ];

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-label="Search"]')
      ) {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div className="sticky top-0 z-50">
      <div className="w-full h-[16px] bg-[#131313]"/>
      <div className=" bg-white shadow-[0px_4px_48px_0px_#0000000F]">
        <div className="container py-[15px] md:py-[17px] lg:py-[19px]">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-4 md:gap-6 lg:gap-[30px]">
                <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <Menu className="w-[30px] h-[20px] text-black" />
                </button>

                <ul className="flex items-center gap-4 lg:gap-6">
                  {menuItems.map((item) => (
                    <li key={item.name} className="group relative">
                      <Link
                        href={item.href}
                        className={`flex items-center gap-[10px] text-base md:text-lg lg:text-xl leading-[120%] uppercase font-manrope tracking-[0%] font-medium ${
                          pathName === item.href
                            ? "text-[#0253F7] font-extrabold"
                            : "text-[#424242] hover:text-black "
                        } transition-colors`}
                      >
                        {item.name}
                        {item.hasDropdown && (
                          <ChevronDown
                            size={16}
                            className="transition-transform group-hover:rotate-180"
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4">
                <div
                  ref={searchContainerRef}
                  className="relative flex items-center"
                >
                  <button
                    onClick={toggleSearch}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Search"
                  >
                    {isSearchOpen ? (
                      <X size={30} className="text-black" />
                    ) : (
                      <Search size={30} className="text-black" />
                    )}
                  </button>

                  <div
                    className={`absolute right-0 top-0 transition-all duration-300 ease-in-out ${
                      isSearchOpen
                        ? "translate-x-[-40px] w-[240px]"
                        : "w-0 opacity-0"
                    }`}
                  >
                    <Input
                      ref={inputRef}
                      placeholder="Search..."
                      className={`border border-gray-300 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 w-full ${
                        isSearchOpen ? "block" : "hidden"
                      }`}
                    />
                  </div>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <ShoppingCart className="text-black w-[33px] h-[33px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="block md:hidden">
            <div className="w-full flex items-center justify-between">
              <div className="text-xl font-bold">LOGO</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleSearch}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <X size={20} className="text-gray-600" />
                  ) : (
                    <Menu size={20} className="text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            {isSearchOpen && (
              <div className="mt-3">
                <Input
                  ref={inputRef}
                  placeholder="Search..."
                  className="w-full"
                  onBlur={closeSearch}
                />
              </div>
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <ul className="mt-4 space-y-3">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block py-2 px-1 text-lg ${
                        pathName === item.href
                          ? "font-bold text-black"
                          : "font-medium text-gray-600 hover:text-black"
                      } transition-colors`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
