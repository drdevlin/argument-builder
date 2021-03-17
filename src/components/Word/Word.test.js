import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Word from './Word';

describe('<Word />', () => {
  it('renders', () => {
    render(<Provider store={store}><Word /></Provider>);
    screen.debug()
    const text = screen.getAllByText(/word/i);
    expect(text).toBeTruthy();
  });
});