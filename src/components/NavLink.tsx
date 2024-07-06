import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`${className} ${
        isActive ? "bg-green text-white hover:bg-green" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
