console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.err) {
          console.log(data.err);
        } else {
          console.log(data.address);
          console.log(data.forecast);
        }
      });
    }
  );
});
