import React, { useState, useEffect, useRef } from "react";
import Preloader from "../../Preloader";
import { Link, useNavigate } from "react-router-dom";
import "../../pages/Dashboard/Dashboard.css";
import "../../pages/Dashboard/Dashboard-responsive.css";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";

import api from "../../api";
import { useSelector } from "react-redux";

const ServiceType = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [totalRecords, setTotalRecords] = useState(0);
  const [showServiceTypeModal, setShowServiceTypeModal] = useState(false);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [serviceTypesData, setServiceTypesData] = useState([]);
  const [dataState, setDataState] = useState("Add");
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState(null);

  const serviceTypeOptions = [
    { name: "Meet and Greet" },
    { name: "Park and Ride" },
    { name: "Valet Service" },
    { name: "Self Service" },
    { name: "Covered Parking" }
  ];

  const initialServiceTypeData = {
    type: "",
    description: ""
  };

  const [serviceTypeData, setServiceTypeData] = useState(initialServiceTypeData);
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceTypeData({
      ...serviceTypeData,
      [name]: value
    });
  };

  const handleServiceTypeChange = (e) => {
    setServiceTypeData({
      ...serviceTypeData,
      type: e.value
    });
  };

  const fetchServiceTypes = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/admin/service-types", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setServiceTypesData(response.data.data);
      setTotalRecords(response.data.totalCount);
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch service types",
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const createServiceType = async () => {
    setLoading(true);
    try {
      const response = await api.post(
        "/api/admin/create-service-type",
        serviceTypeData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Service type created successfully",
        life: 3000
      });
      
      setServiceTypeData(initialServiceTypeData);
      setShowServiceTypeModal(false);
      fetchServiceTypes();
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.response?.data?.error || "Failed to create service type",
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const updateServiceType = async () => {
    setLoading(true);
    try {
      const response = await api.put(
        `/api/admin/update-service-type/${selectedServiceTypeId}`,
        serviceTypeData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Service type updated successfully",
        life: 3000
      });
      
      setServiceTypeData(initialServiceTypeData);
      setShowServiceTypeModal(false);
      setDataState("Add");
      setSelectedServiceTypeId(null);
      fetchServiceTypes();
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.response?.data?.error || "Failed to update service type",
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateServiceType = (e) => {
    e.preventDefault();
    setShowError(false);

    if (!serviceTypeData.type || !serviceTypeData.description.trim()) {
      setShowError(true);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill all required fields!",
        life: 3000
      });
      return;
    }

    createServiceType();
  };

  const handleUpdateServiceType = (e) => {
    e.preventDefault();
    setShowError(false);

    if (!serviceTypeData.type || !serviceTypeData.description.trim()) {
      setShowError(true);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill all required fields!",
        life: 3000
      });
      return;
    }

    updateServiceType();
  };

  const handleDeleteServiceType = (id) => {
    confirmDialog({
      message: "Are you sure you want to delete this service type?",
      header: "Delete Confirmation",
      icon: "bi bi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "btn_primary_fill",
      rejectClassName: "btn_primary_outline",
      accept: () => deleteServiceType(id),
    });
  };

  const deleteServiceType = async (id) => {
    try {
      await api.delete(`/api/admin/delete-service-type/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Service type deleted successfully",
        life: 3000
      });
      
      fetchServiceTypes();
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.response?.data?.error || "Failed to delete service type",
        life: 3000
      });
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="data-table-action">
        <Button
          icon="bi bi-pencil-square"
          className="data-edit-button"
          onClick={() => {
            setServiceTypeData({
              type: rowData.type,
              description: rowData.description
            });
            setShowServiceTypeModal(true);
            setDataState("Edit");
            setSelectedServiceTypeId(rowData._id);
          }}
        />
        <Button
          icon="bi bi-trash3"
          className="data-delete-button"
          onClick={() => handleDeleteServiceType(rowData._id)}
        />
      </div>
    );
  };

  const descriptionBodyTemplate = (rowData) => {
    const truncatedDescription = rowData.description?.length > 100 
      ? rowData.description.substring(0, 100) + "..." 
      : rowData.description;
    return <span title={rowData.description}>{truncatedDescription}</span>;
  };

  const serviceTypeModalHeader = () => {
    return (
      <div className="modal-header p-2">
        <h1 className="modal-title fs-5">
          {dataState === "Add" ? "Create" : "Edit"}&nbsp;service type
        </h1>
        <button
          type="button"
          className="btn-close"
          onClick={() => setShowServiceTypeModal(false)}
        ></button>
      </div>
    );
  };

  const serviceTypeModalFooter = () => {
    return (
      <div className="custom_modal_footer p-2">
        <Button
          label="Cancel"
          severity="secondary"
          className="modal_btn"
          onClick={() => setShowServiceTypeModal(false)}
        />
        <Button
          label={loading ? "Processing" : dataState === "Add" ? "Create" : "Update"}
          className="submit-button modal_btn"
          loading={loading}
          onClick={dataState === "Add" ? handleCreateServiceType : handleUpdateServiceType}
        />
      </div>
    );
  };

  return (
    <>
      <Preloader />
      <Toast ref={toast} />

      <div>
        <div className="page_header_area">
          <h4 className="page_heading">Service Types</h4>
          <Button
            label="Add service type"
            icon="bi bi-plus-circle"
            className="btn_primary"
            onClick={() => {
              setServiceTypeData(initialServiceTypeData);
              setShowServiceTypeModal(true);
              setDataState("Add");
            }}
          />
        </div>

        <div className="page_content">
          {serviceTypesData?.length > 0 ? (
            <div className="dash-table-area">
              <DataTable
                value={serviceTypesData}
                paginator
                size="small"
                rows={rows}
                totalRecords={totalRecords}
                rowsPerPageOptions={[5, 10, 25, 50]}
                loading={loading}
                className="dash_table"
                emptyMessage="No service types found."
                showGridlines
                stripedRows
              >
                <Column
                  field="type"
                  header="Service Type"
                  sortable
                  style={{ minWidth: "200px" }}
                />
                <Column
                  field="description"
                  header="Description"
                  body={descriptionBodyTemplate}
                  sortable
                  style={{ minWidth: "300px" }}
                />
                <Column
                  field="createdAt"
                  header="Created At"
                  body={(rowData) => new Date(rowData.createdAt).toLocaleDateString()}
                  sortable
                  style={{ minWidth: "150px" }}
                />
                <Column
                  body={actionBodyTemplate}
                  exportable={false}
                  header="Action"
                  style={{ minWidth: "120px" }}
                />
              </DataTable>
            </div>
          ) : (
            <div className="no_data_found_area">
              <img src="/assets/images/no_data_2.svg" alt="No data!" />
              <h6>No service types data!</h6>
            </div>
          )}
        </div>
      </div>

      {/* Service Type create/edit modal */}
      <Dialog
        header={serviceTypeModalHeader}
        footer={serviceTypeModalFooter}
        visible={showServiceTypeModal}
        onHide={() => {
          if (!showServiceTypeModal) return;
          setShowServiceTypeModal(false);
          setDataState("Add");
          setSelectedServiceTypeId(null);
        }}
        className="custom-modal modal_dialog modal_dialog_md"
      >
        <div className="modal-body p-2">
          <div className="data-view-area">
            <div className="row">
              <div className="col-12">
                <div className="custom-form-group mb-3 mb-sm-4">
                  <label
                    htmlFor="type"
                    className="custom-form-label form-required"
                  >
                    Service Type
                  </label>
                  <Dropdown
                    id="type"
                    name="type"
                    value={serviceTypeData.type}
                    onChange={(e) => setServiceTypeData({ ...serviceTypeData, type: e.value })}
                    options={serviceTypeOptions}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Select Service Type"
                    className="w-full w-100 custom-form-dropdown"
                  />
                  {showError && !serviceTypeData.type && (
                    <small className="text-danger form-error-msg">
                      This field is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-12">
                <div className="custom-form-group mb-3 mb-sm-4">
                  <label
                    htmlFor="description"
                    className="custom-form-label form-required"
                  >
                    Description
                  </label>
                  <InputTextarea
                    id="description"
                    name="description"
                    value={serviceTypeData.description}
                    onChange={handleChange}
                    placeholder="Enter detailed description of the service type..."
                    rows={5}
                    className="w-full w-100 custom-form-input"
                  />
                  {showError && !serviceTypeData.description.trim() && (
                    <small className="text-danger form-error-msg">
                      This field is required
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ServiceType;