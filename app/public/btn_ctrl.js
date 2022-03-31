const url = "https://ci-implementation.herokuapp.com";
// const url = "http://localhost:3000";
const btn_filter = document.getElementById("filter");
const btn_all = document.getElementById("all");
const btn_query = document.getElementById("query");
const btn_eth = document.getElementById("eth");
const btn_qh = document.getElementById("qh");
const qh_address = "0x96f9842De6E591C17d6e544Ff3419Bee5A4f26a3";
const abi = [{
  constant: true,
  inputs: [{ name: "_owner", type: "address" }],
  name: "balanceOf",
  outputs: [{ name: "balance", type: "uint256" }],
  type: "function",
}];

init();

btn_eth.addEventListener("click", () => {
  if (window.ethereum) {
    console.log("MetaMask is installed!");
    web3 = new Web3(window.ethereum);
    ethereum.request({ method: "eth_requestAccounts" });
    var account = web3.currentProvider.selectedAddress;
    console.log(account);
    web3.eth.getBalance(account)
      .then((wei) => {
        var eth = web3.utils.fromWei(wei, 'ether');
        $("#token-amount").html(parseFloat(eth).toFixed(4) + " ETH");
      });
  }
});

btn_qh.addEventListener("click", () => {
  if (window.ethereum) {
    console.log("MetaMask is installed!");
    var web3 = new Web3(window.ethereum);
    ethereum.request({ method: "eth_requestAccounts" });
    var account = web3.currentProvider.selectedAddress;
    console.log(account);
    var tokenContract = new web3.eth.Contract(abi, qh_address);
    tokenContract.methods.balanceOf(account).call()
      .then((wei) => {
        var qh = web3.utils.fromWei(wei);
        $("#qh-amount").html(parseFloat(qh).toFixed(4) + " WQH");
      });
  }
});

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
  if (sql.toLowerCase().startsWith("select") || sql.toLowerCase().startsWith("show") ||
      sql.toLowerCase().startsWith("desc")) {
    $.getJSON(`${url}/query?sql=${sql}`, (data) => {
      $("#table").html("");
      constructTable(data, "#table")
      modTable("table");
    });
  } else {
    alert("Only SELECT/SHOW/DESC statements are allowed!");
  }
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
