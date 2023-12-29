import "../globals.css";
import Link from "next/link";
import SellerInfo from "../ui/sellerInfo";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

export default function StoreLayout({
  children,
  pageUrl,
}: {
  children: React.ReactNode;
  pageUrl: string;
}) {
  console.log({ pageUrl });
  return (
    <div>
      <SellerInfo />
      <div className="flex justify-center gap-8">
        {/* <StatsCard index={1} title="Revenue" value="$92,110,135" />
    <StatsCard index={2} title="Products Sold" value="128" />
    <StatsCard index={3} title="Customers" value="118" /> */}

        <div className="stats shadow bg-neutral-800">
          <div className="stat place-items-center">
            <div className="stat-title text-xs">Downloads</div>
            <div className="stat-value text-2xl">31K</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title text-xs">Downloads</div>
            <div className="stat-value text-2xl">31K</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title text-xs">Downloads</div>
            <div className="stat-value text-2xl">31K</div>
          </div>
        </div>
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
