import { fireEvent, render, screen } from '@testing-library/react';
import Signup from './Signup';

describe('<Signup />', () => {
  it('provides feedback on success', async () => {
    await render(<Signup />);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getAllByLabelText(/password/i)[0];
    const confirm = screen.getByLabelText(/confirm/i);
    fireEvent.change(email, { target: { value: 'foo@gmail.com' } });
    fireEvent.change(password, { target: { value: 'barbara123' } });
    fireEvent.change(confirm, { target: { value: 'barbara123' } });
    const button = screen.getByText(/Signup/);
    fireEvent.click(button);
    const feedback = await screen.findByText(/created/i);
    expect(feedback).not.toBeNull();
  });
  it('provides feedback on failure', async () => {
    await render(<Signup />);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getAllByLabelText(/password/i)[0];
    const confirm = screen.getByLabelText(/confirm/i);
    fireEvent.change(email, { target: { value: 'foo@gmail.com' } });
    fireEvent.change(password, { target: { value: 'barbara123' } });
    fireEvent.change(confirm, { target: { value: 'barbara123' } });
    const button = screen.getByText(/Signup/);
    fireEvent.click(button);
    const feedback = await screen.findByText(/error/i);
    expect(feedback).not.toBeNull();
  });
});