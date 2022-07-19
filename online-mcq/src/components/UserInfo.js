import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required(),
    gender: yup.string().required(),
    language: yup.string().required(),
  })
  .required();

function UserInfo() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    navigate("/quiz-test", { replace: true });
  };
  return (
    <>
      <h2>Online MCQ App</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>Name</FormLabel>
          <TextField size="small" {...register("name")} />
          <br />
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup value={value ?? ""} onChange={onChange} row>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
          <br />
          <Controller
            control={control}
            name="language"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormControl>
                <FormLabel>Language</FormLabel>
                <RadioGroup value={value ?? ""} onChange={onChange} row>
                  <FormControlLabel
                    value="English"
                    control={<Radio />}
                    label="English"
                  />
                  <FormControlLabel
                    value="Hindi"
                    control={<Radio />}
                    label="Hindi"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
          <br />
          <Button variant="contained" type="submit">
            Submit & Start
          </Button>
        </form>
      </div>
    </>
  );
}

export default UserInfo;
