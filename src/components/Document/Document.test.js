import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Document from './Document';

describe('<Document />', () => {
  it('renders', () => {
    render(<Provider store={store}><Document /></Provider>);
    screen.debug()
    const text = screen.getAllByText(/document/i);
    expect(text).toBeTruthy();
  });
});