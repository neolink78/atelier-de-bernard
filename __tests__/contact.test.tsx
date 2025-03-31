import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '@/pages/contact';
import { post } from '@/services/contacts.service';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../services/contacts.service', () => ({
  post: jest.fn(),
}));

describe('Contact Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders contact form fields', () => {
    render(<Contact />);

    expect(screen.getByLabelText('contact_name')).toBeInTheDocument();
    expect(screen.getByLabelText('contact_lastname')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'contact_button' })).toBeInTheDocument();
  });

  test('shows validation errors when fields are empty', async () => {
    render(<Contact />);

    fireEvent.click(screen.getByRole('button', { name: 'contact_button' }));

    await waitFor(() => {
      expect(screen.getByText('contact_name_tooshort')).toBeInTheDocument();
      expect(screen.getByText('contact_lastname_tooshort')).toBeInTheDocument();
      expect(screen.getByText('contact_email_error')).toBeInTheDocument();
      expect(screen.getByText('contact_message_tooshort')).toBeInTheDocument();
    });
  });

  test('submits form successfully and clears errors', async () => {
    (post as jest.Mock).mockResolvedValue({ status: 200 });

    render(<Contact />);

    fireEvent.input(screen.getByLabelText('contact_name'), { target: { value: 'John' } });
    fireEvent.input(screen.getByLabelText('contact_lastname'), { target: { value: 'Doe' } });
    fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.input(screen.getByLabelText('Message'), { target: { value: 'Hello!' } });

    fireEvent.click(screen.getByRole('button', { name: 'contact_button' }));

    await waitFor(() => expect(post).toHaveBeenCalledWith({
      firstname: 'John',
      lastname: 'Doe',
      mail: 'john.doe@example.com',
      message: 'Hello!',
    }));

    expect(screen.queryByText('tooshort')).not.toBeInTheDocument();
  });

  test('displays server error when submission fails', async () => {
    (post as jest.Mock).mockResolvedValue({
      status: 500,
      response: { data: { error: 'contact_button_error' } },
    });

    render(<Contact />);

    fireEvent.input(screen.getByLabelText('contact_name'), { target: { value: 'John' } });
    fireEvent.input(screen.getByLabelText('contact_lastname'), { target: { value: 'Doe' } });
    fireEvent.input(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.input(screen.getByLabelText('Message'), { target: { value: 'Hello!' } });

    fireEvent.click(screen.getByRole('button', { name: 'contact_button' }));

    await waitFor(() => {
      expect(screen.getByText('contact_button_error')).toBeInTheDocument();
    });
  });
});
