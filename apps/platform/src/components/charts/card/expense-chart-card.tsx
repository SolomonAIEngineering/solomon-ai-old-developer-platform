import { cn } from "@v1/ui/cn";
import { Icons } from "@v1/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@v1/ui/tooltip";
import Link from "next/link";
import { AnimatedNumber } from "../../animated-number";
import { StackedBarChart } from "../stacked-bar-chart";

type Props = {
  value: any;
  defaultValue: any;
  disabled?: boolean;
  currency?: string;
  data: any;
};

export async function ExpenseChartCard({
  value,
  defaultValue,
  disabled,
  currency,
  data,
}: Props) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm",
        disabled && "pointer-events-none select-none",
      )}
    >
      <div className="space-y-2 mb-6 inline-block select-text">
        <h1 className="text-4xl font-mono">
          <AnimatedNumber
            value={data?.summary?.averageExpense ?? 0}
            currency={data?.summary?.currency ?? "USD"}
          />
        </h1>

        <div className="text-sm text-[#606060] flex items-center space-x-2">
          <p className="text-sm text-[#606060]">Average expenses</p>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Icons.Info className="h-4 w-4 mt-1" />
              </TooltipTrigger>
              <TooltipContent
                className="text-xs text-[#878787] max-w-[240px] p-4"
                side="bottom"
                sideOffset={10}
              >
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground">
                    Expenses Overview
                  </h3>
                  <p>
                    Expenses include all outgoing transactions, including
                    recurring ones. The chart shows total expenses and recurring
                    costs, helping you identify spending patterns and fixed
                    costs.
                  </p>
                  <p>
                    All amounts are converted into your{" "}
                    <Link
                      href="/settings/accounts"
                      className="text-foreground underline"
                    >
                      base currency
                    </Link>
                    .
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <StackedBarChart data={data} height={200} />
    </div>
  );
}
