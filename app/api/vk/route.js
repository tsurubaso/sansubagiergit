const ACCESS_TOKEN = "";
const OWNER_ID = "2"; // without the "-" sign
const MESSAGE = "📝 Nouveau post automatique sur mon mur perso !";
const API_VERSION = "5.199";

const url = "https://api.vk.com/method/wall.post";

const params = new URLSearchParams({
  owner_id: OWNER_ID,
  message: MESSAGE,
  access_token: ACCESS_TOKEN,
  v: API_VERSION,
});

fetch(url, {
  method: "POST",
  body: params,
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.error("Error:", err));
