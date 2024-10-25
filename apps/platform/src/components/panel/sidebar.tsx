import config from "@/config";
import { SidebarState, useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { Button } from "@v1/ui/button";
import { cn } from "@v1/ui/cn";
import { Icons } from "@v1/ui/icons";
import Link from "next/link";
import React from "react";

import { viewport } from "../../app/[locale]/layout";
import { Menu } from "./menu";
import { SidebarToggle } from "./sidebar-toggle";

/**
 * Sidebar component that renders a collapsible sidebar with a brand logo, toggle button, and menu.
 *
 * @returns {React.ReactElement | null} The rendered Sidebar component or null if sidebar state is not available
 */
export const Sidebar: React.FC = React.memo(() => {
  const sidebar = useStore(useSidebarToggle, (state: SidebarState) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0 scrollbar-hide bg-background text-foreground",
        sidebar.isOpen === false ? "w-[90px]" : "w-80",
      )}
    >
      <SidebarToggle isOpen={sidebar.isOpen} setIsOpen={sidebar.setIsOpen} />
      <div className="relative flex h-full flex-col md:gap-[2%] overflow-y-auto px-3 pt-[3%] shadow-md dark:shadow-zinc-800">
        <BrandButton isOpen={sidebar.isOpen} />
        <Menu isOpen={sidebar.isOpen} />
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

/**
 * Props for the BrandButton component.
 */
interface BrandButtonProps {
  /** Indicates whether the sidebar is open */
  isOpen: boolean;
}

/**
 * BrandButton component that renders the brand logo and name as a button.
 *
 * @param {BrandButtonProps} props - The component props
 * @returns {React.ReactElement} The rendered BrandButton component
 */
const BrandButton: React.FC<BrandButtonProps> = React.memo(({ isOpen }) => (
  <Button
    className={cn(
      "mb-1 transition-transform duration-300 ease-in-out  md:pt-[4%]",
      isOpen === false ? "translate-x-1" : "translate-x-0",
    )}
    variant="link"
    asChild
  >
    <Link href="/" className="flex items-center justify-center gap-2">
      <Icons.Logo
        className="mr-1 h-16 w-16"
        viewport="0 0 24 24"
        strokeWidth={"0.5"}
      />
      {/* <h1
        className={cn(
          "whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
          isOpen === false
            ? "hidden -translate-x-96 opacity-0"
            : "translate-x-0 opacity-100",
        )}
      >
        {config.company}
      </h1> */}
    </Link>
  </Button>
));

BrandButton.displayName = "BrandButton";
