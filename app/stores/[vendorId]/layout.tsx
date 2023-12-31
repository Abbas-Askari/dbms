import "@/app/globals.css";
import SellerInfo from "@/app/ui/sellerInfo";
import DB from "@/database";
import { numberToDollars } from "../../utils/general";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { vendorId: string };
}) {
  const vendor_id = params.vendorId;

  const customersResult = await DB.query(
    `SELECT count(distinct customer_id) as total
      FROM orders JOIN orderproducts ON orders.id = orderProducts.order_id
      JOIN (SELECT id FROM product WHERE vendor_id = ${vendor_id}) Pr ON Pr.id = orderProducts.product_id
      WHERE completed = true;`
  );
  const customersTotal = customersResult.rows[0].total;

  const salesResult = await DB.query(
    `SELECT SUM(Pr.price * OP.quantity) as total FROM product PR JOIN orderproducts OP ON PR.id = OP.product_id WHERE completed = true AND vendor_id = ${vendor_id};`
  );
  const salesTotal = +salesResult.rows[0].total;

  const productsResult = await DB.query(
    `SELECT SUM(quantity) as total FROM orderproducts
      JOIN (SELECT id FROM product WHERE vendor_id = ${vendor_id}) Pr ON Pr.id = orderProducts.product_id
      WHERE completed = true;`
  );
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
