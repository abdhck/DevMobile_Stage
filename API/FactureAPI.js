
export function testApi (name) {
  return fetch(
    "http://crm.netforce-group.com/apis/User/login.php?email=" + name + "&password=03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}