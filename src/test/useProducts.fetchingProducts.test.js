import { describe, test, expect, beforeEach, vi } from "vitest";
import { createProductsStore } from "../store/UseProducts";

/* test the mock way */
vi.mock("zustand/middleware", async () => {
  const actual = await vi.importActual("zustand/middleware");
  return {
    ...actual,
    persist: (fn) => fn, // disable localStorage
  };
});

describe("fetchingProducts", () => {
  let store;

  beforeEach(() => {
    store = createProductsStore("test@example.com");
    vi.restoreAllMocks();
  });



  test("stores products on successful fetch", async () => {
    const mockProducts = [
      { id: 1, name: "Shoe", price: 100 },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      })
    );

    await store.getState().fetchingProducts();

    const state = store.getState();

    expect(state.products).toEqual(mockProducts);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  
  test("sets error on failed fetch", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: false })
    );

    await store.getState().fetchingProducts();

    const state = store.getState();

    expect(state.products).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Network Error");
  });
});
