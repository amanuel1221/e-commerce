
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../pages/Cart";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});


const mockStore = {
  cart: [
    { id: 1, name: "Shoe", price: 100, quantity: 2 },
    { id: 2, name: "Shirt", price: 50, quantity: 1 },
  ],
  incrementQuantity: vi.fn(),
  decrementQuantity: vi.fn(),
  removeFromCart: vi.fn(),
  clearCart: vi.fn(),
};

// for  return the same object
vi.mock("../store/UseProducts", () => ({
  default: () => mockStore,
}));

describe("Cart UI", () => {
  test("renders cart items and calculates total", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText("Shoe")).toBeInTheDocument();
    expect(screen.getByText("Shirt")).toBeInTheDocument();
    expect(screen.getByText("$250.00")).toBeInTheDocument();
  });

  test("increment and decrement buttons call correct functions", async () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const incrementButtons = screen.getAllByText("+");
    const decrementButtons = screen.getAllByText("-");

    await user.click(incrementButtons[0]);
    await user.click(decrementButtons[0]);

    expect(mockStore.incrementQuantity).toHaveBeenCalledWith(1);
    expect(mockStore.decrementQuantity).toHaveBeenCalledWith(1);
  });

  test("remove button calls removeFromCart", async () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const removeButtons = screen.getAllByText(/Remove/i);
    await user.click(removeButtons[0]);

    expect(mockStore.removeFromCart).toHaveBeenCalledWith(1);
  });

  test("clear cart button calls clearCart", async () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const clearBtn = screen.getByText(/Clear Cart/i);
    await user.click(clearBtn);

    expect(mockStore.clearCart).toHaveBeenCalled();
  });
});
