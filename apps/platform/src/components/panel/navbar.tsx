"use server";

import { BrowserNavigation } from "@/desktop/components/browser-navigation";
import { isDesktopApp } from "@todesktop/client-core/platform/todesktop";
import { Skeleton } from "@v1/ui/skeleton";
import React, { Suspense } from "react";

import { DesktopAssistantButton } from "../assistant/button-desktop";
import { ConnectionStatus } from "../connection-status";
import { DesktopTrafficLight } from "../desktop-traffic-light";
import { FeedbackForm } from "../feedback-form";
import { MobileMenu } from "../mobile-menu";
import { TrackerControl } from "../tracker-contol";
import { UserMenu } from "../user-menu";
import { SheetMenu } from "./sheet-menu";

/**
 * Props for the Navbar component.
 */
interface NavbarProps {
  /** The title to be displayed in the navbar */
  title: string;
}

/**
 * Navbar component that displays the top navigation bar.
 * It includes a SheetMenu, title, and UserNav.
 *
 * @param {NavbarProps} props - The component props
 * @returns {React.ReactElement} The rendered Navbar component
 */
export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        {/** this is the left side of the navbar and is commented out as we already have one ... it shows itself in small screens */}
        {/* <NavbarLeft title={title} /> */}
        <div className="ml-4 flex items-center space-x-4">
          <MobileMenu />
          {isDesktopApp() && <DesktopTrafficLight />}
          {isDesktopApp() && <BrowserNavigation />}
          {/* <div className="flex-1">
            <AssistantButton />
          </div> */}
        </div>
        <NavbarRight />
      </div>
    </header>
  );
};

Navbar.displayName = "Navbar";

/**
 * NavbarLeft component that renders the left side of the navbar.
 *
 * @param {Pick<NavbarProps, 'title'>} props - The component props
 * @returns {React.ReactElement} The rendered NavbarLeft component
 */
const NavbarLeft: React.FC<Pick<NavbarProps, "title">> = ({ title }) => (
  <div className="flex items-center space-x-4 lg:space-x-0">
    <SheetMenu />
    <h1 className="font-bold">{title}</h1>
  </div>
);

NavbarLeft.displayName = "NavbarLeft";

/**
 * NavbarRight component that renders the right side of the navbar.
 *
 * @returns {React.ReactElement} The rendered NavbarRight component
 */
const NavbarRight: React.FC = () => (
  <div className="no-drag ml-auto flex flex-1 items-center justify-end space-x-2">
    {isDesktopApp() && <DesktopAssistantButton />}

    <FeedbackForm />

    <TrackerControl />

    <Suspense>
      <ConnectionStatus />
    </Suspense>
    <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
      <UserMenu onlySignOut={false} />
    </Suspense>
  </div>
);

NavbarRight.displayName = "NavbarRight";
