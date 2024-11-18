import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
import { Skeleton } from "../../components/loader/Loader";
import { useMyOrdersQuery } from "../../redux/api/orderAPI";
import { customeError } from "../../types/api-types";
import { userReducerInitialState } from "../../types/reducer-types";
import { RootState } from "../../redux/store";

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
  const { user } = useSelector((state: RootState) => state.userReducers);

  const { isLoading, data, error, isError } = useMyOrdersQuery(user?._id!);

  if (isError) {
    const err = error as customeError;
    toast.error(err.data.message);
  }

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((i) => ({
          _id: i.user.name,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

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
        {isLoading ? <Skeleton length={20} /> : Table}
      </div>
    </>
  );
}

export default Orders;
