import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import ShowRoom from '../components/showRoom';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ShowRoom Component', () => {
  test('Navigates to the correct painting page on click', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const paintings = [
      {
        id: '1',
        picture: '/images/sample.jpg',
        name: 'Sunset View',
        technique: 'Peinture à l\'huile',
        category: 'Paysage',
        price: '200',
      },
    ];

    render(<ShowRoom filter={{ technique: 'Tout', category: 'Tout' }} paintings={paintings} />);

    // Find the painting image and simulate a click
    const paintingImage = screen.getByAltText('Sunset View');
    fireEvent.click(paintingImage);

    // Expected navigation path
    expect(mockPush).toHaveBeenCalledWith(
      {
        pathname: '/paintings/Sunset-View',
        query: { id: '1' },
      },
      '/paintings/Sunset-View'
    );
  });
});
