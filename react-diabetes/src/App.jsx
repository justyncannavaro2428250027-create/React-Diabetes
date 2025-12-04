import { useState } from "react";
import axios from "axios";

function App() {
  // ganti state file → jadi state formData
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: ""
  });

  const [prediction, setPrediction] = useState(null);

  // ganti handleFileChange → handle input change
  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // kirim data sesuai Railway (bukan file lagi)
      const response = await axios.post(
        "https://model-diabetes-production-73cf.up.railway.app/predict",
        formData,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      setPrediction(response.data);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Diabetes Prediction</h1>

      {/* === FORM === */}
      <form onSubmit={handleSubmit}>
        <div className="row g-3">

          {Object.keys(formData).map((key) => (
            <div className="col-md-3" key={key}>
              <label>{key}</label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleFileChange}
                className="form-control"
                required
              />
            </div>
          ))}

        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Predict
        </button>
      </form>

      {/* === RESULT === */}
{prediction && (
  <div className="mt-5">
    <h3>Result</h3>

    {/* tampilkan string prediction persis */}
    <p>{prediction.prediction}</p>

    {/* tampilkan probabilities persis */}
    <p><strong>Positive:</strong> {prediction.probabilities.positive}</p>
    <p><strong>Negative:</strong> {prediction.probabilities.negative}</p>
  </div>
)}
    </div>
  );
}

export default App;
