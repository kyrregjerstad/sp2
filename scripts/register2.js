document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var avatar = document.getElementById("avatar").value;

  var payload = {
    name,
    email,
    password,
    avatar,
  };

  console.log(payload);

  fetch("https://api.noroff.dev/api/v1/auction/auth/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    referrerPolicy: "no-referrer",
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.statusText);
      }
    })
    .then(function (data) {
      localStorage.setItem("accessToken", data.accessToken);
      console.log(data);
    })
    .catch(function (error) {
      console.log("Request failed", error);
    });
});
