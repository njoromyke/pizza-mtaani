import { OrderProps } from "@/models/pizza-types";
import { CONFIG } from "@/utils/constants";
import { PrinterIcon } from "@heroicons/react/24/solid";

const Invoice = ({ order }: OrderProps) => {
  return (
    <div className="container mx-auto flex justify-center flex-wrap items-center my-4">
      <div className="bg-white w-full shadow-sm px-6 py-4 rounded lg:w-1/2">
        <div className="flex justify-between items-center  mx-auto">
          <h2 className="text-3xl font-bold text-primary uppercase">Pizza Mtaani</h2>
          <h2 className="text-2xl  text-black">Invoice</h2>
        </div>
        <hr className="my-2  bg-gray-200" />
        <div className="flex justify-between items-center  mx-auto">
          <div className="w-1/2 space-x-5">
            <span className="text-sm font-bold text-black">Order ID</span>
            <span className="text-sm  text-gray-500">{order._id}</span>
          </div>
          <div className=" space-x-5 float-right">
            <span className="text-sm font-bold text-black">Date</span>
            <span className="text-sm  text-gray-500">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        <hr className="my-2  bg-gray-200" />
        <div className="flex justify-between items-center mx-auto">
          <table className="table-auto w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-gray-800">Pizza</th>
                <th className="px-4 py-2 text-gray-800">Basic Toppings</th>
                <th className="px-4 py-2 text-gray-800">Deluxe Toppings</th>
                <th className="px-4 py-2 text-gray-800">Quantity</th>
                <th className="px-4 py-2 text-gray-800">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.order_items.map((orderItem, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-gray-600">{orderItem.pizza.size}</td>
                  <td className="border px-4 py-2 text-gray-600">{orderItem.basic_topping.name}</td>
                  <td className="border px-4 py-2 text-gray-600">{orderItem.deluxe_topping.name}</td>
                  <td className="border px-4 py-2 text-gray-600">{orderItem.quantity}</td>
                  <td className="border px-4 py-2 text-gray-600">
                    {orderItem.pizza.price + orderItem.basic_topping.price + orderItem.deluxe_topping.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col space-y-2 float-right mt-5 mx-auto">
          <div className="flex justify-between items-center space-x-10">
            <span className="text-sm font-bold text-black">Sub Total</span>
            <span className="text-sm  text-gray-500">KES: {order.sub_total}</span>
          </div>
          <div className="flex justify-between items-center space-x-10">
            <span className="text-sm font-bold text-black">Tax</span>
            <span className="text-sm  text-gray-500">KES: {order.tax}</span>
          </div>
          <div className="flex justify-between items-center space-x-10">
            <span className="text-sm font-bold text-black">Total</span>
            <span className="text-sm  text-gray-500">KES: {order.total}</span>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto flex justify-center items-baseline mt-10 ">
        <button
          onClick={() => window.print()}
          className="bg-gray-300 border border-gray-300 flex text-gray-600 px-4 py-2 rounded-md font-bold text-sm"
        >
          Print Invoice <PrinterIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Invoice;

export const getServerSideProps = async (context: { params: { invoiceId: string } }) => {
  const invoiceId = context.params.invoiceId;
  const url = CONFIG.API_URL + "/orders/" + invoiceId;
  const data = await fetch(url).then((res) => res.json());

  console.log(data);

  return {
    props: {
      order: data.order,
    },
  };
};
