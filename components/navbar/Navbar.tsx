"use client";
import NavHeader from "./NavHeader";
import NavLinks from "./Navlinks";

const Navbar = () => {
  return (
    <>
      <div className="lg:border-r lg:border-neutral-300  lg:w-68 lg:min-h-screen lg:px-4 lg:py-3 lg:gap-y-4">
        <NavHeader screen="desktop" />
        <NavLinks />
      </div>
    </>
  );
};

export default Navbar;
