const token = localStorage.getItem("accessToken");
const accessToken = token.slice(1, -1);

console.log("Token: " + accessToken);

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(document.getElementById("form"));

  /*--*/
  console.log("jsonFormData:.. ", jsonFormData);

  const endsAt = new Date(jsonFormData.endsAt);
  const isoFormattedDate = endsAt.toISOString();

  jsonFormData.endsAt = isoFormattedDate;

  console.log("Updated jsonFormData:.. ", jsonFormData);
  /*--*/

  const jsonFormData = {};
  for (const [key, value] of formData.entries()) {
    if (jsonFormData[key]) {
      if (!Array.isArray(jsonFormData[key])) {
        jsonFormData[key] = [jsonFormData[key]];
      }
      jsonFormData[key].push(value);
    } else {
      jsonFormData[key] = value;
    }
  }

  /* console.log("jsonFormData:.. ", jsonFormData);

  const endsAt = new Date(jsonFormData.endsAt);
  const isoFormattedDate = endsAt.toISOString();

  jsonFormData.endsAt = isoFormattedDate;

  console.log("Updated jsonFormData:.. ", jsonFormData);
 */

  fetch("https://api.noroff.dev/api/v1/auction/listings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonFormData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Form data successfully sent:", data);
    })
    .catch((error) => {
      console.error("There was a problem sending the form data:", error);
    });
});
