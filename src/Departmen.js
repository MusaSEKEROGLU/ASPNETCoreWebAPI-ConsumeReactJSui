import React, { Component } from "react";
import { variables } from "./Variables.js";

export default class Departmen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      modalTitle: "",
      DepartmentName: "",
      DepartmentId: 0,

      DepartmentIdFilter: "", //filtreleme değişkenleri
      DepartmentNameFilter: "", //filtreleme değişkenleri
      departmentsWithoutFilter: [], //filtreleme değişkenleri
    };
  }

  //Filtreleyerek arama start
  FilterFn() {
    var DepartmentIdFilter = this.state.DepartmentIdFilter;
    var DepartmentNameFilter = this.state.DepartmentNameFilter;

    var filtredData = this.state.departmentsWithoutFilter.filter(function (el) {
      return (
        el.DepartmentId.toString()
          .toLowerCase()
          .includes(DepartmentIdFilter.toString().trim().toLowerCase()) &&
        el.DepartmentName.toString()
          .toLowerCase()
          .includes(DepartmentNameFilter.toString().trim().toLowerCase())
      );
    });
    this.setState({ departments: filtredData });
  }
  //Aşağı-Yukarı Oku ile Sıralama
  sortResult(prop, asc) {
    var soortedData = this.state.departmentsWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
    this.setState({ departments: soortedData });
  }
  //Id ye göre filtreleme
  changeDepartmentIdFilter = (e) => {
    this.setState({ DepartmentIdFilter: e.target.value }, () => {
      this.FilterFn();
    });
  };
  //İsme göre filtreleme
  changeDepartmentNameFilter = (e) => {
    this.setState({ DepartmentNameFilter: e.target.value }, () => {
      this.FilterFn();
    });
  };
  //Filtreleyerek arama end

  //apiConsume-departmanları getir.(GET)
  apiConsume() {
    fetch(variables.API_URL + "departments")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ departments: data, departmentsWithoutFilter: data });
      });
  }
  componentDidMount() {
    this.apiConsume();
  }
  //modal property
  changeDepartmentName = (e) => {
    this.setState({ DepartmentName: e.target.value });
  };
  //Departman ekle modalı
  addClick() {
    this.setState({
      modalTitle: "Departman Ekle",
      DepartmentId: 0,
      DepartmentName: "",
    });
  }
  //Departman güncelle modalı
  editClick(dep) {
    this.setState({
      modalTitle: "Departman Güncelle",
      DepartmentId: dep.DepartmentId,
      DepartmentName: dep.DepartmentName,
    });
  }
  //apiCosume Departman ekle action(POST)
  createClick() {
    fetch(variables.API_URL + "departments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentName: this.state.DepartmentName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.apiConsume(); //Oluşturduktan sonra yeni departman listesini getir.
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  //apiCosume Departman güncelle action(PUT)
  updateClick() {
    fetch(variables.API_URL + "departments", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentId: this.state.DepartmentId,
        DepartmentName: this.state.DepartmentName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.apiConsume(); //Güncelledikten sonra yeni departman listesini getir.
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  //apiCosume Departman sil action(DELETE)
  deleteClick(id) {
    if (window.confirm("Emin misin?")) {
      fetch(variables.API_URL + "departments/" + id, {
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
            this.apiConsume(); //Sildikten sonra yeni departman listesini getir.
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  render() {
    const { departments, modalTitle, DepartmentName, DepartmentId } =
      this.state;
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Yeni Departman
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                {/* Filtreleme start   Id ye göre filtreleme*/}
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeDepartmentIdFilter}
                    placeholder="Filtrele"
                  />
                  {/* //Aşağı-Yukarı Oku ile Sıralama */}
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("DepartmentId", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fillRule="currentColor"
                      className="bi bi-arrow-down-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("DepartmentId", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fillRule="currentColor"
                      className="bi bi-arrow-up-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                      />
                    </svg>
                  </button>
                </div>
                Departman No
              </th>
              {/*İsme göre filtreleme*/}
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeDepartmentNameFilter}
                    placeholder="Filtrele"
                  />
                  {/* //Aşağı-Yukarı Oku ile Sıralama */}
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("DepartmentName", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fillRule="currentColor"
                      className="bi bi-arrow-down-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("DepartmentName", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fillRule="currentColor"
                      className="bi bi-arrow-up-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                      />
                    </svg>
                  </button>
                </div>
                Departman Adı
              </th>
              {/* Filtreleme end */}
              <th>Ayarlar</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dep) => (
              <tr key={dep.DepartmentId}>
                <td>{dep.DepartmentId}</td>
                <td>{dep.DepartmentName}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(dep)} // departman güncelle icon.
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
                    onClick={() => this.deleteClick(dep.DepartmentId)} // departman sil icon.
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
                <div className="input-group mb-3">
                  <span className="input-group-text">Departman Adı</span>
                  <input
                    type="text"
                    className="form-control"
                    value={DepartmentName}
                    onChange={this.changeDepartmentName}
                  />
                </div>
                {DepartmentId === 0 ? ( //departmanId = 0 ise yeni departman oluştur.
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Ekle
                  </button>
                ) : null}

                {DepartmentId !== 0 ? ( //departmanId = 0 dan farklı ise departman güncelle.
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
