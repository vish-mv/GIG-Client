import React, {useEffect, useState} from "react"
import {ForceGraph3D} from 'react-force-graph';

function CategoryGraph(props) {

  const [stat, setStat] = useState(null);

  function getStats() {
    fetch(process.env.REACT_APP_SERVER_URL + 'api/status/', {
      method: 'GET'
    }).then(results => {
      if (results.status === 200) {
        return results.json();
      }
      return null
    }).then(data => {
      setStat(data.payload)
    });
  }

  useEffect(() => {
    if (!stat) {
      getStats();
    }
  }, [stat]);

  console.log(stat);

  const gData = {
    "nodes": [
      {
        "id": "id1",
        "name": "name1",
        "val": 1
      },
      {
        "id": "id2",
        "name": "name2",
        "val": 10
      },
    ],
    "links": [
      {
        "source": "id1",
        "target": "id2"
      },
    ]
  };

  return (
    <div>
      <ForceGraph3D
        graphData={gData}
      />
    </div>

  )

}

export default CategoryGraph
