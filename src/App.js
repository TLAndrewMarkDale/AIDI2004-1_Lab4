import logo from "./Fish.svg";
import "./App.css";
///import { promises as fs } from 'fs';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./App.css";
import { useState } from "react";

export function FishForm(event) {
  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (
      formData.get("Weight") === "" ||
      formData.get("Length1") === "" ||
      formData.get("Length2") === "" ||
      formData.get("Length3") === "" ||
      formData.get("Height") === "" ||
      formData.get("Width") === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    const payload = Object.fromEntries(formData);
    console.log(payload);
    fetch("https://lab4-fishclassifier-deada77e5960.herokuapp.com/predict", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  const replaceNonNumeric = (value) => {
    if (value.split(".").length > 2) value = value.replace(/\.+$/, "");
    return value.replace(/[^0-9|.]+/g, "");
  };
  const clearForm = (value) => {
    setWeight("");
    setLength1("");
    setLength2("");
    setLength3("");
    setHeight("");
    setWidth("");
    setPrediction("");
  };
  const [Weight, setWeight] = useState("");
  const [Length1, setLength1] = useState("");
  const [Length2, setLength2] = useState("");
  const [Length3, setLength3] = useState("");
  const [Height, setHeight] = useState("");
  const [Width, setWidth] = useState("");
  const [Prediction, setPrediction] = useState("");
  const formData = new FormData(event.target);
  const payload = Object.fromEntries(formData);
  return (
    <>
    <h1>Predicting Fish Species</h1>
      <div className="wrapper">
        <div className="one">
          <Form onSubmit={submitForm} id="fishform">
            <Form.Group className="mb-3">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                name="Weight"
                value={Weight}
                onChange={(e) => setWeight(replaceNonNumeric(e.target.value))}
                placeholder="Numeric value"
                style={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Length1</Form.Label>
              <Form.Control
                type="text"
                name="Length1"
                value={Length1}
                onChange={(e) => setLength1(replaceNonNumeric(e.target.value))}
                placeholder="Numeric value"
                style={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Length2</Form.Label>
              <Form.Control
                type="text"
                name="Length2"
                value={Length2}
                onChange={(e) => setLength2(replaceNonNumeric(e.target.value))}
                placeholder="Numeric value"
                style={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Length3</Form.Label>
              <Form.Control
                type="text"
                name="Length3"
                value={Length3}
                onChange={(e) => setLength3(replaceNonNumeric(e.target.value))}
                placeholder="Numeric value"
                style={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="text"
                name="Height"
                value={Height}
                onChange={(e) => setHeight(replaceNonNumeric(e.target.value))}
                placeholder="Numeric value"
                style={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Width</Form.Label>
              <Form.Control
                type="text"
                name="Width"
                value={Width}
                onChange={(e) => setWidth(replaceNonNumeric(e.target.value))}
                placeholder="Numeric value"
                style={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="wrapper">
                <div className="one">
                  <Button
                    variant="secondary"
                    type="reset"
                    onClick={clearForm}
                    id="clearButton"
                  >
                    Clear
                  </Button>
                </div>
                <div className="two">
                  <Button variant="primary" type="submit" style={styles.button}>
                    Submit
                  </Button>
                </div>
              </div>
            </Form.Group>
          </Form>
        </div>
        <div className="two">
          <h2>
            Prediction: <br></br>
            {Prediction}
          </h2>
        </div>
      </div>
    </>
  );
}
