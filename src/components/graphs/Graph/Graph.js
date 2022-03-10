import React, {useEffect, useState, useCallback} from "react"
import {ForceGraph3D} from 'react-force-graph';
import SpriteText from 'three-spritetext';
import {getResults} from "../../../functions/api/GetQueries";
import {
  addNewEntitiesToGraph,
  createDataGraphFromStats,
  createLinkNodesFromEntityNode,
  dummy
} from "./Functions";
import {getGraphStats} from "../../../functions/api/GetStats";
import {generateSearchQuery} from "../../../functions/GenerateSearchQuery";
import GraphLoader from "../../../resources/graph_loader.gif"

function Graph(props) {

  const [stat, setStat] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [resultsPerNode, setResultsPerNode] = useState(1000);

  async function getStats() {
    const graphStatData = await getGraphStats();
    if (graphStatData) {
      setStat(graphStatData.payload);
    }
  }

  const getSearchResults = useCallback(async (searchParam, initialSearch) => {
    if (searchParam.length > 1) {
      const searchUrl = generateSearchQuery(searchParam);
      return await getResults(searchUrl, initialSearch, [], 0, dummy, dummy, resultsPerNode);
    }
    return false
  }, [resultsPerNode]);

  const loadInitialGraph = useCallback(async () => {
    let statGraph = createDataGraphFromStats(stat);
    setGraphData(statGraph);

    const categories = stat?.category_wise_count;
    for (let i = 0; i < categories?.length; i++) {
      const result = await getSearchResults(categories[i]._id + ":", true);
      if (result) {
        statGraph = addNewEntitiesToGraph(statGraph, result);
        setGraphData(statGraph);
      }
    }
  }, [setGraphData, stat, getSearchResults]);

  useEffect(() => {
    if (stat) {
      loadInitialGraph().then(() => console.log("initial graph loaded!"))
    } else {
      getStats().then(() => console.log("graph stats loaded."))
    }
  }, [stat, loadInitialGraph]);

  async function handleNodeClick(node) {
    switch (node.type) {
      case "category":
        const result = await getSearchResults(node.id + ":");
        setGraphData(addNewEntitiesToGraph(graphData, result));
        break;
      case "entity":
        setGraphData(createLinkNodesFromEntityNode(graphData, node));
        break;
      default:
    }
  }

  return (
    <div>
      {graphData ?
        <ForceGraph3D
          graphData={graphData} nodeAutoColorBy="name"
          linkAutoColorBy="source"
          linkWidth={1}
          onNodeClick={handleNodeClick}
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
        /> :
        <header className="App-header"><img src={GraphLoader} alt="Generating Information Graph..." width="100px"/>
        </header>
      }
    </div>

  )

}

export default Graph
