import {ApiRoutes, getServerUrl} from "../../../server";

export async function getGraphStats() {
  const result = await fetch(getServerUrl(ApiRoutes.status), {method: 'GET'});
  if (result.status === 200) {
    return result.json();
  } else {
    return null
  }
}
