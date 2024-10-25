import React from "react";

import BreadcrumbNav from "./bread-crumb-header";
import { Navbar } from "./navbar";

/**
 * Props for the ContentLayout component.
 */
interface ContentLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The title to be displayed in the Navbar */
  title: string;
}

/**
 * ContentLayout component that provides a consistent layout structure for content pages.
 * It includes a Navbar with a title and a container for the main content.
 *
 * @param {ContentLayoutProps} props - The component props
 * @returns {React.ReactElement} The rendered ContentLayout component
 */
export const ContentLayout: React.FC<ContentLayoutProps> = React.memo(
  ({ title, children }) => {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar title={title} />
        <main className="flex-grow pb-8">
          <BreadcrumbNav />
          <div className="py-4 sm:py-6 md:py-8 min-h-[calc(100vh-200px)] overflow-auto">
            <div className="border rounded-3xl bg-background text-foreground min-h-screen px-[2%]">
              {children}
            </div>
          </div>
        </main>
      </div>
    );
  },
);

ContentLayout.displayName = "ContentLayout";
