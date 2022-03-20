import {getAuthHeaders} from "../../auth/Authentication";
import {AppRoutes} from "../../../routes";
import {ApiRoutes, getServerUrl} from "../../../server";

export function saveEntity(entity, modifiedEntityObj, navigate) {
  let updateUrl = getServerUrl(ApiRoutes.update);
  let modifiedEntity = modifiedEntityObj['jsObject'];
  const requestOptions = {
    headers: getAuthHeaders(),
    method: 'POST',
    body: JSON.stringify({title: entity.title, entity: modifiedEntity})
  };
  fetch(updateUrl, requestOptions).then(results => {
    return results.json();
  }, error => {
    alert("error connecting to server");
  }).then(data => {
    if (data) {
      if (data.status === 200) {
        alert("updated successfully!");
        if (entity.title !== modifiedEntity.title) {
          navigate(AppRoutes.edit + modifiedEntity.title)
        }
      }
      else {
        alert("Server error: error saving entity!");
      }
    }
  });
}
