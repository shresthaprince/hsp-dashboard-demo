import {
    useQuery,
    gql
} from "@apollo/client";

const LISTECG = gql`
  query MyQuery {
    listEcgs {
      items {
        ecg
      }
    }
  }
`;

const EcgGraphContainer = () => {
    const { loading, error, data } = useQuery(LISTECG);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return <div>{data.listEcgs.map((d: number) => <span>{d}</span>)}</div>
}

export default EcgGraphContainer