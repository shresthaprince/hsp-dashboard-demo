import { gql } from "@apollo/client";

export const REAL_TIME_ECGS = gql`
  subscription GetRealTimeEcgs {
    onCreateEcg {
      ecgValue
      sensorId
      sensorGroup
      timeElapsed
    }
  }
`;

export const LIST_ECGS = gql`
  query listEcgs {
    listEcgData(filter: { sensorId: { eq: 1 } }, limit: 75) {
      items {
        ecgValue
        sensorGroup
        sensorId
        timeElapsed
      }
    }
  }
`;
