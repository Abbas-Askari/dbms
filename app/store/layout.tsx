import "../globals.css";
import Link from "next/link";
import SellerInfo from "../ui/sellerInfo";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import DB from "@/database";
import { numberToDollars } from "../utils/general";

export default async function StoreLayout({
  children,
  pageUrl,
}: {
  children: React.ReactNode;
  pageUrl: string;
}) {
  console.log({ pageUrl });

  const customersResult = await DB.query(
    `SELECT count(distinct customer_id) as total FROM orders JOIN orderproducts ON orders.id = orderProducts.order_id WHERE completed = true;`
  );
  const customersTotal = customersResult.rows[0].total;

  const salesResult = await DB.query(
    `SELECT SUM(Pr.price * OP.quantity) as total FROM product PR JOIN orderproducts OP ON PR.id = OP.product_id WHERE completed = true;`
  );
  const salesTotal = +salesResult.rows[0].total;

  const productsResult = await DB.query(
    `SELECT SUM(quantity) as total FROM orderproducts WHERE completed = true;`
  );
  const productsTotal = +productsResult.rows[0].total;

  return (
    <div>
      <SellerInfo />
      <div className="flex justify-center gap-8">
        {/* <StatsCard index={1} title="Revenue" value="$92,110,135" />
    <StatsCard index={2} title="Products Sold" value="128" />
    <StatsCard index={3} title="Customers" value="118" /> */}

        <div className="stats shadow bg-inherit">
          <div className="stat place-items-center">
            <div className="stat-title text-xs">Customers</div>
            <div className="stat-value text-2xl">{customersTotal}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title text-xs">Sales</div>
            <div className="stat-value text-2xl">
              {numberToDollars(salesTotal)}
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title text-xs">Products Sold</div>
            <div className="stat-value text-2xl">{productsTotal}</div>
          </div>
        </div>
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
