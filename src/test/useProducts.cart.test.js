import { describe, test, expect, beforeEach, vi } from "vitest";
import { createProductsStore } from "../store/UseProducts";

/*  MOCKing persist wayyy  */
vi.mock("zustand/middleware", async () => {
  const actual = await vi.importActual("zustand/middleware");
  return {
    ...actual,
    persist: (fn) => fn,
  };
});

describe("Cart logic", () => {
  let store;

  const product = {
    id: 1,
    name: "Shoe",
    price: 200,
  };

  beforeEach(() => {
    store = createProductsStore("test@example.com");
  });

  /*  ADD TO CART */
  test("adds product to cart with quantity 1", () => {
    store.getState().addToCart(product);

    const cart = store.getState().cart;

    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(1);
  });

  test("adds same product twice → increases quantity", () => {
    store.getState().addToCart(product);
    store.getState().addToCart(product);

    const cart = store.getState().cart;

    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(2);
  });

  /* delete from carts   */
  test("removes product from cart", () => {
    store.getState().addToCart(product);
    store.getState().removeFromCart(product.id);

    const cart = store.getState().cart;

    expect(cart.length).toBe(0);
  });

  /* increasing */
  test("increments quantity", () => {
    store.getState().addToCart(product);
    store.getState().incrementQuantity(product.id);

    const cart = store.getState().cart;

    expect(cart[0].quantity).toBe(2);
  });

  /* decrement test */
  test("decrements quantity", () => {
    store.getState().addToCart(product);
    store.getState().incrementQuantity(product.id);
    store.getState().decrementQuantity(product.id);

    const cart = store.getState().cart;

    expect(cart[0].quantity).toBe(1);
  });

  test("removes item if quantity becomes 0", () => {
    store.getState().addToCart(product);
    store.getState().decrementQuantity(product.id);

    const cart = store.getState().cart;

    expect(cart.length).toBe(0);
  });

 
  test("clears the cart", () => {
    store.getState().addToCart(product);
    store.getState().clearCart();

    const cart = store.getState().cart;

    expect(cart.length).toBe(0);
  });
});
