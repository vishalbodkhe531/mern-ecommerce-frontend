import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { server } from "../../redux/store";
import toast from "react-hot-toast";
import { customeError } from "../../types/api-types";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../types/reducer-types";
import { Skeleton } from "../../components/loader/Loader";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const [rows, setRows] = useState<DataType[]>([]);

  const { user } = useSelector(
    (state: { userReducers: userReducerInitialState }) => state.userReducers
  );

  const { data, isLoading, isError, error } = useAllProductsQuery(user?._id!, {
    skip: !user,
  });

  if (isError) {
    const err = error as customeError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data && data.products) {
      setRows(
        data.products.map((i) => ({
          name: i.name,
          photo: <img src={`${server}/${i.photo}`} alt={i.name} />,
          dob: i.dob,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={10} /> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
