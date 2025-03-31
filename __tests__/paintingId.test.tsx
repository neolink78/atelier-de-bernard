import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PaintingId from '@/pages/paintings/[name]';
import { useCart } from '@/context/cartContext';
import * as PaintingsService from '@/services/paintings.service';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: { id: '1' },
    push: jest.fn(),
  })),
}));

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../context/cartContext', () => ({
  useCart: jest.fn(),
}));


jest.mock('../services/paintings.service', () => ({
  getById: jest.fn(),
}));

describe('PaintingId Page', () => {
  const mockPainting = {
    id: 1,
    picture: '/images/sample.jpg',
    name: 'Sunset View',
    technique: "Peinture à l'huile",
    category: 'Paysage',
    price: '200',
    description: 'A beautiful sunset view.',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (PaintingsService.getById as jest.Mock).mockResolvedValue(mockPainting);
  });

  test('Adds painting to cart on button click', async () => {
    const mockAddToCart = jest.fn();
    const mockRemoveFromCart = jest.fn();
    const mockCheckIfAdded = jest.fn().mockReturnValue(false);

    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
      checkIfAdded: mockCheckIfAdded,
      removeFromCart: mockRemoveFromCart,
    });

    render(<PaintingId />);

    await screen.findByText('Sunset View');

    const addButton = screen.getByText('painting_button_added');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith(mockPainting);
    });
  });

  test('Remove painting from cart on button click, then propose to add back in cart', async () => {
    const mockAddToCart = jest.fn();
    const mockRemoveFromCart = jest.fn();

    const renderWithCartState = (isInCart: boolean) => {
      (useCart as jest.Mock).mockReturnValue({
        addToCart: mockAddToCart,
        checkIfAdded: jest.fn().mockReturnValue(isInCart),
        removeFromCart: mockRemoveFromCart,
      });
      
      return render(<PaintingId />);
    };

    const { unmount } = renderWithCartState(true)

    await screen.findByText('Sunset View');

    const removeButton = screen.getByText('painting_button_removed');
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    }) 

    unmount()

    renderWithCartState(false)

    await screen.findByText('Sunset View');

    const addButton = screen.getByText('painting_button_added');
    expect(addButton).toBeInTheDocument();
  });
});