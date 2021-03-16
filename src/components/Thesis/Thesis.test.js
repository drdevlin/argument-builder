import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Thesis from './Thesis';

describe('<Thesis />', () => {
  it('renders', () => {
    render(<Provider store={store}><Thesis /></Provider>);
    screen.debug()
    const text = screen.getByText(/thesis/i);
    expect(text).not.toBeNull();
  });
});