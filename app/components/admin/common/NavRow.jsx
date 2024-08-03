import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const topButtonsMain = [
  {
    name: "Overview",
    route: "/admin/overview",
  },
  {
    name: "Inventory",
    route: "/admin/inventory",
  },
  {
    name: "Invoices",
    route: "/admin/invoices",
  },
  {
    name: "Employees",
    route: "/admin/employees",
  },
  {
    name: "Subscription",
    route: "/admin/subscription",
  },
  {
    name: "Role & Permissions",
    route: "/admin/roles",
  },

  {
    name: "Parts Management",
    route: "/admin/parts",
  },
  {
    name: "Deleted Parts",
    route: "/admin/deleted-items",
  },
  {
    name: "Locations",
    route: "/admin/locations",
  },
  {
    name: "Vehicles",
    route: "/admin/vehicle",
  },
];

const NavRow = () => {
  const pathName = usePathname();
  return pathName === "/admin/dashboard" || // dont show navrow on admmin dashboard and yards pages
    pathName === "/admin/yards" ||
    pathName === "/admin/invoices/create" ||
    pathName === "/admin/profile" ||
    pathName === "/admin/settings" ? null : (
    <div className="bg-[#f9fafb]  pt-8 gap-2 px-4 flex justify-start items-center overflow-x-auto no-scrollbar">
      {topButtonsMain.map((item, index) => {
        return (
          <Link
            href={item?.route}
            className={`p-2 min-w-36 cursor-pointer  border border-[grey] rounded-3xl text-sm flex justify-center items-center text-center font-medium ${
              pathName === item?.route
                ? "bg-[#78FFB6] sm:hover:bg-[#78FFB6] text-black border-none"
                : "sm:hover:bg-[#ecf2ef49] text-[grey]"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavRow;
