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

import api from "../../api";
import { useSelector } from "react-redux";

const VendorTerminal = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [totalRecords, setTotalRecords] = useState(0);
  const [showTerminalModal, setShowTerminalModal] = useState(false);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [vendorTerminalsData, setVendorTerminalsData] = useState([]);
  const [dataState, setDataState] = useState("Add");
  const [selectedTerminalId, setSelectedTerminalId] = useState(null);
  const [vendors, setVendors] = useState([]);

  const terminals = [
    { name: "Terminal 1" },
    { name: "Terminal 2" },
    { name: "Terminal 3" },
    { name: "Terminal 4" }
  ];

  const serviceTypes = [
    { type: "Meet and Greet" }, 
    { type: "Park and Ride" }
  ];

  const initialTerminalData = {
    vendor_id: "",
    terminal: "",
    service_type: ""
  };

  const [terminalData, setTerminalData] = useState(initialTerminalData);
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTerminalData({
      ...terminalData,
      [name]: value
    });
  };

  const handleVendorChange = (e) => {
    setTerminalData({
      ...terminalData,
      vendor_id: e.value
    });
  };

  const fetchVendorTerminals = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/admin/vendor-terminals", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setVendorTerminalsData(response.data.data);
      setTotalRecords(response.data.totalCount);
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch vendor terminals",
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorsForDropdown = async () => {
    try {
      const response = await api.get("/api/admin/vendors-dropdown", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setVendors(response.data.data);
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch vendors",
        life: 3000
      });
    }
  };

  useEffect(() => {
    fetchVendorTerminals();
    fetchVendorsForDropdown();
  }, []);

  const createVendorTerminal = async () => {
    setLoading(true);
    try {
      const response = await api.post(
        "/api/admin/create-vendor-terminal",
        terminalData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Vendor terminal created successfully",
        life: 3000
      });
      
      setTerminalData(initialTerminalData);
      setShowTerminalModal(false);
      fetchVendorTerminals();
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.response?.data?.error || "Failed to create vendor terminal",
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const updateVendorTerminal = async () => {
    setLoading(true);
    try {
      const response = await api.put(
        `/api/admin/update-vendor-terminal/${selectedTerminalId}`,
        terminalData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Vendor terminal updated successfully",
        life: 3000
      });
      
      setTerminalData(initialTerminalData);
      setShowTerminalModal(false);
      setDataState("Add");
      setSelectedTerminalId(null);
      fetchVendorTerminals();
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.response?.data?.error || "Failed to update vendor terminal",
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTerminal = (e) => {
    e.preventDefault();
    setShowError(false);

    if (!terminalData.vendor_id || !terminalData.terminal || !terminalData.service_type) {
      setShowError(true);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill all required fields!",
        life: 3000
      });
      return;
    }

    createVendorTerminal();
  };

  const handleUpdateTerminal = (e) => {
    e.preventDefault();
    setShowError(false);

    if (!terminalData.vendor_id || !terminalData.terminal || !terminalData.service_type) {
      setShowError(true);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill all required fields!",
        life: 3000
      });
      return;
    }

    updateVendorTerminal();
  };

  const handleDeleteTerminal = (id) => {
    confirmDialog({
      message: "Are you sure you want to delete this vendor terminal?",
      header: "Delete Confirmation",
      icon: "bi bi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "btn_primary_fill",
      rejectClassName: "btn_primary_outline",
      accept: () => deleteVendorTerminal(id),
    });
  };

  const deleteVendorTerminal = async (id) => {
    try {
      await api.delete(`/api/admin/delete-vendor-terminal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Vendor terminal deleted successfully",
        life: 3000
      });
      
      fetchVendorTerminals();
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.response?.data?.error || "Failed to delete vendor terminal",
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
            setTerminalData({
              vendor_id: rowData.vendor_id._id,
              terminal: rowData.terminal,
              service_type: rowData.service_type
            });
            setShowTerminalModal(true);
            setDataState("Edit");
            setSelectedTerminalId(rowData._id);
          }}
        />
        <Button
          icon="bi bi-trash3"
          className="data-delete-button"
          onClick={() => handleDeleteTerminal(rowData._id)}
        />
      </div>
    );
  };

  const vendorBodyTemplate = (rowData) => {
    return rowData.vendor_id?.companyName || "N/A";
  };

  const terminalModalHeader = () => {
    return (
      <div className="modal-header p-2">
        <h1 className="modal-title fs-5">
          {dataState === "Add" ? "Create" : "Edit"}&nbsp;vendor terminal
        </h1>
        <button
          type="button"
          className="btn-close"
          onClick={() => setShowTerminalModal(false)}
        ></button>
      </div>
    );
  };

  const terminalModalFooter = () => {
    return (
      <div className="custom_modal_footer p-2">
        <Button
          label="Cancel"
          severity="secondary"
          className="modal_btn"
          onClick={() => setShowTerminalModal(false)}
        />
        <Button
          label={loading ? "Processing" : dataState === "Add" ? "Create" : "Update"}
          className="submit-button modal_btn"
          loading={loading}
          onClick={dataState === "Add" ? handleCreateTerminal : handleUpdateTerminal}
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
          <h4 className="page_heading">Vendor Terminals</h4>
          <Button
            label="Add vendor terminal"
            icon="bi bi-plus-circle"
            className="btn_primary"
            onClick={() => {
              setTerminalData(initialTerminalData);
              setShowTerminalModal(true);
              setDataState("Add");
            }}
          />
        </div>

        <div className="page_content">
          {vendorTerminalsData?.length > 0 ? (
            <div className="dash-table-area">
              <DataTable
                value={vendorTerminalsData}
                paginator
                size="small"
                rows={rows}
                totalRecords={totalRecords}
                rowsPerPageOptions={[5, 10, 25, 50]}
                loading={loading}
                className="dash_table"
                emptyMessage="No vendor terminals found."
                showGridlines
                stripedRows
              >
                <Column
                  field="vendor_id.companyName"
                  header="Vendor"
                  body={vendorBodyTemplate}
                  sortable
                  style={{ minWidth: "200px" }}
                />
                <Column
                  field="terminal"
                  header="Terminal"
                  sortable
                  style={{ minWidth: "150px" }}
                />
                <Column
                  field="service_type"
                  header="Service Type"
                  sortable
                  style={{ minWidth: "180px" }}
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
              <h6>No vendor terminals data!</h6>
            </div>
          )}
        </div>
      </div>

      {/* Vendor Terminal create/edit modal */}
      <Dialog
        header={terminalModalHeader}
        footer={terminalModalFooter}
        visible={showTerminalModal}
        onHide={() => {
          if (!showTerminalModal) return;
          setShowTerminalModal(false);
          setDataState("Add");
          setSelectedTerminalId(null);
        }}
        className="custom-modal modal_dialog modal_dialog_md"
      >
        <div className="modal-body p-2">
          <div className="data-view-area">
            <div className="row">
              <div className="col-12">
                <div className="custom-form-group mb-3 mb-sm-4">
                  <label
                    htmlFor="vendor"
                    className="custom-form-label form-required"
                  >
                    Select Vendor
                  </label>
                  <Dropdown
                    id="vendor"
                    name="vendor_id"
                    value={terminalData.vendor_id}
                    onChange={handleVendorChange}
                    options={vendors}
                    optionLabel="companyName"
                    optionValue="_id"
                    placeholder="Select Vendor"
                    className="w-full w-100 custom-form-dropdown"
                    filter
                  />
                  {showError && !terminalData.vendor_id && (
                    <small className="text-danger form-error-msg">
                      This field is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="custom-form-group mb-3 mb-sm-4">
                  <label
                    htmlFor="terminal"
                    className="custom-form-label form-required"
                  >
                    Terminal
                  </label>
                  <Dropdown
                    id="terminal"
                    name="terminal"
                    value={terminalData.terminal}
                    onChange={(e) => setTerminalData({ ...terminalData, terminal: e.value })}
                    options={terminals}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Select Terminal"
                    className="w-full w-100 custom-form-dropdown"
                  />
                  {showError && !terminalData.terminal && (
                    <small className="text-danger form-error-msg">
                      This field is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="custom-form-group mb-3 mb-sm-4">
                  <label
                    htmlFor="serviceType"
                    className="custom-form-label form-required"
                  >
                    Service Type
                  </label>
                  <Dropdown
                    id="serviceType"
                    name="service_type"
                    value={terminalData.service_type}
                    onChange={(e) => setTerminalData({ ...terminalData, service_type: e.value })}
                    options={serviceTypes}
                    optionLabel="type"
                    optionValue="type"
                    placeholder="Select Service Type"
                    className="w-full w-100 custom-form-dropdown"
                  />
                  {showError && !terminalData.service_type && (
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

export default VendorTerminal;