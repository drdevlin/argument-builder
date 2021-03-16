import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import SupportingClaims from './SupportingClaims';

describe('<SupportingClaims />', () => {
  it('renders', () => {
    render(<Provider store={store}><SupportingClaims /></Provider>);
    screen.debug()
    const text = screen.getAllByText(/what/i);
    expect(text).toBeTruthy();
  });
});