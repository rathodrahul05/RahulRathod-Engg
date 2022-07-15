import {
  Box,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
// import moment from "moment";
// import React, { useEffect, useState } from "react";

function ParkingCharges(props) {
  const {
    openModal,
    setOpenModal,
    makePayment,
    carInfo,

  } = props;
  const handleClose = () => {
    setOpenModal(false);
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

useEffect(()=>{
console.log('rendered');
},[openModal])

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
                    Car No:{carInfo?.carRegistrationNo}
                    <br />
                    Parking Charges:{carInfo?.parkingCharge?.toFixed(2) } Rs
                    <br />
                  </Box>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Stack spacing={2}>
                  <Box>
                    Total Parking Time: {carInfo?.totalHalt?.toFixed(2)} h
                    <br />
                  </Box>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <button
          onClick={() => {
            makePayment();
            handleClose();
          }}
        >
          Payment Taken
        </button>
      </Box>
    </Modal>
  );
}

export default ParkingCharges;
