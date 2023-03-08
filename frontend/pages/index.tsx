import React, { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { BasicTopping, DeluxeTopping, FormInputEvent, OrderMulti, PizzaProps } from "@/models/pizza-types";
import { useRouter } from "next/router";
import { showNotification } from "@/utils/notification";
import Loader from "@/components/loader/loader.";
import { CONFIG } from "@/utils/constants";

const Home = ({ pizzas }: PizzaProps) => {
  const [selectedPizza, setSelectedPizza] = useState<string>("");
  const [deluxeToppings, setDeluxeToppings] = useState<DeluxeTopping>([]);
  const [basicToppings, setBasicToppings] = useState<BasicTopping>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [orderMulti, setOrderMulti] = useState<OrderMulti[]>([
    {
      pizza: "",
      basic_topping: "",
      deluxe_topping: "",
      quantity: 0,
    },
  ]);
  const router = useRouter();

  const pizzaSize = pizzas.find((pizza) => pizza._id === selectedPizza)?.size;

  const fetchDeluxeToppingsBySize = async () => {
    const url = `${CONFIG.API_URL}/deluxe_toppings/${pizzaSize}`;

    const response = await fetch(url).then((res) => res.json());
    const data: DeluxeTopping = response;
    setDeluxeToppings(data);
  };

  const fetchBasicToppingsBySize = async () => {
    const url = `${CONFIG.API_URL}/basic_toppings/${pizzaSize}`;
    const response = await fetch(url).then((res) => res.json());
    const data: BasicTopping = response.basicToppings;
    setBasicToppings(data);
  };

  const handleOrderMultiInputChange = (e: FormInputEvent, index: number) => {
    const { name, value } = e.target;
    const list = [...orderMulti];
    list[index][name] = value;
    setOrderMulti(list);
  };

  const handleOrderMultiInputAdd = () => {
    setOrderMulti([
      ...orderMulti,
      {
        pizza: "",
        basic_topping: "",
        deluxe_topping: "",
        quantity: 0,
      },
    ]);
  };

  const handleOrderMultiInputRemove = (index: number) => {
    const list = [...orderMulti];
    list.splice(index, 1);
    setOrderMulti(list);
  };

  const subTotal = orderMulti.reduce(
    (
      acc: number,

      curr: {
        pizza: string;
        basic_topping: string;
        deluxe_topping: string;
        quantity: number;
      }
    ) => {
      const pizzaPrice = pizzas.find((pizza) => pizza._id === curr.pizza)?.price;

      const deluxeToppingPrice = deluxeToppings.find((deluxeTopping) => deluxeTopping._id === curr.deluxe_topping)?.price;

      const basicToppingPrice = basicToppings.find((basicTopping) => basicTopping._id === curr.basic_topping)?.price;

      const total = (pizzaPrice || 0) + (deluxeToppingPrice || 0) + (basicToppingPrice || 0);

      return acc + total * curr.quantity;
    },
    0
  );

  const handleOrderMultiInputSubmit = (e: any) => {
    const tax = 0.16;
    const data = {
      order_items: orderMulti,
      sub_total: subTotal,
      total: parseFloat((subTotal * (1 + tax)).toFixed(2)),
    };

    setLoading(true);

    const url = CONFIG.API_URL + "/orders";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        showNotification("Order placed successfully.", "success");
        router.push(`/invoice/${data.order._id}`);
      })
      .catch((err) => showNotification(err.message, "error"))
      .finally(() => setLoading(false));
  };

  // Fetch deluxe toppings and basic toppings when pizza size changes for only orderMulti whose basic_topping and deluxe_topping is empty

  useEffect(() => {
    if (selectedPizza && !orderMulti.find((order) => order.basic_topping || order.deluxe_topping)) {
      fetchDeluxeToppingsBySize();
      fetchBasicToppingsBySize();
    }
  }, [selectedPizza]);

  return (
    <div className="container mx-auto items-center p-6">
      <div className="bg-white shadow-sm p-4 rounded">
        <h2 className="text-2xl font-bold text-primary text-center">Pizza Mtaani Invoice System</h2>
        {loading && <Loader />}

        <div className="flex flex-col justify-between items-center md:flex-row md:flex-wrap">
          {orderMulti.map((orderInput, index) => (
            <div className="w-full md:w-1/2 p-2" key={index}>
              <select
                name="pizza"
                value={orderInput.pizza}
                onChange={(e) => {
                  handleOrderMultiInputChange(e, index);
                  setSelectedPizza(e.target.value);
                }}
                className="w-full border border-gray-300 rounded p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Pizza</option>
                {pizzas.map((pizza) => (
                  <option key={pizza._id} value={pizza._id}>
                    {pizza.size} - {pizza.price}
                  </option>
                ))}
              </select>
              <select
                name="basic_topping"
                onChange={(e) => handleOrderMultiInputChange(e, index)}
                className="w-full border border-gray-300 rounded p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Basic Topping</option>
                {basicToppings?.map((basicTopping) => (
                  <option key={basicTopping._id} value={basicTopping._id}>
                    {basicTopping.name} - {basicTopping.price}
                  </option>
                ))}
              </select>
              <select
                name="deluxe_topping"
                onChange={(e) => handleOrderMultiInputChange(e, index)}
                className="w-full border border-gray-300 rounded p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Deluxe Topping</option>
                {deluxeToppings?.map((deluxeTopping) => (
                  <option key={deluxeTopping._id} value={deluxeTopping._id}>
                    {deluxeTopping.name} - {deluxeTopping.price}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                onChange={(e) => handleOrderMultiInputChange(e, index)}
                className="w-full border border-gray-300 rounded p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleOrderMultiInputAdd()}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border mr-2 border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
                {index > 0 && (
                  <button
                    onClick={() => handleOrderMultiInputRemove(index)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="w-full md:w-1/2 p-2">
            <div className="flex flex-col justify-between items-center md:flex-row md:flex-wrap">
              <div className="w-full md:w-1/2 p-2">
                <h3 className="text-xl font-bold text-primary">Subtotal</h3>
                <p className="text-xl font-bold text-primary">Ksh: {subTotal}</p>
              </div>
              <div className="w-full md:w-1/2 p-2">
                <h3 className="text-xl font-bold text-primary">Tax</h3>
                <p className="text-xl font-bold text-primary">
                  Ksh: {parseFloat((Number(subTotal) * Number(0.16)).toString()).toFixed(2)}
                </p>
              </div>
              <div className="w-full md:w-1/2 p-2">
                <h3 className="text-xl font-bold text-primary">Total</h3>
                <p className="text-xl font-bold text-primary">
                  Ksh: {parseFloat((Number(subTotal) + Number(subTotal) * Number(0.16)).toString()).toFixed(2)}
                </p>
              </div>
              <div className="w-full p-2">
                <button
                  type="button"
                  disabled={subTotal === 0}
                  onClick={handleOrderMultiInputSubmit}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const url = CONFIG.API_URL + "/pizza";

  console.log("url", url);

  const pizzaResponse = await fetch(url).then((res) => res.json());
  const pizzaData: PizzaProps = pizzaResponse;

  return {
    props: {
      pizzas: pizzaData?.pizzas,
    },
  };
};

export default Home;
