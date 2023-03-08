import { ChangeEvent } from "react";

export type OrderMulti = {
  pizza: string;
  basic_topping: string;
  deluxe_topping: string;
  quantity: number;
  [key: string]: string | number;
};

export type FormInputEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>;

export type PizzaProps = {
  pizzas: {
    _id: string;
    size: string;
    price: number;
  }[];
};

export type DeluxeTopping = {
  _id: string;
  name: string;
  price: number;
  size: string;
}[];

export type BasicTopping = {
  _id: string;
  name: string;
  price: number;
  size: string;
}[];

export type OrderProps = {
  order: {
    _id: string;
    order_items: {
      pizza: {
        _id: string;
        price: number;
        size: string;
      };
      basic_topping: {
        _id: string;
        name: string;
        price: number;
        size: string;
      };
      deluxe_topping: {
        _id: string;
        name: string;
        price: number;
        size: string;
      };
      quantity: number;
    }[];
    tax: number;
    sub_total: number;
    total: number;
  };
};
