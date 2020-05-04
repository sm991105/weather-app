// Client-side javascript

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#message-1");
const msg2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  msg1.textContent = "";
  msg2.textContent = "Loading...";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.err) {
        msg1.textContent = data.err;
        msg2.textContent = "";
      } else {
        msg1.textContent = data.address;
        msg2.textContent = data.forecast;
      }
    });
  });
});
