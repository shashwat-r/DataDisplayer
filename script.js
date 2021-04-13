function getPointIdFromPointName(actName, pointName) {
  var pointId = actName + " " + pointName;
  pointId = pointId.replace(/[^\w\s]/gi, '');
  pointId = pointId.replace(/[\s]+/gi, '_');
  pointId = pointId.toLowerCase();
  return pointId;
}

function getSubpointIdFromPointId(pointId) {
  var subPointId = pointId + "_subpoint";
  return subPointId;
}

function openSubpoint(event) {
  var pointId = event.target.id;
  var subPointId = getSubpointIdFromPointId(pointId);

  var subPoint = document.getElementsByClassName("subPoint");
  for (var i=0; i<subPoint.length; i++)
  {
    subPoint[i].style.display = "none";
  }
  document.getElementById(subPointId).style.display = "block";
}

function loadData() {
  var acts = document.createElement("div");
  var subPointDivs = [];
  acts.className = "acts";

  for (var actName of Object.keys(data)) {
    var points = data[actName];

    var heading = document.createElement("h3");
    heading.innerHTML = actName;
    acts.appendChild(heading);

    for (var pointName of Object.keys(points)) {
      var subPoints = points[pointName];
      var pointId = getPointIdFromPointName(actName, pointName);

      var button = document.createElement("button");
      button.innerHTML = pointName;
      button.className = "point";
      button.id = pointId;
      button.onmouseover = openSubpoint;
      acts.appendChild(button);

      var subPointDiv = document.createElement("div");
      subPointDiv.id = getSubpointIdFromPointId(pointId);
      subPointDiv.className = "subPoint";
      subPointDiv.style.display = "none";

      var subPointList = document.createElement("ul");
      for (var subPoint of Object.values(subPoints)) {
        var subPointListItem = document.createElement("li");
        subPointListItem.innerHTML = subPoint;
        subPointList.appendChild(subPointListItem);
      }
      subPointDiv.appendChild(subPointList);
      subPointDivs.push(subPointDiv);
    }
  }

  document.body.appendChild(acts);
  for (var subPointDiv of Object.values(subPointDivs)) {
    document.body.appendChild(subPointDiv);
  }
}

loadData();