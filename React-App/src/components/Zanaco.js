import React, { useState, useEffect } from "react";
import dataServices from "../services/accountService";

const Zanac = props => {
  const initialZanacotate = {
    id: null,
    name: "",    dept: "",    post: "",    salary: "",
    published: false
  };
  const [currentZanac, setCurrentZanac] = useState(initialZanacotate);
  const [message, setMessage] = useState("");

  const getZanac = id => {
    dataServices.get(id)
      .then(response => {
        setCurrentZanac(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getZanac(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentZanac({ ...currentZanac, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentZanac.id,
      name: currentZanac.name,
      dept: currentZanac.dept,
      post: currentZanac.post,
      salary: currentZanac.salary,
      published: status
    };

    dataServices.update(currentZanac.id, data)
      .then(response => {
        setCurrentZanac({ ...currentZanac, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateZanac = () => {
    dataServices.update(currentZanac.id, currentZanac)
      .then(response => {
        console.log(response.data);
        setMessage("The Zanac was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteZanac = () => {
    dataServices.remove(currentZanac.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/employees"); 
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentZanac ? (
        <div className="edit-form">
          <h4> Banker</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentZanac.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dept">Department</label>
              <input
                type="text"                className="form-control"
                id="dept"                name="dept"
                value={currentZanac.dept}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="post">Position</label>
              <input
                type="text"                className="form-control"
                id="post"                name="post"
                value={currentZanac.post}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dept">DepositTwo</label>
              <input
                type="text"                className="form-control"
                id="salary"                name="salary"
                value={currentZanac.salary}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentZanac.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentZanac.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteZanac}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateZanac}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Banker...</p>
        </div>
      )}
    </div>
  );
};

export default Zanac;
