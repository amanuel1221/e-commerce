import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";


const mockStore = {
  cart: [],
  favorites: [],
  count: 9,
  loading: false,
  error: null,
  filterCategory: "All",
  sortOption: "none",
  searchQuery: "",

  products: [
    {
      id: 1,
      name: "Shoe",
      price: 200,
      rating: 4.5,
      category: "Shoes",
      image1: "shoe.jpg",
    },
    {
      id: 2,
      name: "Jacket",
      price: 500,
      rating: 4.8,
      category: "Clothes",
      image1: "jacket.jpg",
    },
  ],

  fetchingProducts: vi.fn(),
  resetCount: vi.fn(),
  loadMore: vi.fn(),

  addToCart: vi.fn(),
  toggleFavorite: vi.fn(),

  setFilterCategory: vi.fn(),
  setSortOption: vi.fn(),
  setSearchQuery: vi.fn(),

  getFilteredSortedItems: () =>
    mockStore.products.filter((p) =>
      p.name.toLowerCase().includes(mockStore.searchQuery.toLowerCase())
    ),
};



vi.mock("../store/UseProducts", () => {
  return {
    default: (selector) =>
      typeof selector === "function" ? selector(mockStore) : mockStore,
  };
});

describe("ProductCard UI", () => {
  beforeEach(() => {
    mockStore.cart = [];
    mockStore.favorites = [];
    mockStore.searchQuery = "";
  });


  test("renders product cards", () => {
    render(
      <MemoryRouter>
        <ProductCard />
      </MemoryRouter>
    );

    expect(screen.getByText("Shoe")).toBeInTheDocument();
    expect(screen.getByText("Jacket")).toBeInTheDocument();
  });

  /* ---------- ADD TO CART ---------- */
  test("calls addToCart when button clicked", async () => {
    render(
      <MemoryRouter>
        <ProductCard />
      </MemoryRouter>
    );

    const addButtons = screen.getAllByText(/add to cart/i);
    await userEvent.click(addButtons[0]);

    expect(mockStore.addToCart).toHaveBeenCalledTimes(1);
    expect(mockStore.addToCart).toHaveBeenCalledWith(mockStore.products[0]);
  });


  test("toggles favorite when heart icon clicked", async () => {
    render(
      <MemoryRouter>
        <ProductCard />
      </MemoryRouter>
    );

    const heartButtons = screen.getAllByRole("button");
    await userEvent.click(heartButtons[0]);

    expect(mockStore.toggleFavorite).toHaveBeenCalledTimes(1);
  });

  
  test("filters products by search input", async () => {
    render(
      <MemoryRouter>
        <ProductCard />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search products/i);
    await userEvent.type(input, "shoe");

    mockStore.searchQuery = "shoe";

    expect(screen.getByText("Shoe")).toBeInTheDocument();
    expect(screen.queryByText("Jacket")).toBeInTheDocument();
  });
});
