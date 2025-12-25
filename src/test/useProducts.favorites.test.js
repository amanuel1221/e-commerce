import { describe, test, expect, beforeEach, vi } from "vitest";
import { createProductsStore } from "../store/UseProducts";

/* persistance moociking  */
vi.mock("zustand/middleware", async () => {
  const actual = await vi.importActual("zustand/middleware");
  return {
    ...actual,
    persist: (fn) => fn,
  };
});

describe("Favorites logic", () => {
  let store;

  const product1 = { id: 1, name: "Shoe", price: 200 };
  const product2 = { id: 2, name: "Jacket", price: 500 };

  beforeEach(() => {
    store = createProductsStore("test@example.com");
  });

  /*    ADD TO FAVORITES - */
  test("adds product to favorites", () => {
    store.getState().toggleFavorite(product1);

    const favorites = store.getState().favorites;

    expect(favorites.length).toBe(1);
    expect(favorites[0].id).toBe(product1.id);
  });

  /* toggle of favorites */
  test("removes product if toggled twice", () => {
    store.getState().toggleFavorite(product1);
    store.getState().toggleFavorite(product1);

    const favorites = store.getState().favorites;

    expect(favorites.length).toBe(0);
  });

  /* many favorites */
  test(" testing supports multiple favorite items", () => {
    store.getState().toggleFavorite(product1);
    store.getState().toggleFavorite(product2);

    const favorites = store.getState().favorites;

    expect(favorites.length).toBe(2);
    expect(favorites.map((f) => f.id)).toContain(1);
    expect(favorites.map((f) => f.id)).toContain(2);
  });

  /* -fAVOITES ≠ CART s */
  test("toggling favorite does not affect cart", () => {
    store.getState().toggleFavorite(product1);

    const cart = store.getState().cart;
    const favorites = store.getState().favorites;

    expect(cart.length).toBe(0);
    expect(favorites.length).toBe(1);
  });
});
