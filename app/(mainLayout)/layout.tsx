import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";
// main layout
const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full ">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
