import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Graph = ({ data }) => {
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    let values = [];
    data?.forEach((element) => {
      const requiredValues = Object.keys(element).map(function (key) {
        if (key === "ServiceName" || key === "ConsumedQuantity") {
          return element[key];
        }
      });
      const graphData = requiredValues.filter(function (element) {
        return element !== undefined;
      });
      values.push(graphData);
    });
    let chartData = [["Date", "Cost"], ...values];
    setBarChartData(chartData);
    setLoading(false);
  }, [data]);

  const options = {
    chart: {
      title: "Resource Cost Rates",
      subtitle: "2020",
    },
  };

  return (
    <>
      {loading ? (
        <div class="center">
          <p>Loading....</p>
        </div>
      ) : (
        <Chart
          chartType="Bar"
          height="500px"
          data={barChartData}
          options={options}
        />
      )}
    </>
  );
};

export default Graph;
