"use client";

import { Menu, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="w-full border-b bg-[#eeeeee] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left side - Logo / App name */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            width={25}
            height={25}
            src="/navbar-logo.png"
            alt="Chatuuu logo"
          />
          <span className="font-semibold text-lg">Chatuuu</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6"></nav>

        {/* Right side */}
        {/* <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm">
            Login
          </Button>
          <Button size="sm">Sign Up</Button>
        </div> */}

        {/* Mobile Menu */}
        {/* <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-medium">
                Home
              </Link>
              <Link href="/about" className="text-lg font-medium">
                About
              </Link>
              <Link href="/chat" className="text-lg font-medium">
                Chat
              </Link>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="w-full">
                  Login
                </Button>
                <Button size="sm" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet> */}
      </div>
    </header>
  );
}
