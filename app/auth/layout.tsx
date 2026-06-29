import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-md ">
      <nav className="fixed top-0 left-5 flex items-center right-0 h-14 ">
        <Link
          className={`${buttonVariants({
            variant: "secondary",
          })}`}
          href={"/"}
        >
          Go back
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default layout;
