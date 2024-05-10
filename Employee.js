import React, { Component } from "react";
import { variables } from "./Variables.js";

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      employees: [],
      modalTitle: "",
      DepartmentName: "",
      EmployeeId: 0,
      Department: "",
      DateOfJoining: "",
      PhotoFileName: "gs.png",
      PhotoPath: variables.PHOTO_URL,
    };
  }
  //apiConsume-Çalışanları getir.(GET)
  apiConsume() {
    fetch(variables.API_URL + "employees")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employees: data });
      });
    //apiConsume-Departmanları dropdown'a getir.(GET)
    fetch(variables.API_URL + "departments")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          departments: data.map((dep) => ({
            DepartmentId: dep.DepartmentId,
            DepartmentName: dep.DepartmentName,
          })),
        });
      });
  }
  componentDidMount() {
    this.apiConsume();
  }
  //modal property
  changeEmployeeName = (e) => {
    this.setState({ EmployeeName: e.target.value });
  };
  changeDepartment = (e) => {
    this.setState({ Department: e.target.value });
  };
  changeDateOfJoining = (e) => {
    this.setState({ DateOfJoining: e.target.value });
  };
  //Çalışan ekle modalı
  addClick() {
    this.setState({
      modalTitle: "Çalışan ekle",
      EmployeeId: 0,
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName: "gs.png",
    });
  }
  //Çalışan güncelle modalı
  editClick(emp) {
    this.setState({
      modalTitle: "Çalışan bilgileri güncelle",
      EmployeeId: emp.EmployeeId,
      EmployeeName: emp.EmployeeName,
      Department: emp.Department,
      DateOfJoining: emp.DateOfJoining,
      PhotoFileName: emp.PhotoFileName,
    });
  }
  //apiCosume Çalışan ekle action(POST)
  createClick() {
    fetch(variables.API_URL + "employees", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeId: this.state.EmployeeId,
        EmployeeName: this.state.EmployeeName,
        Department: this.state.Department,
        DateOfJoining: this.state.DateOfJoining,
        PhotoFileName: this.state.PhotoFileName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.apiConsume(); //Oluşturduktan sonra yeni çalışan listesini getir.
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  //apiCosume Çalışan güncelle action(PUT)
  updateClick() {
    fetch(variables.API_URL + "employees", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeId: this.state.EmployeeId,
        EmployeeName: this.state.EmployeeName,
        Department: this.state.Department,
        DateOfJoining: this.state.DateOfJoining,
        PhotoFileName: this.state.PhotoFileName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.apiConsume(); //Güncelledikten sonra yeni çalışan listesini getir.
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  //apiCosume Çalışan sil action(DELETE)
  deleteClick(id) {
    if (window.confirm("Emin misin?")) {
      fetch(variables.API_URL + "employees/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.apiConsume(); //Sildikten sonra yeni çalışan listesini getir.
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  //apiCosume Çalışan Foto yükleme action(POST)
  imageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + "employees/SaveFile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ PhotoFileName: data });
      });
  };

  render() {
    const {
      employees,
      departments,
      modalTitle,
      EmployeeName,
      EmployeeId,
      Department,
      DateOfJoining,
      PhotoPath,
      PhotoFileName,
    } = this.state;
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Yeni Çlışan
        </button>
        <table className="table table-striped mt-1">
          <thead>
            <tr>
              <th>Employee No</th>
              <th>Employee Adı</th>
              <th>Department</th>
              <th>DOJ</th>
              <th>Ayarlar</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.EmployeeId}>
                <td>{emp.EmployeeId}</td>
                <td>{emp.EmployeeName}</td>
                <td>{emp.Department}</td>
                <td>{emp.DateOfJoining}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(emp)} // çalışan güncelle icon.
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fillRule="currentColor"
                      className="bi bi-arrow-down-left-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm8.096-10.803L6 9.293V6.525a.5.5 0 0 0-1 0V10.5a.5.5 0 0 0 .5.5h3.975a.5.5 0 0 0 0-1H6.707l4.096-4.096a.5.5 0 1 0-.707-.707" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(emp.EmployeeId)} // çalışan sil icon.
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fillRule="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Çalışan Adı</span>
                      <input
                        type="text"
                        className="form-control"
                        value={EmployeeName}
                        onChange={this.changeEmployeeName}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Departman</span>
                      <select
                        className="form-select"
                        onChange={this.changeDepartment}
                        value={Department}
                      >
                        {departments.map((dep) => (
                          <option key={dep.DepartmentId}>
                            {dep.DepartmentName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">DOJ</span>
                      <input
                        type="date"
                        className="form-control"
                        value={DateOfJoining}
                        onChange={this.changeDateOfJoining}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-50 bd-highlight">
                    <img
                      width="250px"
                      height="250px"
                      src={PhotoPath + PhotoFileName}
                      alt="EmployeePhoto"
                    />
                    <input
                      className="m-2"
                      type="file"
                      onChange={this.imageUpload}
                    />
                    <div/>
                  </div>
                  </div>
                  {EmployeeId === 0 ? ( //EmployeeId = 0 ise yeni departman oluştur.
                    <button
                      type="button"
                      className="btn btn-primary float-start"
                      onClick={() => this.createClick()}
                    >
                      Ekle
                    </button>
                  ) : null}

                  {EmployeeId !== 0 ? ( //EmployeeId = 0 dan farklı ise departman güncelle.
                    <button
                      type="button"
                      className="btn btn-primary float-start"
                      onClick={() => this.updateClick()}
                    >
                      Güncelle
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
