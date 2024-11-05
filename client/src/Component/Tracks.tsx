import React from "react";
import { gql, useQuery } from "@apollo/client";

/** TRACKS query to retrieve all tracks */
const TRACKS = gql`
query TracksForHome {
  tracksForHome {
    author {
      name
      id
      photo
    }
    id
    length
    thumbnail
    title
    modulesCount
  }
}

`;

const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return <>{JSON.stringify(data)}</>;
};

export default Tracks;