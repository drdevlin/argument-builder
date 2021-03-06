import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import App from './App';

describe('<App />', () => {
  it('renders', () => {
    render(<Provider store={store}><App /></Provider>);
    screen.debug()
    const text = screen.getAllByText(/argument/i);
    expect(text).toBeTruthy();
  });
});