
var endDatesTemp = [];
var endDates = [];
var projectNamesTemp = [];
var projectNames =[];
var projectTimer =[];
var distance = []
var timer;

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var seconds = [];
var minute = [];
var hours = [];
var days = [];
var test = [];
var xhttp = new XMLHttpRequest();
var csvResults = [];

xhttp.onreadystatechange = function ()
{
  if(this.readyState == 4 && this.status == 200)
  {
    csvData = this.responseText;
    newline = csvData.split("\n");
    for(let i = 0; i < newline.length;i++)
    {
      test[i] = newline[i].split(",");
    }
    csvResults =[].concat(...test)

    for(let i = 0; i<csvResults.length;i++)
    {
      if(i%2)
      {
        endDatesTemp[i] = new Date(csvResults[i]);
      }
      else
      {
        projectNamesTemp[i] = csvResults[i];
      }
      
    }
    
    for(let i = 1;i<endDatesTemp.length;i=i+2)
    {
      endDates.push(endDatesTemp[i]);
    }
    for(let i = 0;i<projectNamesTemp.length;i=i+2)
    {
      projectNames.push(projectNamesTemp[i]);
    }

    console.log(projectNames);
  }
}

xhttp.open("get", "dates.csv");
xhttp.send();

function addItem(container, template) {
     
    var now = new Date();
    
    for(let i = 0; i < endDates.length; i++)
    {
      distance[i] = endDates[i].getTime() - now.getTime();
    }

    for(let x =0; x< endDates.length;x++)
    {
      days[x] = Math.floor(distance[x] / _day);
      seconds[x] = Math.floor((distance[x] % _minute) / _second);
      let num = days[x];
      let sec=seconds[x];

      let project = projectNames[x];      
      container.append(Mustache.render(template, { project, num, sec }));
    }
  
  }

function update()
{
  const tmpl = $('#item_template').html()
  const container = $('#app');

  for(let i=0; i < endDates.length; i++) 
  { 
    container.html("");
    addItem(container, tmpl); 
  }
}

$(() => {
  const tmpl = $('#item_template').html()
  const container = $('#app');

  for(let i=0; i < endDates.length; i++) 
  { 
    addItem(container, tmpl); 
  }
});

timer = setInterval(update,1000);
