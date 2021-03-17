import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Words from './Words';

describe('<Words />', () => {
  it('renders', () => {
    render(<Provider store={store}><Words claim='hello world' /></Provider>);
    screen.debug()
    const text = screen.getAllByText(/words/i);
    expect(text).toBeTruthy();
  });
});