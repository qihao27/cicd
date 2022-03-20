const url = "https://ci-implementation.herokuapp.com";
// const url = "http://localhost:3000";
const btn_filter = document.getElementById("filter");
const btn_all = document.getElementById("all");
const btn_query = document.getElementById("query");

init();

btn_filter.addEventListener("click", () => {
  let uid = document.getElementById("inputbox").value;
  $.getJSON(`${url}/user/by-uid?uid=${uid}`, (data) => {
    $("#table").html("");
    constructTable(data, "#table")
    modTable("table");
  });
});

btn_all.addEventListener("click", () => {
  $.getJSON(`${url}/user/all`, (data) => {
    $("#table").html("");
    constructTable(data, "#table")
    modTable("table");
  });
});

btn_query.addEventListener("click", () => {
  let sql = document.getElementById("inputquery").value;
  $.getJSON(`${url}/query?sql=${sql}`, (data) => {
    $("#table").html("");
    constructTable(data, "#table")
    modTable("table");
  });
});

function init() {
  $.getJSON(`${url}/db/tables`, (data,callback) => {
    $("#overview").html("");
    constructTable(data, "#overview")
    modTable("overview");
    let headers = document.getElementsByTagName('th'); 
    headers[0].innerHTML = 'Tables in DB';
  });
}

function constructTable(list, selector) {
  var cols = Headers(list, selector); 
  for (var i = 0; i < list.length; i++) {
      var row = $('<tr/>');  
      for (var colIndex = 0; colIndex < cols.length; colIndex++) {
          var val = list[i][cols[colIndex]];
          if (val == null) val = ""; 
          row.append($('<td/>').html(val));
      }
      $(selector).append(row);
  }
}

function Headers(list, selector) {
  var columns = [];
  var header = $('<tr/>');
  for (var i = 0; i < list.length; i++) {
      var row = list[i];
      for (var k in row) {
          if ($.inArray(k, columns) == -1) {
             columns.push(k);
             header.append($('<th/>').html(k));
          }
      }
  }
  $(selector).append(header);
  return columns;
}

function modTable(id) {
  const table = document.getElementById(id);
  let body = table.createTBody();
  console.log(table.rows.length-1);
  for (var i=0; i<table.rows.length-1; i++) {
    body.appendChild(table.rows[1]);
  }
  let header = table.createTHead();
  let thead = table.rows[0];
  header.appendChild(thead);
}
