import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "./ProductList";

// Mock the ProductCard component since we're only testing ProductList
jest.mock("./ProductCard", () => {
  return function MockProductCard({ product }) {
    return <div data-testid="product-card">{product.name}</div>;
  };
});

// Create mock products for testing
const mockProducts = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  price: 99.99,
}));

describe("ProductList", () => {
  // Test 1: Initial render
  test("renders the correct number of products for the first page", () => {
    render(<ProductList products={mockProducts} />);

    // Check if 12 products are rendered (itemsPerPage)
    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(12);
  });

  // Test 2: Pagination buttons
  test("renders the correct number of pagination buttons", () => {
    render(<ProductList products={mockProducts} />);

    // With 25 products and 12 per page, we should have 3 pagination buttons
    const paginationButtons = screen.getAllByRole("button");
    expect(paginationButtons).toHaveLength(3);
  });

  // Test 3: Page change
  test("changes page when pagination button is clicked", () => {
    render(<ProductList products={mockProducts} />);

    // Click the second page button
    const secondPageButton = screen.getByText("2");
    fireEvent.click(secondPageButton);

    // Check if products 13-24 are rendered
    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(12);
    expect(productCards[0].textContent).toBe("Product 13");
  });

  // Test 4: Last page
  test("renders correct number of products on last page", () => {
    render(<ProductList products={mockProducts} />);

    // Click the last page button (3rd page)
    const lastPageButton = screen.getByText("3");
    fireEvent.click(lastPageButton);

    // Check if only 1 product is rendered (25th product)
    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(1);
    expect(productCards[0].textContent).toBe("Product 25");
  });

  // Test 5: Active page button styling
  test("highlights the active page button", () => {
    render(<ProductList products={mockProducts} />);

    // Check if first page button has the active background color
    const firstPageButton = screen.getByText("1");
    expect(firstPageButton).toHaveStyle({ backgroundColor: "#007BFF" });

    // Click second page and check if it becomes active
    const secondPageButton = screen.getByText("2");
    fireEvent.click(secondPageButton);
    expect(secondPageButton).toHaveStyle({ backgroundColor: "#007BFF" });
    expect(firstPageButton).toHaveStyle({ backgroundColor: "#f0f0f0" });
  });
});
