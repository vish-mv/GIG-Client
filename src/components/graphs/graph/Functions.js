export function addNewEntitiesToGraph(currentGraph, newEntities) {
  const {nodes, links} = currentGraph;
  newEntities.forEach((entity) => {
    const linksArray = entity.links?.map(linkObj => linkObj.title);
    nodes.push({
      id: entity.title,
      name: entity.title,
      value: entity.links?.length,
      type: "entity",
      links: linksArray

    });
    entity.categories?.forEach((category) => {
      if (category !== "arbitrary-entities") {
        links.push({
          source: category,
          target: entity.title
        });
      }
    });

  });
  return {nodes: nodes, links: links}
}

export function createCategoryNodesFromStats(stat) {
  //format category data to graph data structure
  return stat?.category_wise_count?.filter((i) => {
    return i?._id !== "arbitrary-entities"
  }).map((i) => (
    {
      id: i._id,
      name: i._id,
      value: i.category_count,
      type: "category"
    }
  ));
}

export function createLinkNodesFromEntityNode(currentGraph, node) {
  const {nodes, links} = currentGraph;
  node.links?.forEach((link) => {
    nodes.push({
      id: link,
      name: link,
      value: links.length,
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
    let categories= item._id.filter(category=> category!=="arbitrary-entities");
    if (categories.length > 1) {
      let result = categories.flatMap(
        (v, i) => categories.slice(i + 1).map(w => [v, w])
      );
      result.forEach((i) => {
        links.push({source: i[0], target: i[1]})
      });
    }
  }

  stat?.category_group_wise_count?.forEach(createLinkPairs);
  return links
}

export function createNodeLinksFromCategories(graphLinks) {
  let links = [];
  Object.keys(graphLinks).forEach((node) => {
    if (node !== "arbitrary-entities") {
      Object.keys(graphLinks[node]).forEach((child) => {
        if (child !== "arbitrary-entities") {
          links.push({source: node, target: child})
        }
      })
    }
  });
  return links
}

export function createDataGraphFromStats(stat, graphLinks) {
  const nodes = createCategoryNodesFromStats(stat);
  // const statLinks = createNodeLinksFromStats(stat);
  const links = createNodeLinksFromCategories(graphLinks);
  return {nodes: nodes, links: links};
}


