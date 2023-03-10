import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-sm py-4 mx-auto px-6 top-0 sticky">
      <div className="flex justify-between uppercase space-y-3 items-center">
        <Link href="/" className="text-3xl font-bold text-primary">
          Pizza Mtaani
        </Link>
        <div className="hidden space-x-3 md:flex">
          <Link className="text-primary hover:text-secondary" href="#">
            Home
          </Link>
          <Link className="text-primary hover:text-secondary" href="#">
            Contacts
          </Link>
          <Link className="text-primary hover:text-secondary" href="#">
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
