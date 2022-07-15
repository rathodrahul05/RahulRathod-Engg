import axios from "axios";
import { toast } from "react-toastify";

export const makeParkingPayment = async (data) => {
  const postData = {
    "car-registration": data.carRegistrationNo,
    charge: data.parkingCharge,
  };
  const response = await axios
    .post(`https://httpstat.us/200`, postData)
    .catch((error) => {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
  if (response) {
    toast.success("Data posted successfully!!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};
