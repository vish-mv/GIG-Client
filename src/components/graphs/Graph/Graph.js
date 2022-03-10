import React, {useEffect, useState, useCallback} from "react"
import {ForceGraph3D} from 'react-force-graph';
import SpriteText from 'three-spritetext';
import {getResults} from "../../../functions/api/GetQueries";
import {dummy} from "./Functions";

function Graph(props) {

  const [stat, setStat] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


  function getStats() {
    fetch(process.env.REACT_APP_SERVER_URL + 'api/status/', {
      method: 'GET'
    }).then(results => {
      if (results.status === 200) {
        return results.json();
      }
      return null
    }).then(data => {
      setStat(data.payload);
      //format category data to graph data structure
      let links = [];

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

      let gCategories = data.payload?.category_wise_count?.map((i) => ({
        id: i._id,
        name: i._id,
        value: i.category_count,
        type: "category"
      }));

      data.payload?.category_group_wise_count?.forEach(createLinks);
      setGraphData({nodes: gCategories, links: links});
    });
  }

  if (!stat) {
    console.log("get stats");
    getStats()
  }

  const getSearchResults = useCallback(async (searchParam, initialSearch) => {
    if (searchParam.length > 1) {
      let searchUrl = process.env.REACT_APP_SERVER_URL + 'api/search?query=';
      if (searchParam.includes(":")) {
        let searchArray = searchParam.split(":", 2);
        searchUrl += searchArray[1] + '&categories=' + searchArray[0];
      } else {
        searchUrl += searchParam;
      }
      let result = await getResults(searchUrl, initialSearch, [], 0, dummy, dummy, 1000);
      if (result) {
        const {nodes, links} = graphData;
        result.forEach((entity) => {
          const linksArray = entity.links.map(linkObj => linkObj.title);
          nodes.push({
            id: entity.title,
            name: entity.title,
            value: entity.title,
            type: "entity",
            links: linksArray

          });
          entity.categories.forEach((category) => {
            links.push({
              source: category,
              target: entity.title
            });
          });

        });
        setGraphData({nodes: nodes, links: links})
      }
      return result
    }
    return false
  },[graphData]);

  useEffect(() => {
    if (graphData && !isLoaded) {
      setIsLoaded(true);
      console.log("load entities");

      stat?.category_wise_count.forEach((category) => getSearchResults(category._id, true))
    }

  }, [stat, isLoaded, getSearchResults, graphData]);

  const handleClick = (node => {
    if (node.type === "category") {
      getSearchResults(node.id + ":")
    }
    else if (node.type === "entity") {
      const {nodes, links} = graphData;
      node.links?.forEach((link) => {
        nodes.push({
          id: link,
          name: link,
          value: link,
          type: "entity",

        });
        links.push({
          source: link,
          target: node.id
        });
      });
      setGraphData({nodes: nodes, links: links})
    }
  });

  return (
    <div>
      {graphData ?
        <ForceGraph3D
          graphData={graphData} nodeAutoColorBy="name"
          linkAutoColorBy="source"
          linkWidth={1}
          onNodeClick={handleClick}
          // nodeThreeObject={node => {
          //   const sprite = new SpriteText(node.id);
          //   sprite.color = node.color;
          //   sprite.textHeight = 8;
          //   return sprite;
          // }}
          onNodeDragEnd={node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          }}
        /> : null}
    </div>

  )

}

export default Graph
