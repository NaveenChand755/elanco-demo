import React, { useState } from "react";
import { Table, Tag, Tooltip, Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Main = (props) => {
  const { data, loading } = props;
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const showDrawer = (value) => {
    setSelectedRow(value);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const getFilterOptions = (dataSource, key) => {
    const options = dataSource?.map((item) => {
      return {
        text: item[key],
        value: item[key],
      };
    });
    const unique = [
      ...new Map(options?.map((item) => [item["value"], item])).values(),
    ];

    return unique;
  };

  const columns = [
    {
      title: "Service Name",
      width: 100,
      dataIndex: "ServiceName",
      key: "ServiceName",
      filterSearch: true,
      filters: getFilterOptions(data, "ServiceName"),
      onFilter: (value, record) => record.ServiceName.includes(value),
      render: (record) => (
        <Tooltip title={record}>{truncate(record, 12)}</Tooltip>
      ),
    },
    {
      title: "Location",
      width: 100,
      dataIndex: "Location",
      key: "Location",
      filters: getFilterOptions(data, "Location"),
      onFilter: (value, record) => record.Location.includes(value),
    },
    {
      title: "Consumed Quantity",
      dataIndex: "ConsumedQuantity",
      key: "ConsumedQuantity",
      width: 100,
      filters: getFilterOptions(data, "ConsumedQuantity"),
      onFilter: (value, record) => record.ConsumedQuantity.includes(value),
    },
    {
      title: "Cost",
      dataIndex: "Cost",
      key: "Cost",
      width: 110,
      filters: getFilterOptions(data, "Cost"),
      onFilter: (value, record) => record.Cost.includes(value),
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      width: 110,
      filters: getFilterOptions(data, "Date"),
      onFilter: (value, record) => record.Date.includes(value),
    },
    {
      title: "Instance Id",
      dataIndex: "InstanceId",
      key: "InstanceId",
      filters: getFilterOptions(data, "InstanceId"),
      onFilter: (value, record) => record.InstanceId.includes(value),
      render: (record) => (
        <Tooltip title={record}>{truncate(record, 12)}</Tooltip>
      ),
      width: 120,
    },
    {
      title: "Resource Group",
      dataIndex: "ResourceGroup",
      key: "ResourceGroup",
      filters: getFilterOptions(data, "ResourceGroup"),
      onFilter: (value, record) => record.ResourceGroup.includes(value),
      render: (record) => (
        <Tooltip title={record}>{truncate(record, 12)}</Tooltip>
      ),
      width: 120,
    },
    {
      title: "Tags",
      key: "Tags",
      dataIndex: "Tags",
      render: (tags) => (
        <>
          {Object.values(tags).map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Resource Location",
      dataIndex: "ResourceLocation",
      key: "ResourceLocation",
      width: 90,
      filters: getFilterOptions(data, "ResourceLocation"),
      onFilter: (value, record) => record.ResourceLocation.includes(value),
    },
    {
      title: "Unit Of Measure",
      dataIndex: "UnitOfMeasure",
      key: "UnitOfMeasure",
      filters: getFilterOptions(data, "UnitOfMeasure"),
      onFilter: (value, record) => record.UnitOfMeasure.includes(value),
      width: 90,
    },
    {
      title: "Meter Category",
      dataIndex: "MeterCategory",
      key: "MeterCategory",
      filters: getFilterOptions(data, "MeterCategory"),
      onFilter: (value, record) => record.MeterCategory.includes(value),
      width: 150,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 60,
      render: (record) => (
        <FontAwesomeIcon icon={faEye} onClick={() => showDrawer(record)} />
      ),
    },
  ];

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + ".." : str;
  };

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
        }}
      />
      <Drawer title="Details" placement="right" onClose={onClose} open={open}>
        <p>
          <strong>ConsumedQuantity :</strong> {selectedRow?.ConsumedQuantity}
        </p>
        <p>
          <strong>Cost :</strong> {selectedRow?.Cost}
        </p>
        <p>
          <strong>Date :</strong> {selectedRow?.Date}
        </p>
        <p>
          <strong>Instance Id :</strong> {selectedRow?.InstanceId}
        </p>
        <p>
          <strong>Location :</strong>
          {selectedRow?.Location}
        </p>
        <p>
          <strong>Resource Group : </strong>
          {selectedRow?.ResourceGroup}
        </p>
        <p>
          <strong>Resource Location :</strong> {selectedRow?.ResourceLocation}
        </p>
        <p>
          <strong>Service Name :</strong> {selectedRow?.ServiceName}
        </p>
      </Drawer>
    </>
  );
};

export default Main;
