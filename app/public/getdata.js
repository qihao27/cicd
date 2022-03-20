const b1 = document.getElementById("b1");
const url = "https://ci-implementation.herokuapp.com";
// const url = "http://localhost:3000";
b1.addEventListener("click", () => {
  let uid = document.getElementById("inputbox").value;
  $.getJSON(`${url}/user/by-uid?uid=${uid}`, (data) => {
    let code = `First Name: ${data[0].first_name} <br>
                Last Name:  ${data[0].last_name} <br>
                Email:      ${data[0].email}`;
    $(".mypanel").html(code);
  });
});

const b2 = document.getElementById("b2");
b2.addEventListener("click", () => {
  $.getJSON(`${url}/user/all`, (data) => {
    let code = "<ul>";
    data.forEach((datapoint) => {
      code += `<li> First Name: ${datapoint.first_name}
                    | Last Name: ${datapoint.last_name}
                    | Email: ${datapoint.email} </li>`;
    });
    code += "</ul>";
    $(".mypanel").html(code);
  });
});