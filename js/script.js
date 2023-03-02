var sitename = document.getElementById("sitename");
var siteurl = document.getElementById("siteurl");
var btnsubmit = document.getElementById("btnsubmit");
var myindex;
var sites = [];
if (localStorage.sites != null) {
  sites = JSON.parse(localStorage.sites);
}

btnsubmit.addEventListener("click", function saveSites() {
  if (urlvalidation() && namevalidation()) {
    if (btnsubmit.innerHTML == "Submit") {
      var data = {
        sitename: sitename.value,
        siteurl: siteurl.value,
      };

      sites.push(data);
      localStorage.setItem("sites", JSON.stringify(sites));
      clearData();
      displayData();
    } else {
      sites[myindex].sitename = sitename.value;
      sites[myindex].siteurl = siteurl.value;
      localStorage.setItem("sites", JSON.stringify(sites));
      displayData();
      clearData();

      btnsubmit.innerHTML = "Submit";
    }
  } else {
    if (urlvalidation() != true) {
      document.getElementById("alert").style.display = "block";
      document.getElementById("alertname").style.display = "block";
    } else {
      document.getElementById("alertname").style.display = "block";
    }
  }
});

// clear data from inputs
function clearData() {
  sitename.value = "";
  siteurl.value = "";
}

// Display Data in table

function displayData() {
  var col = "";
  for (var i = 0; i < sites.length; i++) {
    col += `<div class="col-6 mb-4">
                <div class="square py-5 text-center rounded">
                  <div class="row">
                    <div class="col-6">
                      <div class="sitename">
                        <h4>${sites[i].sitename}</h4>
                        <p class="text-primary">${sites[i].siteurl}</p>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="button">
                        <button onclick='visiteSite(${i})' id="visit" class="btn btn-success ms-2">Visit</button>
                        <button  onclick = "updateData(${i})" id="update" class="btn btn-warning ms-2">Update</button>
                        <button onclick='deleteData(${i})' id="deletebtn" class="btn btn-danger ms-2">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
  }
  im = i;
  document.getElementById("display").innerHTML = col;
}
displayData();

// Delte Data From table

function deleteData(index) {
  sites.splice(index, 1);
  localStorage.sites = JSON.stringify(sites);
  displayData();
}

//  Update Data

function updateData(index) {
  sitename.value = sites[index].sitename;
  siteurl.value = sites[index].siteurl;
  btnsubmit.innerHTML = "Update";
  myindex = index;
}

// search Data

function searchData(search) {
  var searchTable = "";
  for (var i = 0; i < sites.length; i++) {
    if (
      sites[i].sitename.toLowerCase().includes(search.toLowerCase()) ||
      sites[i].siteurl.toLowerCase().includes(search.toLowerCase())
    ) {
      searchTable += `<div class="col-6 mb-4">
                <div class="square py-5 text-center rounded">
                  <div class="row">
                    <div class="col-6">
                      <div class="sitename">
                        <h4>${sites[i].sitename}</h4>
                        <p class="text-primary">${sites[i].siteurl}</p>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="button">
                        <button onclick='visiteSite(${i})' id="visit" class="btn btn-success ms-2">Visit</button>
                        <button  onclick = "updateData(${i})" id="update" class="btn btn-warning ms-2">Update</button>
                        <button onclick='deleteData(${i})' id="deletebtn" class="btn btn-danger ms-2">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
    }
  }
  document.getElementById("display").innerHTML = searchTable;
}

//  visit site
var visit = document.getElementById("visit");
function visiteSite(index) {
  window.open(sites[index].siteurl, "_blank");
}

// validation
function namevalidation() {
  var regex = /^[a-zA-Z0-9]{3,20}$/;
  return regex.test(sitename.value);
}

function urlvalidation() {
  var regex = /(https?:\/\/)?(www.)?\w+.\W+/gi;

  return regex.test(siteurl.value);
}
