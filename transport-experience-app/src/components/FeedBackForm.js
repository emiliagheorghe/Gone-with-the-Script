import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

function FeedBackForm(props) {
  const { onAdd } = props;
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [hourOfDeparture, setHourDeparture] = useState("");
  const [duration, setDuration] = useState("");
  const [congestionLevel, setCongestion] = useState("");
  const [details, setDetails] = useState("");
  const [happinessLevel, setHappinessLevel] = useState("");

  const add = (event) => {
    onAdd({
      start,
    });
  };

  return (
    <div>
      This is the feedback form
      <h4> Adauga un feedback </h4>
      <span className="p-float-label">
        <InputText
          id="start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <label htmlFor="start">Starting Station</label>
      </span>
      <span className="p-float-label">
        <InputText
          id="end"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <label htmlFor="end">Ending Station</label>
      </span>
      <span className="p-float-label">
        <InputText
          id="vehicle"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />
        <label htmlFor="vehicle">Vehicle</label>
      </span>
      <span className="p-float-label">
        <InputText
          id="hourOfDeparture"
          value={hourOfDeparture}
          onChange={(e) => setHourDeparture(e.target.value)}
        />
        <label htmlFor="hourOfDeparture">Hour of Departure</label>
      </span>
      <span className="p-float-label">
        <InputText
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <label htmlFor="duration">Duration</label>
      </span>
      <span className="p-float-label">
        <InputText
          id="congestionLevel"
          value={congestionLevel}
          onChange={(e) => setCongestion(e.target.value)}
        />
        <label htmlFor="congestionLevel">Concestion level</label>
      </span>
      <span className="p-float-label">
        <InputText
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <label htmlFor="details">Details</label>
      </span>
      <div className="p-field p-col-12 p-md-3">
        <InputNumber
          inputId="happinessLevel"
          value={happinessLevel}
          onValueChange={(e) => setHappinessLevel({ happinessLevel: e.value })}
          mode="decimal"
          showButtons
          min={0}
          max={10}
        />
        <label htmlFor="minmax-buttons">Hapiness Level</label>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        
      </div>
      {/* <input
        type="text"
        placeholder="start"
        onChange={(event) => setTitle(event.target.value)}
      ></input> */}
      <input type="button" value="save" onClick={add}></input>
    </div>
  );
}
export default FeedBackForm;
