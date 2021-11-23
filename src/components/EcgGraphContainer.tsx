import { gql, useQuery } from '@apollo/client';

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{`Error! ${error.message}`}</div>;

    return (
        <div className="h-100 bg-dark">{data.listEcgs.items.map((e: any) => <div>
            <span className="text-light">{`Sensor Id: ${e.sensorId}`}</span>
            <span className="text-light">{` Ecg: ${e.ecg}`}</span></div>)}
        </div>
    );
}

export default EcgGraphContainer;