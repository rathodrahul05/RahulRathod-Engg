import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Box,
  Button,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";

import React from "react";

const schema = yup
  .object({
    carRegistrationNo: yup.string().required("Car No. is required "),
    parkingTime: yup.string().required("Parking time is required"),
  })
  .required();

function AddCarRegistration(props) {
  const {
    open,
    handleClose,
    checkAvailability,
    setCarNo,
    setParkingTime,
  } = props;

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
    checkAvailability();
    reset();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
  return (
   
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
            }}
            >
            <TableBody>
              <TableRow>
                <TableCell>
                  <Stack spacing={2}>
                    <Box>
                      Car Registration Number:
                      <br />
                      <TextField
                      data-testid="addcar-input"
                      size="small"
                      type="text"
                        {...register("carRegistrationNo")}
                        onChange={(e) => setCarNo(e.target.value)}
                      />
                      <p style={{ color: "red", fontSize: "0.9rem" }}>
                        {errors.carRegistrationNo?.message}
                      </p>
                    </Box>
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Stack spacing={2}>
                    <Box>
                      Parking Time:
                      <br />
                      <TextField
                        size="small"
                        type="time"
                        {...register("parkingTime")}
                        onChange={(e) => {
                          setParkingTime(e.target.value);
                        }}
                        />
                      <p style={{ color: "red", fontSize: "0.9rem" }}>
                        {errors.parkingTime?.message}
                      </p>
                    </Box>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <br />
          <Button variant="contained" type="submit">
            Allocate Space
          </Button>
        </form>
      </Box>
    </Modal>
    
  );
}

export default AddCarRegistration;
