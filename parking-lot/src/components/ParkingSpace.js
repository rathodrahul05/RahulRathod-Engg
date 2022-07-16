import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, TextField } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { makeParkingPayment } from "../APIRequests/makePayment";
import AddCarRegistration from "./AddCarRegistration";
import ParkingCharges from "./ParkingCharges";

const schema = yup
  .object({
    parkingSpaces: yup
      .number()
      .typeError("Parking Space must be a number")
      .positive()
      .integer()
      .required()
      .nullable(),
  })
  .required();

function ParkingSpace() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
    drawParkingSpaces();
  };

  const [noOfSpaces, setSpaces] = useState(0);
  const [slots, setSlots] = useState([]);
  const [parkedCars, setParkedCars] = useState([]);
  const [carNo, setCarNo] = useState("");
  const [parkingTime, setParkingTime] = useState("");

  // state for modal
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [slotNo, setSlotNo] = useState("");
  const [carInfo, setCarInfo] = useState("");
  const [totalTime, setTotalTime] = useState("");

  const handleChange = (e) => {
    setSpaces(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const calculateCharge = (t = totalTime) => {
    if (t<1) {
      return 0;
    } else {
      let temp = t - 2;
      let min = temp * 60;
      let minutesCharge = 0.1667 * min;
      let totalCharges = 10 + minutesCharge;

      return totalCharges;
    }
  };

  const checkAvailability = () => {
    let totalTimeTaken = "";
    const startTime = moment(parkingTime, "HH:mm:ss a");
    const endTime = moment(moment(Date.now()).format("LT"), "HH:mm:ss a");
    const duration = moment.duration(endTime.diff(startTime));
    const hours = parseInt(duration.asHours());

    const minutes = parseInt(duration.asMinutes()) % 60;

    setTotalTime(hours + minutes / 60);

    totalTimeTaken = hours + minutes / 60;

    let temp = slots.filter((slot, index) => {
      return slot.isAvailable === 1;
    });
    if (temp.length > 0) {
      toast.success("Parking alloted", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      let temp1 = temp.find((slot) => {
        return slot;
      });

      setParkedCars([
        ...parkedCars,
        {
          slotNo: temp1.slotNo,
          carRegistrationNo: carNo,
          parkingTime,
          totalHalt: totalTimeTaken,
          parkingCharge: calculateCharge(totalTimeTaken),
        },
      ]);
      setSlots(
        slots.map((slot) => {
          if (slot.slotNo === temp1.slotNo) {
            return { ...slot, isAvailable: 0 };
          } else {
            return slot;
          }
        })
      );
    } else {
      toast.error("Parking is full", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    handleClose();
  };

  const drawParkingSpaces = () => {
    let temp = [];
    for (let index = 1; index <= noOfSpaces; index++) {
      temp.push({
        slotNo: index * Math.floor(Math.random() * 114),
        isAvailable: 1,
      });
    }

    setSlots(temp);
  };

  const makePayment = () => {
    setSlots(
      slots.map((slot) => {
        if (slot.slotNo === slotNo) {
          return { ...slot, isAvailable: 1 };
        } else {
          return slot;
        }
      })
    );
    setParkedCars(
      parkedCars.filter((car) => {
        return car.slotNo !== slotNo;
      })
    );
    makeParkingPayment(carInfo);
  };

  const calCulateTime = (slotNo) => {
    // eslint-disable-next-line
    let a = parkedCars.find((car) => car.slotNo == slotNo);
    console.log(parkedCars);
    const startTime = moment(a?.parkingTime, "HH:mm:ss a");
    const endTime = moment(moment(Date.now()).format("LT"), "HH:mm:ss a");
    const duration = moment.duration(endTime.diff(startTime));
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) % 60;

    setTotalTime(hours + minutes / 60);

    // eslint-disable-next-line
    let cars = parkedCars.find((car) => car.slotNo == slotNo);
    setCarInfo({
      ...cars,
      totalHalt: hours + minutes / 60,
      parkingCharge: calculateCharge(hours + minutes / 60),
    });
  };

  return (
    <>
      <h2>Parking Lot</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
     
        <TextField
        data-testid="parking-input"
          type={'number'}
          placeholder="Enter your number of parking lots"
          {...register("parkingSpaces")}
          onChange={handleChange}
        />
       
        <p style={{ color: "red", fontSize: "0.9rem" }}>
          {errors.parkingSpaces?.message}
        </p>
        <br />
        <br />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      {slots.length > 0 && (
        <>
          <h3>Available Slots</h3>
          <table className="center">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Slot No.</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <button
                        style={{
                          backgroundColor:
                            items.isAvailable === 1 ? "white" : "red",
                        }}
                        onClick={() => {
                          setSlotNo(items.slotNo);
                          setOpenModal(true);
                          calCulateTime(items.slotNo);
                        }}
                      >
                        {items.slotNo}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Add new car registration
          </Button>
          <AddCarRegistration
            open={open}
            handleClose={handleClose}
            checkAvailability={checkAvailability}
            setCarNo={setCarNo}
            setParkingTime={setParkingTime}
          />
          <ParkingCharges
            openModal={openModal}
            setOpenModal={setOpenModal}
            makePayment={makePayment}
            carInfo={carInfo}
          />
        </>
      )}
    </>
  );
}

export default ParkingSpace;
