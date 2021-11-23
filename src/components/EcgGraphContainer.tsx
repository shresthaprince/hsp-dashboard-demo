import { gql, useQuery } from '@apollo/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GET_ECGS = gql`
query getEcg {
    listEcgs {
      items {
          sensorId
        ecg
      }
    }
  }
`;

const EcgGraphContainer = () => {
    const { loading, error, data } = useQuery(GET_ECGS);

    if (loading) return <div>Loadings...</div>;
    if (error) return <div>{`Error! ${error.message}`}</div>;

    return (
        <div className="h-100 bg-dark">
              <ResponsiveContainer width="90%" aspect={3}>
    <LineChart
      width={500}
      height={300}
      data={data.listEcgs.items}
      margin={{
        top: 15,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid vertical={false}  stroke="#243240"/>
      <XAxis dataKey="sensorId" tick={{fill:"#fff"}}/>
      <YAxis tick={{fill:"#fff"}} />
      <Tooltip contentStyle={{backgroundColor:"#8884d8",color:"#fff"}} itemStyle={{color:"#fff"}} cursor={false} />
      {/* legend will be usef when we will have multiple sensors */}
      {/* <Legend />  */}
      {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
      <Line type="monotone" dataKey="ecg" stroke="#8884d8" strokeWidth="2" dot={{fill:"2e4355" ,stroke:"#8884d8" ,strokeWidth:2 ,r:5}} activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
  
        </div>
    );
}

export default EcgGraphContainer;


