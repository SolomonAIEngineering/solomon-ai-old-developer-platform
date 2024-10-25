"use client"; // NextJS 13 requires this. Remove if you are using NextJS 12 or lower
import { Button, buttonVariants } from "@v1/ui/button";
import { cn } from "@v1/ui/cn";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { BracketsIcon } from "lucide-react";
import Script from "next/script";
import { useEffect } from "react";

// Separate types for better organization
/**
 * Represents the possible placement options for the Featurebase widget.
 */
type FeaturebasePlacement = "right" | "left" | "top" | "bottom";

/**
 * Represents the theme options for the Featurebase widget.
 */
type FeaturebaseTheme = "light" | "dark";

/**
 * Represents a company associated with a user in Featurebase.
 */
interface Company {
  /** Unique identifier for the company */
  id: string;
  /** Name of the company */
  name: string;
  /** Optional monthly spend amount for the company */
  monthlySpend?: number;
  /** Optional creation date of the company */
  createdAt?: string;
  /** Optional custom fields for the company */
  customFields?: Record<string, any>;
}

/**
 * Props for the AdminProductWidget component.
 */
export interface AdminProductWidgetProps {
  /** The organization name in Featurebase */
  organization: string;
  /** The placement of the widget */
  placement?: FeaturebasePlacement;
  /** The theme of the widget */
  theme: FeaturebaseTheme;
  /** Whether to show a fullscreen popup */
  fullscreenPopup: boolean;
  /** The locale for the widget */
  locale: string;
  /** The name of the user */
  usersName: string;
  /** Optional JWT token for authentication */
  token?: string;
  /** Optional CSS class name */
  className?: string;
  /** The email of the user */
  email: string;
  /** The name of the user */
  name: string;
  /** The unique identifier of the user */
  id: string;
  /** Optional URL of the user's profile picture */
  profilePicture?: string;
  /** Optional custom fields for the user */
  customFields?: Record<string, any>;
  /** Optional array of companies associated with the user */
  companies?: Company[];
}

const AdminProductWidget: React.FC<AdminProductWidgetProps> = ({
  organization,
  placement = "left",
  theme,
  fullscreenPopup,
  locale = "en",
  usersName,
  token = "",
  className,
  email,
  name,
  id,
  profilePicture,
  customFields,
  companies,
}) => {
  useEffect(() => {
    initializeFeaturebase();
  }, [
    organization,
    placement,
    theme,
    fullscreenPopup,
    locale,
    usersName,
    token,
    email,
    name,
    id,
    profilePicture,
    customFields,
    companies,
  ]);

  /**
   * Initializes the Featurebase widget by setting up the global Featurebase function
   * and calling it with the necessary configuration options.
   */
  const initializeFeaturebase = () => {
    const win = window as any;
    if (typeof win.Featurebase !== "function") {
      win.Featurebase = function () {
        // eslint-disable-next-line prefer-rest-params
        (win.Featurebase.q = win.Featurebase.q || []).push(arguments);
      };
    }

    win.Featurebase(
      "initialize_portal_widget",
      getInitializeOptions(),
      "identify",
      getIdentifyOptions(),
      handleIdentifyCallback,
    );
  };

  /**
   * Returns the initialization options for the Featurebase widget.
   * @returns An object containing the initialization options
   */
  const getInitializeOptions = () => ({
    organization,
    placement,
    theme,
    fullscreenPopup,
    locale,
    usersName,
    token,
  });

  /**
   * Returns the identification options for the Featurebase widget.
   * @returns An object containing the identification options
   */
  const getIdentifyOptions = () => ({
    organization,
    email,
    name,
    id,
    profilePicture,
    customFields,
    companies,
  });

  /**
   * Handles the callback after Featurebase identification.
   * @param err - Error object if identification failed, null otherwise
   */
  const handleIdentifyCallback = (err: Error | null) => {
    if (err) {
      console.error("Featurebase identification failed:", err);
    } else {
      console.log("Featurebase identification successful");
    }
  };

  return (
    <>
      <Script src="https://do.featurebase.app/js/sdk.js" id="featurebase-sdk" />
      <div className={cn(className)}>
        <button
          className="inline-flex items-center justify-center rounded-full bg-backgroud p-4 text-foreground-foreground transition-colors hover:bg-backgroud/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Open product updates"
          data-featurebase-feedback-portal
        >
          <BracketsIcon className="h-5 w-5" strokeWidth={0.5} />
          <span id="fb-update-badge"></span>
        </button>
      </div>
    </>
  );
};

export default AdminProductWidget;
