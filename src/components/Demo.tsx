import { gql, useQuery } from '@apollo/client';

const GET_DOGS = gql`
query getEcg {
    listEcgs {
      items {
          sensorId
        ecg
      }
    }
  }
`;

const Demo = () => {
    const { loading, error, data } = useQuery(GET_DOGS);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{`Error! ${error.message}`}</div>;
    console.log(data);

    return (
        <div className="h-100 bg-dark">{data.listEcgs.items.map((e: any) => <div>
            <span className="text-light">{`Sensor Id: ${e.sensorId}`}</span>
            <span className="text-light">{` Ecg: ${e.ecg}`}</span></div>)}
        </div>
    );
}

export default Demo;