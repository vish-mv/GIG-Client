export async function getGraphStats() {
  const result = await fetch(process.env.REACT_APP_SERVER_URL + 'api/status/', {method: 'GET'});
  if (result.status === 200) {
    return await result.json();
  } else {
    return null
  }
}
