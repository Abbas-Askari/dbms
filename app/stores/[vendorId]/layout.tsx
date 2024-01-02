import "@/app/globals.css";
import SellerInfo from "@/app/ui/sellerInfo";
import DB from "@/database";
import { numberToDollars } from "../../utils/general";
import { storeCustomerCount, storeTotalProductsSold, storeTotalSales } from "@/app/lib/queries";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { vendorId: string };
}) {
  const store_id = params.vendorId;

  const customersResult = await DB.query(storeCustomerCount(+store_id));
  const customersTotal = customersResult.rows[0].total;

  const salesResult = await DB.query(storeTotalSales(+store_id));
  const salesTotal = +salesResult.rows[0].total;

  const productsResult = await DB.query(storeTotalProductsSold(+store_id));
  const productsTotal = +productsResult.rows[0].total;

  return (
    <div>
      <SellerInfo vendorId={params.vendorId} />
      <div className="flex justify-center gap-8">
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
