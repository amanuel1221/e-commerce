import { describe, test, expect, beforeEach, vi } from "vitest";
import { createProductsStore } from "../store/UseProducts";

/* MOCK persist  */
vi.mock("zustand/middleware", async () => {
  const actual = await vi.importActual("zustand/middleware");
  return {
    ...actual,
    persist: (fn) => fn,
  };
});

describe("Filters and sorting logic", () => {
  let store;

  const products = [
    { id: 1, name: "Shoe", category: "Men", size: "M", price: 200 },
    { id: 2, name: "Jacket", category: "Women", size: "L", price: 500 },
    { id: 3, name: "T-Shirt", category: "Men", size: "S", price: 100 },
    { id: 4, name: "Sneakers", category: "Men", size: "M", price: 300 },
  ];

  beforeEach(() => {
    store = createProductsStore("test@example.com");

    
    store.setState({ products });
  });

  /* no filtering */
  test("returns all products when no filters applied", () => {
    const result = store.getState().getFilteredSortedItems();
    expect(result.length).toBe(4);
  });

 
  test("filters by category", () => {
    store.getState().setFilterCategory("Men");

    const result = store.getState().getFilteredSortedItems();

    expect(result.length).toBe(3);
    result.forEach((p) => expect(p.category).toBe("Men"));
  });

  
  test("filters by size", () => {
    store.getState().setFilterSize("M");

    const result = store.getState().getFilteredSortedItems();

    expect(result.length).toBe(2);
    result.forEach((p) => expect(p.size).toBe("M"));
  });

  
  test("filters by search query", () => {
    store.getState().setSearchQuery("shoe");

    const result = store.getState().getFilteredSortedItems();

    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Shoe");
  });

 
  test("sorts price low to high", () => {
    store.getState().setSortOption("PriceLowHigh");

    const result = store.getState().getFilteredSortedItems();

    expect(result.map((p) => p.price)).toEqual([100, 200, 300, 500]);
  });

  
  test("sorts price high to low", () => {
    store.getState().setSortOption("PriceHighLow");

    const result = store.getState().getFilteredSortedItems();

    expect(result.map((p) => p.price)).toEqual([500, 300, 200, 100]);
  });

  
  test("filters by category and sorts correctly", () => {
    store.getState().setFilterCategory("Men");
    store.getState().setSortOption("PriceLowHigh");

    const result = store.getState().getFilteredSortedItems();

    expect(result.map((p) => p.price)).toEqual([100, 200, 300]);
  });
});
