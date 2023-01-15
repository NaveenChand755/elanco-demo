import React, { useState } from "react";
import { Button, Modal, Select } from "antd";
import { CSVLink } from "react-csv";
import api from "../api";

const DownLoad = (props) => {
  const { open, setOpen } = props;
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const headers = [
    { label: "ServiceName", key: "ServiceName" },
    { label: "Location", key: "Location" },
    { label: "ConsumedQuantity", key: "ConsumedQuantity" },
    { label: "Cost", key: "Cost" },
    { label: "Date", key: "Date" },
    { label: "InstanceId", key: "InstanceId" },
    { label: "ResourceGroup", key: "ResourceGroup" },
  ];

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (value) => {
    setFilterBy(value);
    fetchOptionsData(value);
  };

  const handleSelectedvalue = (value) => {
    setSelectedValue(value);
    fetchData(value);
  };

  const fetchData = async (value) => {
    setLoading(true);
    try {
      const response =
        filterBy === "1"
          ? await api.getApplicationDetails(value)
          : await api.getResourceDetails(value);

      setData(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOptionsData = async (value) => {
    setLoading(true);
    try {
      const response =
        value === "1" ? await api.getApplications() : await api.getResources();
      const options = response?.data?.map((item) => {
        return {
          value: item,
          lable: item,
        };
      });
      setOptions(options);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        confirmLoading
        title="Export Details to Excel"
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            <CSVLink
              headers={headers}
              data={data}
              filename={
                filterBy === "1" ? "application-details" : "resource-details"
              }
              style={{ textDecoration: "none", color: "#fff" }}
            >
              {loading ? "Loading csv..." : "Export Data"}
            </CSVLink>
          </Button>,
          
        ]}
      >
        <p>Filter by</p>
        <p>
          <Select
            showSearch
            value={filterBy}
            style={{
              width: 200,
            }}
            onChange={handleChange}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Application Name",
              },
              {
                value: "2",
                label: "Resource Name",
              },
            ]}
          />
        </p>

        {options?.length > 0 ? (
          <>
            <p>{`Select ${
              filterBy === "1" ? "Application Name" : "Resource Name"
            }`}</p>
            <p>
              <Select
                showSearch
                onChange={handleSelectedvalue}
                style={{
                  width: 200,
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={options}
              />
            </p>
          </>
        ) : null}

        <p>Total Count of Data : {data.length}</p>
      </Modal>
    </>
  );
};
export default DownLoad;
