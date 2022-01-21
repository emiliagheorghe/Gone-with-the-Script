import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
import React from "react";
import { GoogleLogout } from "react-google-login";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import "./FeedBackList.css";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { feedbackActions } from "../actions";

const FeedbackListSelector = (state) => state.feedback.feedbackList;

function FeedBackList(props) {
  const user = props;
  const clientId =
    "434716652166-ppknk86m7bblshij8q1ooejioch6vuo6.apps.googleusercontent.com";
  const history = useHistory();
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const [selected, setSelected] = useState(null);

  const feedbacks = useSelector(FeedbackListSelector, shallowEqual);
  const dispatch = useDispatch();

  let emptyFeedback = {
    id: null,
    start: "",
    end: "",
    vehicle: "",
    hourOfDeparture: 0,
    duration: 0,
    congestionLevel: "",
    details: "",
    happinessLevel: 0,
  };
  const [feedback, setFeedback] = useState(emptyFeedback);

  useEffect(() => {
    dispatch(feedbackActions.getFeedbacks());
    console.log(user);
  }, [dispatch]);

  const openNew = () => {
    setFeedback(emptyFeedback);
    setSubmitted(false);
    setFeedbackDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setFeedbackDialog(false);
  };

  const saveFeedback = () => {
    setSubmitted(true);
    if (feedback.start.trim()) {
      let _feedbacks = [...feedbacks];
      let _feedback = { ...feedback };
      if (selected) {
        const index = findIndexById(feedback.id);
        _feedbacks[index] = _feedback;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Feedback Updated",
          life: 3000,
        });
        console.log(feedback);
        dispatch(feedbackActions.updateFeedback(feedback, feedback.id));
      } else {
        dispatch(feedbackActions.addFeedback(feedback));
        feedback.id = createId();
        feedbacks.push(feedback);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Feedback Created",
          life: 3000,
        });
      }
      setFeedbackDialog(false);
      setFeedback(emptyFeedback);
      setSelected(null);
    }
  };

  const deleteFeedback = (rowData) => {
    dispatch(feedbackActions.deleteFeedback(rowData.id));
  };

  const editFeedback = (rowData) => {
    setSelected(rowData.id);
    setFeedback(rowData);
    setFeedbackDialog(true);
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < feedbacks.length; i++) {
      if (feedbacks[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };
  const onCategoryChange = (e) => {
    let _feedback = { ...feedback };
    _feedback["vehicle"] = e.value;
    setFeedback(_feedback);
  };

  const onInputChange = (e, name) => {
    const val = e.target && e.target.value;
    let _feedback = { ...feedback };
    _feedback[`${name}`] = val;

    setFeedback(_feedback);
  };

  const opsColumn = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          id="contributeEditBtn"
          onClick={() => editFeedback(rowData)}
        />
        <Button
          icon="pi pi-times"
          id="contributeDeleteBtn"
          onClick={() => deleteFeedback(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-mx-0 p-my-1" id="title">
        Feedbacks and Experiences with Public Transport
      </h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
      <Button
        label="Add Feedback"
        icon="pi pi-plus"
        className="p-button-success p-mr-2"
        id="butonAddFeedback"
        onClick={openNew}
      />
    </div>
  );
  const feedbackDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveFeedback}
      />
    </React.Fragment>
  );

  const onSignoutSuccess = () => {
    console.clear();
    history.push("/");
  };

  const endF = (
    <GoogleLogout
      clientId={clientId}
      buttonText="Sign Out"
      onLogoutSuccess={onSignoutSuccess}
      className="externLoginFBList"
    ></GoogleLogout>
  );
  const goToProfile = (user) => {
    history.push("/user");
  };

  return (
    <div>
      <Menubar
        end={
          <>
            <Button
              icon="pi pi-fw pi-user"
              label="Your Profile"
              id="yourProfileBtn"
              onClick={goToProfile}
            />
            {endF}
          </>
        }
      />
      <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
          <DataTable
            value={feedbacks}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} feedbacks"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="start"
              header="Starting Station"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="end"
              header="Destination"
              sortable
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column field="vehicle" header="Vehicle"></Column>
            <Column
              field="hourOfDeparture"
              header="Departure Hour"
              sortable
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="duration"
              header="Duration"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="congestionLevel"
              header="Congestion Level"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="details"
              header="Details"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="happinessLevel"
              header="Happiness Level"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column header="Contribute" body={opsColumn}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={feedbackDialog}
          style={{ width: "500px" }}
          header="Feedback Transport"
          modal
          className="p-fluid"
          footer={feedbackDialogFooter}
          onHide={hideDialog}
        >
          <div className="p-field">
            <label htmlFor="start">Starting Station</label>
            <InputText
              id="start"
              value={feedback.start}
              onChange={(e) => onInputChange(e, "start")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !feedback.start,
              })}
            />
            {submitted && !feedback.start && (
              <small className="p-error">start is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="end">Destination</label>
            <InputText
              id="end"
              value={feedback.end}
              onChange={(e) => onInputChange(e, "end")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !feedback.end,
              })}
            />
            {submitted && !feedback.end && (
              <small className="p-error">destination is required.</small>
            )}
          </div>
          <div className="p-field">
            <label className="p-mb-3">Vehicle</label>
            <div className="p-formgrid p-grid">
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="busVehicle"
                  name="vehicle"
                  value="Bus"
                  onChange={onCategoryChange}
                  checked={feedback.vehicle === "Bus"}
                />
                <label htmlFor="busVehicle">Bus</label>
              </div>
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="tramVehicle"
                  name="vehicle"
                  value="Tram"
                  onChange={onCategoryChange}
                  checked={feedback.vehicle === "Tram"}
                />
                <label htmlFor="tramVehicle">Tram</label>
              </div>
              <div className="p-field-radiobutton p-col-6">
                <RadioButton
                  inputId="metroVehicle"
                  name="vehicle"
                  value="Metro"
                  onChange={onCategoryChange}
                  checked={feedback.vehicle === "Metro"}
                />
                <label htmlFor="metroVehicle">Metro</label>
              </div>
            </div>
          </div>
          <div className="p-field">
            <label htmlFor="hourOfDeparture">Departure Hour</label>
            <InputText
              id="hourOfDeparture"
              value={feedback.hourOfDeparture}
              onChange={(e) => onInputChange(e, "hourOfDeparture")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !feedback.hourOfDeparture,
              })}
            />
            {submitted && !feedback.hourOfDeparture && (
              <small className="p-error">departure hour is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="duration">Duration</label>
            <InputText
              id="duration"
              value={feedback.duration}
              onChange={(e) => onInputChange(e, "duration")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !feedback.duration,
              })}
            />
            {submitted && !feedback.duration && (
              <small className="p-error">duration is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="details">Details</label>
            <InputTextarea
              id="details"
              value={feedback.details}
              onChange={(e) => onInputChange(e, "details")}
              required
              rows={3}
              cols={20}
            />
          </div>
          <div className="p-field">
            <label htmlFor="congestionLevel">Congestion Level</label>
            <InputText
              id="congestionLevel"
              value={feedback.congestionLevel}
              onChange={(e) => onInputChange(e, "congestionLevel")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !feedback.congestionLevel,
              })}
            />
            {submitted && !feedback.congestionLevel && (
              <small className="p-error">congestion level is required.</small>
            )}
          </div>

          <div className="p-field">
            <label htmlFor="happinessLevel">Happiness Level</label>
            <InputText
              id="happinessLevel"
              value={feedback.happinessLevel}
              onChange={(e) => onInputChange(e, "happinessLevel")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !feedback.happinessLevel,
              })}
            />
            {submitted && !feedback.happinessLevel && (
              <small className="p-error">happiness level is required.</small>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default FeedBackList;
