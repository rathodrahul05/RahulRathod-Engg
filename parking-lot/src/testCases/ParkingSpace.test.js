import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ParkingSpace from '../components/ParkingSpace';



test('Parking space all elements should be present', () => {
  render(<ParkingSpace/>);
  const linkElement = screen.getByText(/Parking Lot/i);
  const placeholder = screen.getByPlaceholderText(/Enter your number of parking lots/i);
  const submitButton=screen.getByText(/submit/i);  


  expect(linkElement).toBeInTheDocument();
  expect(placeholder).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeEnabled();
});




  

