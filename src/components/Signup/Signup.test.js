import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Signup from './Signup';

describe('<Signup />', () => {
  it('renders', () => {
    render(<Provider store={store}><Signup /></Provider>);
    screen.debug()
    const text = screen.getAllByText(/signup/i);
    expect(text).toBeTruthy();
  });
});