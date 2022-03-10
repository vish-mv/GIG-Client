export function dummy() {
  //this is a dummy function to replace setState function when no state update is required.
};

export function addNewEntitiesToGraph(currentGraph, newEntities) {
  const {nodes, links} = currentGraph;
  newEntities.forEach((entity) => {
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
  return {nodes: nodes, links: links}
}

export function createCategoryNodesFromStats(stat) {
  //format category data to graph data structure
  return stat?.category_wise_count?.map((i) => ({
    id: i._id,
    name: i._id,
    value: i.category_count,
    type: "category"
  }));
}

export function createLinkNodesFromEntityNode(currentGraph, node) {
  const {nodes, links} = currentGraph;
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
  return {nodes: nodes, links: links};
}

export function createNodeLinksFromStats(stat) {
  let links = [];

  function createLinkPairs(item) {
    if (item._id.length > 1) {
      let result = item._id.flatMap(
        (v, i) => item._id.slice(i + 1).map(w => [v, w])
      );
      result.forEach((item) => {
        links.push({source: item[0], target: item[1]})
      });
    }
  }

  stat?.category_group_wise_count?.forEach(createLinkPairs);
  return links
}

export function createDataGraphFromStats(stat) {
  const nodes = createCategoryNodesFromStats(stat);
  const links = createNodeLinksFromStats(stat);
  return {nodes: nodes, links: links};
}


