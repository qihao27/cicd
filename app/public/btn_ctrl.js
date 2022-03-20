const url = "https://ci-implementation.herokuapp.com";
// const url = "http://localhost:3000";
const btn_filter = document.getElementById("filter");
const btn_all = document.getElementById("all");
const btn_query = document.getElementById("query");
const overview = document.getElementById("overview");

init();

btn_filter.addEventListener("click", () => {
  let uid = document.getElementById("inputbox").value;
  $.getJSON(`${url}/user/by-uid?uid=${uid}`, (data) => {
    $("#table").html("");
    constructTable(data, "#table")
  });
});

btn_all.addEventListener("click", () => {
  $.getJSON(`${url}/user/all`, (data) => {
    $("#table").html("");
    constructTable(data, "#table")
  });
});

btn_query.addEventListener("click", () => {
  let sql = document.getElementById("inputquery").value;
  $.getJSON(`${url}/query?sql=${sql}`, (data) => {
    $("#table").html("");
    constructTable(data, "#table")
  });
});

function init() {
  $.getJSON(`${url}/db/tables`, (data,callback) => {
    $("#overview").html("");
    constructTable(data, "#overview")
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
