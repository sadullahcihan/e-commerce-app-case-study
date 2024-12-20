import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetail from './ProductDetail';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),  // Gerçek modülün kalan kısmını al
  useNavigate: jest.fn(),  // useNavigate fonksiyonunu mock'la
}));

describe('ProductDetail Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    brand: 'Test Brand',
    model: 'Test Model',
    price: 99.99,
    description: 'Test Description',
    image: 'test-image.jpg',
  };

  const mockOnAddToCart = jest.fn();
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product details correctly', () => {
    render(<ProductDetail product={mockProduct} onAddToCart={mockOnAddToCart} />);

    // Check if product details are rendered
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Brand - Test Model')).toBeInTheDocument();
    expect(screen.getByText('99.99 $')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test-image.jpg');
  });

  test('displays "Product not found" when no product is provided', () => {
    render(<ProductDetail product={null} onAddToCart={mockOnAddToCart} />);
    
    expect(screen.getByText('Product not found')).toBeInTheDocument();
  });

  test('calls navigate(-1) when back button is clicked', () => {
    render(<ProductDetail product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    const backButton = screen.getByText('Go Back');
    fireEvent.click(backButton);
    
    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });

  test('calls onAddToCart with product when "Add to Cart" button is clicked', () => {
    render(<ProductDetail product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('renders with correct styles', () => {
    render(<ProductDetail product={mockProduct} onAddToCart={mockOnAddToCart} />);

    // Check if the main card has correct styles
    const card = screen.getByTestId('product-detail-card');
    expect(card).toHaveStyle({
      width: '100%',
      maxWidth: '1000px',
      margin: '20px auto',
      padding: '20px',
    });

    // Check if the image has correct styles
    const image = screen.getByAltText('Test Product');
    expect(image).toHaveStyle({
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '8px',
    });
  });

  test('handles missing image gracefully', () => {
    const productWithoutImage = { ...mockProduct, image: '' };
    render(<ProductDetail product={productWithoutImage} onAddToCart={mockOnAddToCart} />);
    
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '');
  });
});
