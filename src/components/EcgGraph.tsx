import { useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import { LIST_ECGS } from "../graphql/subscriptions";
import LoadingSpinner from "./common/LoadingSpinner";

const EcgGraph = () => {
  const { loading, data } = useQuery(LIST_ECGS, {
    fetchPolicy: "network-only",
    pollInterval: 1000,
  });
  const newData = useMemo(() => {
    if (data && data.listEcgData) {
      return data.listEcgData.items;
    }
    return [];
  }, [data]);
  useEffect(() => {
    console.log("changed", newData);
  }, [newData]);

  if (loading)
    return (
      <div
        style={{ height: 300 }}
        className="d-flex align-items-center justify-content-center"
      >
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="bg-black h-100" style={{ height: 300 }}>
      <ResponsiveContainer height={300} width="100%" aspect={2}>
        <LineChart
          height={2000}
          data={newData}
          margin={{
            top: 15,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={true} horizontal={true} stroke="#000" />
          <YAxis tick={{ fill: "#fff" }} stroke="#000" />
          <Tooltip
            contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            cursor={true}
          />
          <Line
            type="monotone"
            dataKey="ecgValue"
            stroke="#f20406"
            strokeWidth="1"
            isAnimationActive={false}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EcgGraph;
