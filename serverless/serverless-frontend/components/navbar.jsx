"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, User, LogOut, Package } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import CartDrawer from "./cart-drawer";
// import { useAuth } from "react-oidc-context"
import { useRouter } from "next/navigation";
import { useAuth } from "react-oidc-context";

export default function Navbar() {
    const { totalItems } = useCart();
    // const { isAuthenticated, user, logout } = useAuth()
    const [cartOpen, setCartOpen] = useState(false);
    const router = useRouter();
    const auth = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <header className="border-b sticky top-0 z-50 bg-background">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl">
                        E-commerce
                    </Link>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="relative"
                            onClick={() => setCartOpen(true)}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="relative"
                                >
                                    <User className="h-5 w-5" />
                                    {auth.isAuthenticated && (
                                        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-2 w-2 flex items-center justify-center"></span>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {auth.isAuthenticated ? (
                                    <>
                                        <div className="px-3 py-2 text-sm">
                                            <p className="font-medium">
                                                {auth.user.profile.name}
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {auth.user.profile.email}
                                            </p>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/orders"
                                                className="flex w-full cursor-pointer"
                                            >
                                                <Package className="mr-2 h-4 w-4" />
                                                <span>My Orders</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                        >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    auth.removeUser();
                                                }}
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Logout</span>
                                            </Button>
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    auth.signinRedirect()
                                                }
                                            >
                                                <Link
                                                    href=""
                                                    className="flex w-full cursor-pointer"
                                                >
                                                    Sign In
                                                </Link>
                                            </Button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    auth.removeUser();
                                                }}
                                            >
                                                <Link
                                                    href="/signup"
                                                    className="flex w-full cursor-pointer"
                                                >
                                                    Sign Up
                                                </Link>
                                            </Button>
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}
