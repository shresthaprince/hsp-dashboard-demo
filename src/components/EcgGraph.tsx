import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LIST_ECGS } from "../graphql/subscriptions";

// Number of data points at an instance
const DATA_POINT_COUNT = 50;

type EcgData = {
  heartRate: number;
  ecgValue: number;
  heartRateVariability: number;
};

const EcgGraph = () => {
  const [ecgs, setEcgs] = useState<Array<EcgData>>(
    new Array(DATA_POINT_COUNT).fill({
      ecgValue: 0,
      timeElapsed: 0,
    })
  );

  const { loading, error, data } = useQuery(LIST_ECGS, {
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

  // useEffect(() => {
  //   if (data?.onCreateEcg) {
  //     console.log(data?.onCreateEcg);

  //     ecgs.pop();
  //     let temp = [...ecgs];
  //     temp.unshift(data?.onCreateEcg);
  //     setEcgs(temp);
  //   }
  // }, [data]);

  if (loading) return <div style={{ height: 800 }}>Loading</div>;

  return (
    <div className="bg-black h-100">
      <ResponsiveContainer width="100%" aspect={3}>
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

          {/* <XAxis dataKey="heartRate" tick={{ fill: "#fff" }} /> */}
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
          <Legend verticalAlign="bottom" height={50} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EcgGraph;
