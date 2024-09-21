import { ReactElement, useState } from "react";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { Column } from "react-table";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },

  {
    Header: "Quentity",
    accessor: "quantity",
  },

  {
    Header: "Discount",
    accessor: "discount",
  },

  {
    Header: "Amount",
    accessor: "amount",
  },

  {
    Header: "Status",
    accessor: "status",
  },

  {
    Header: "Action",
    accessor: "action",
  },
];

function Orders() {
  const [rows] = useState<DataType[]>([
    {
      _id: "234lkjh223lk323",
      amount: 1243,
      quantity: 123,
      discount: 43,
      status: <span className="red">Processing</span>,
      action: <Link to={`/order/123`}>View</Link>,
    },
  ]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();

  return (
    <>
      <div className="container">
        <h1>My Orders</h1>
        {Table}
        {/* {isLoading ? <Skeleton length={20} /> : Table} */}
      </div>
    </>
  );
}

export default Orders;
