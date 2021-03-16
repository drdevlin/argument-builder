import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Login from './Login';

describe('<Login />', () => {
  it('renders', () => {
    render(<Provider store={store}><Login /></Provider>);
    screen.debug()
    const text = screen.getAllByText(/login/i);
    expect(text).toBeTruthy();
  });
});