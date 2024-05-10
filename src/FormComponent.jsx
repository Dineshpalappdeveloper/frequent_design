import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
const FormComponent = () => {
  const [age, setAge] = React.useState("");
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState();
  const [sname, setName] = useState({
    fname: null,
    lname: null,
  });
  const [formdata, setFormData] = useState(true);
  const onHandleName = (event) => {
    const { value } = event.target;
    // Regular expression to allow only alphabetic characters
    const onlyAlphabets = /^[A-Za-z]+$/;
    if (onlyAlphabets.test(value) || value === "") {
      // If the input is alphabetic or empty, update the state
      setName({ ...sname, [event.target.name]: event.target.value });
    } else {
      alert("enter only characters");
      setName("");
    }
  };

  function isValidEmail(email) {
    // Regular expression for basic email validation
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
    setCity("");
    setState("");
  };
  const handleChangeState = (event) => {
    setState(event.target.value);
    setCity("");
  };
  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangeDob = (event) => {
    const dobValue = event.target.value; // Get the updated value directly from the event

    // Calculate the age from the entered date of birth
    const dobDate = new Date(dobValue);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();

    // Check if the calculated age is within the required range
    if (age < 14 || age >= 99 || (age === 14 && monthDiff < 0)) {
      alert("Age must be older than 14 years and less than 99 years.");
      // Optionally, you can reset the value of the input field here
      setDob(""); // Reset the value to empty string
    } else {
      setDob(dobValue); // Update the state with the new value
      setAge(age);
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (isValidEmail(email)) {
      if (gender) {
        const body = {
          firstname: sname?.fname,
          lastname: sname?.lname,
          email: email,
          country: country,
          state: state,
          city: city,
          gender: gender,
          dob: dob,
          age: age,
        };
        await axios
          .post("https://frequentserver-6als.vercel.app/api/register/", body)
          .then((res) => {
            setFormData(false);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            alert(err);
            alert("data Not saved in database");
            setFormData(false);
          });
        console.log(sname, email, city, state, country, gender, dob, age);
      } else {
        alert("select Gender");
      }
    } else {
      alert("Invalid email address");
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[300px] b-1 m-4 bg-red-50 p-2">
          <h1 className="text-center m-3">Welcome</h1>
          {formdata ? (
            <form onSubmit={submitData}>
              <TextField
                id="outlined-basic"
                label="First Name"
                margin="dense"
                type="text"
                name="fname"
                required
                fullWidth
                onChange={onHandleName}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                type="text"
                margin="dense"
                name="lname"
                onChange={onHandleName}
                fullWidth
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Email"
                onChange={onChangeEmail}
                type="email"
                margin="dense"
                fullWidth
                name="email"
                required
                variant="outlined"
              />
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                fullWidth
                required
                margin="dense"
                label="Country"
                name="country"
                onChange={handleChangeCountry}
              >
                <MenuItem value="india">India</MenuItem>
                <MenuItem value="japan">japan</MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                fullWidth
                margin="dense"
                name="state"
                label="State"
                required
                onChange={handleChangeState}
              >
                <MenuItem value="bihar">Bihar</MenuItem>
                <MenuItem value="up">Up</MenuItem>
                <MenuItem value="Jharkhand">Jharkhand</MenuItem>
              </Select>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                fullWidth
                margin="dense"
                required
                label="City"
                name="city"
                onChange={handleChangeCity}
              >
                <MenuItem value="Gaya">Gaya</MenuItem>
                <MenuItem value="Patna">Patna</MenuItem>
                <MenuItem value="Bodhgaya">Bodhgaya</MenuItem>
              </Select>
              <br />
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                className="mt-3"
              >
                Gender
              </FormLabel>
              <RadioGroup
                row
                margin="dense"
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                required
                onChange={handleChangeGender}
              >
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
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              <InputLabel id="demo-simple-select-label">
                Date of Birth
              </InputLabel>

              <TextField
                id="outlined-basic"
                type="date"
                fullWidth
                name="dob"
                required
                onChange={handleChangeDob}
                margin="dense"
                variant="outlined"
              />

              <TextField
                id="outlined-basic"
                label="Age"
                value={age}
                disabled
                fullWidth
                margin="dense"
                variant="outlined"
              />
              <div className="text-center">
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </div>
            </form>
          ) : (
            <table border style={{ border: "2px solid black" }} width="100%">
              <tr>
                <th>First Name </th> <td>{sname?.fname}</td>
              </tr>
              <tr>
                <th>Last Name</th> <td>{sname?.lname}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{email ? email : ""}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{country ? country : ""}</td>
              </tr>
              <tr>
                <th>State</th>
                <td>{state ? state : ""}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{city ? city : ""}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{gender ? gender : ""}</td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>{dob ? dob : ""}</td>
              </tr>

              <tr>
                <th>Age</th>
                <td>{age ? age : ""}</td>
              </tr>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
