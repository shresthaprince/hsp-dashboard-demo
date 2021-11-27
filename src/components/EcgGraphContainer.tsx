import { gql, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const REAL_TIME_ECGS = gql`
subscription GetRealTimeEcgs {
  onCreateEcg {
    sensorId
    ecg
    id
  }
}
`

const EcgGraphContainer = () => {
  const [ecgs, setEcgs] = useState<any>([]);
  const [itemCounter, setItemCounter] = useState<number>(0);

  const { loading, error, data } = useSubscription(REAL_TIME_ECGS);

  useEffect(() => {
    if (data && data.onCreateEcg) {
      setItemCounter(itemCounter + 1);
      let temp = [...ecgs];
      if (temp.length >= 10) {
        temp.shift()
      }
      temp.push({ ...data.onCreateEcg, count: itemCounter })
      setEcgs(temp)
    }
  }, [data])

  if (loading) return <div>Waiting for data to arrive</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <div className="h-100 bg-dark">
      <ResponsiveContainer width="90%" aspect={3}>
        <LineChart
          width={500}
          height={300}
          data={ecgs}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={true} horizontal={true} stroke="#243240" />
          <XAxis dataKey="count" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={true} />
          {/* legend will be usef when we will have multiple sensors */}
          {/* <Legend />  */}
          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
          <Line type="monotone" dataKey="ecg" stroke="#8884d8" strokeWidth="2" dot={{ fill: "2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default EcgGraphContainer;


