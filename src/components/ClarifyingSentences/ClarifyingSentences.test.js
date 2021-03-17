import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import ClarifyingSentences from './ClarifyingSentences';

describe('<ClarifyingSentences />', () => {
  it('renders', () => {
    render(<Provider store={store}><ClarifyingSentences id='foo' /></Provider>);
    screen.debug()
    const text = screen.getAllByText(/write/i);
    expect(text).toBeTruthy();
  });
});