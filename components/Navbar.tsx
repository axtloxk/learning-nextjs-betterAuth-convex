"use client";
import { useConvexAuth } from "convex/react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const links = [
    { href: "/", text: "Home" },
    { href: "/blog", text: "Blog" },
    { href: "/create", text: "Create" },
  ];
  const { isLoading, isAuthenticated } = useConvexAuth();
  return (
    <nav className="fixed px-4 top-0 left-2 right-2 bg-black flex items-center justify-between h-13">
      <div className="flex gap-13 items-center">
        <h2 className="text-2xl tracking-wide">
          Next
          <span className="text-pink-700">JS</span>
        </h2>
        <ul className="flex gap-5 ">
          {links.map((item) => {
            return (
              <Link
                key={item.text}
                href={`${item.href}`}
                className="hover:text-pink-400/90"
              >
                {item.text}
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-4">
        {/* 
         {isLoading ? null : isAuthenticated ?
         */}
        {isAuthenticated ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged out sucssesfully");
                    router.push("/");
                  },
                },
              })
            }
          >
            Log out
          </Button>
        ) : (
          <div className="flex gap-4 ">
            <Link
              href={"/auth/login"}
              className={buttonVariants({ variant: "secondary" })}
            >
              Log in
            </Link>
            <Link href={"/auth/sign-up"} className={buttonVariants()}>
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
