import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCarRegistration from "../components/AddCarRegistration";

test('Add car registration all elements should be present',()=>{
    render(<AddCarRegistration open={true}/>);
    const addCarInput=screen.getByTestId("addcar-input");
    expect(addCarInput).toBeInTheDocument();

})