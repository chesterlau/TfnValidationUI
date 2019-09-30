import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import uuid from 'uuid';
import './ValidateTfn.css';
import 'react-toastify/dist/ReactToastify.css';

const xtraceId = uuid();

const ValidateTfn = () => {

  const [tfnNumber, changeTfnNumber] = useState("");
  const [showLoader, changeShowLoader] = useState(false);

  const handleTextChange = (event) => {
    changeTfnNumber(event.target.value);
  };

  const notify = (result) => {
    const {isValid, message} = result;

    if (isValid) {
      toast.success(`${message}`, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    else {
      toast.error(`${message}`, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    
    changeShowLoader(true);

    const headers = {
      "X-trace-ID": xtraceId
    };

    axios.post(`http://localhost:5000/api/tfn/validate?tfnNumber=${tfnNumber}`, null, {headers: headers})
      .then(res => {        
        let validationResult = res.data.validationResult;
        notify(validationResult);
        changeShowLoader(false);
      })
      .catch(ex => {
        changeShowLoader(false);
      });
  }

  return (
    <div className="row validate-div">
      <div className="col-9">
        <legend>TFN Validation</legend>
        <hr />
        <ToastContainer autoClose={4000}/>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="TfnNumberLabel">TFN Number</label>
            <input type="text" className="form-control" onChange={handleTextChange} />
          </div>
          <button type="submit" className="btn btn-primary">Validate</button> <br /> <br /> <Loader showLoader={showLoader} />
        </form>
      </div>
    </div>
  );
};

export default ValidateTfn;