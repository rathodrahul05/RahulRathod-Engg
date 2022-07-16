import { render, screen } from "@testing-library/react";
import ParkingCharges from "../components/ParkingCharges";

test('Testing parking charges component',()=>{
    render(<ParkingCharges openModal={true}/>);
    const carText=screen.getByText(/Car No/i);
    const chargeText=screen.getByText(/Total Parking Time/i);
    const paymentButton=screen.getByText(/payment taken/i);

    expect(carText).toBeInTheDocument();
    expect(chargeText).toBeInTheDocument();
    expect(paymentButton).toBeInTheDocument();
    expect(paymentButton).toBeEnabled();
    

})