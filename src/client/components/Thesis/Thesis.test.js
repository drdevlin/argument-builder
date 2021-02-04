import { render, screen } from '@testing-library/react';
import Thesis from './Thesis';

describe('<Thesis />', () => {
  it('renders', () => {
    render(<Thesis />);
    screen.debug()
    const text = screen.getByText(/thesis/);
    expect(text).not.toBeNull();
  });
});