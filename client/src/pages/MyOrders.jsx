import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.order);

  console.log("order Items", orders);
  return (
    <div className="">
      <div className="bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center">
        <h2 className="font-semibold text-ellipsis line-clamp-1">My Orders</h2>
      </div>
      <div className="bg-blue-50 p-2 grid gap-4">
        {!orders[0] && <NoData />}
        {orders.map((order, index) => {
          return (
            <div
              key={order._id + index + "order"}
              className="border rounded p-4 flex gap-4 bg-white transition-all duration-300 hover:shadow-lg hover:shadow-green-100 hover:border-green-400 hover:scale-[1.01] cursor-pointer"
            >
              <div className="flex-shrink-0">
                <img
                  src={order.product_details.image[0]}
                  className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg border-2 border-gray-200 hover:border-green-400 transition-all duration-300"
                  alt={order.product_details.name}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <p className="text-gray-600 text-sm">
                  Order No:{" "}
                  <span className="font-semibold text-gray-800">
                    {order?.orderId}
                  </span>
                </p>
                <p className="font-semibold text-gray-800 text-base md:text-lg hover:text-green-600 transition-colors duration-200">
                  {order.product_details.name}
                </p>
                {order.product_details.price && (
                  <p className="text-gray-600 text-sm">
                    Price:{" "}
                    <span className="font-semibold text-green-600">
                      ₹{order.product_details.price}
                    </span>
                  </p>
                )}
                {order.product_details.quantity && (
                  <p className="text-gray-600 text-sm">
                    Quantity:{" "}
                    <span className="font-semibold">
                      {order.product_details.quantity}
                    </span>
                  </p>
                )}
                {order.orderStatus && (
                  <div className="mt-1">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
