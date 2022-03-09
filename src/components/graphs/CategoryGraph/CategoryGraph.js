import React, {useEffect, useState} from "react"
import {ForceGraph3D} from 'react-force-graph';

function CategoryGraph(props) {

  const [stat, setStat] = useState(null);
  let gData = {
    "nodes": [],
    "links": []
  };
  let links = [];

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

  function createLinks(item) {
    if (item._id.length > 1) {
      let result = item._id.flatMap(
        (v, i) => item._id.slice(i + 1).map(w => [v, w])
      );
      result.forEach((item) => {
        links.push({source: item[0], target: item[1]})
      })
    }
  }

  useEffect(() => {
    if (!stat) {
      getStats();
    }
  }, [stat]);

  if (stat) {

    let gCategories = stat?.category_wise_count?.map((i) => ({id: i._id, name: i._id, value: i.category_count}));

    stat?.category_group_wise_count?.forEach(createLinks);
    gData = {
      "nodes": gCategories,
      "links": links
    };
  }

  return (
    <div>
      <ForceGraph3D
        graphData={gData}
      />
    </div>

  )

}

export default CategoryGraph
