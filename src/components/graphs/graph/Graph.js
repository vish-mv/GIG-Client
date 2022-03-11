import React, {useEffect, useState, useCallback} from "react"
import {ForceGraph3D, ForceGraph2D} from 'react-force-graph';
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
import GraphPanel from "../panel/GraphPanel";
import "./Graph.css"
import {GraphTheme} from "./Constants";

function Graph(props) {

  const [stat, setStat] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [resultsPerNode, setResultsPerNode] = useState(100);
  const [showNodeName, setShowNodeName] = useState(false);
  const [backgroundTheme, setBackgroundTheme] = useState(GraphTheme.light);
  const app_props = {
    showNodeName,
    setShowNodeName,
    resultsPerNode,
    setResultsPerNode,
    backgroundTheme,
    setBackgroundTheme
  };

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
    if (resultsPerNode > 0) {
      const categories = stat?.category_wise_count;
      for (let i = 0; i < categories?.length; i++) {
        const result = await getSearchResults(categories[i]._id + ":", true);
        if (result) {
          statGraph = addNewEntitiesToGraph(statGraph, result);
          setGraphData(statGraph);
        }
      }
    }
  }, [setGraphData, stat, getSearchResults, resultsPerNode]);

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
    <div id={"gig-info-graph-" + backgroundTheme.value} className="content">
      {graphData ?
        <ForceGraph3D
          graphData={graphData} nodeAutoColorBy="name"
          linkAutoColorBy="source"
          linkWidth={1}
          onNodeClick={handleNodeClick}
          backgroundColor={backgroundTheme.color}
          nodeCanvasObject={(node, ctx, globalScale) => {
            if (showNodeName) {
              const label = node.id;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = node.color;
              ctx.fillText(label, node.x, node.y);

              node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
            } else {
              return false
            }
          }}
          nodeThreeObject={node => {
            if (showNodeName) {
              const sprite = new SpriteText(node.id);
              sprite.color = node.color;
              sprite.textHeight = 8;
              return sprite;
            }
          }}
          onNodeDragEnd={node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          }}
        /> :
        <header className="App-header"><img src={GraphLoader} alt="Generating Information Graph..." width="100px"/>
        </header>
      }
      <GraphPanel {...app_props}/>
    </div>

  )

}

export default Graph
