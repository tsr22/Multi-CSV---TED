
var endDates0 = [];
var endDates1 = [];
var endDates2 = [];

var projectNames0 =[];
var projectNames1 =[];
var projectNames2 =[];

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var seconds = [];
var days = [];
var distance = []
var timer;

var switchCounter = 0;

var csvSheets = ['Dates.csv',
            'Dates2.csv',
            'Dates3.csv'];

uploadCsv(csvSheets[0]);
uploadCsv(csvSheets[1]);
uploadCsv(csvSheets[2]);

$.ajax({
   async: false   
});

function uploadCsv(files)
{  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ()
  {
    if(this.readyState == 4 && this.status == 200)
    {
      csvData = this.responseText;
      newline = csvData.split("\n");
      for(let i = 0; i<csvSheets.length;i++)
      {
        if(files == csvSheets[0])
        {
          sheet0 = newline;
        }
        else if(files == csvSheets[1])
        {
          sheet1 = newline;
        }
        else if(files == csvSheets[2])
        {
          sheet2 = newline;    
        }
      }
    }
  }
  xhttp.open("GET", files);
  xhttp.send()  
}

function getDate(sheet)
{
  endDates = [];
  endDatesTemp = [];
  commaSplit = [];
  for(let i = 0; i< sheet.length; i++)
      {
        commaSplit[i] = sheet[i].split(",");
      }
      
      results =[].concat(...commaSplit);
  for(let i = 0; i<results.length;i++)
  {
    if(i%2)
    {
        endDatesTemp[i] = new Date(results[i]);
    }    
  }
  for(let i = 1;i<endDatesTemp.length;i=i+2)
    {
      endDates.push(endDatesTemp[i]);
    }

  return endDates;
}

function getProjectName(sheet)
{
  projectNames = [];
  endDatesTemp = [];
  projectNamesTemp= [];
  commaSplit = [];
  for(let i = 0; i< sheet.length; i++)
      {
        commaSplit[i] = sheet[i].split(",")
      }
      results =[].concat(...commaSplit)
      for(let i = 0; i<results.length;i++)
      {
        if(i%2)
        {
        //endDatesTemp[i] = new Date(results[i]);
        }
        else
        {
          projectNamesTemp[i] = results[i];
        }
      }
      for(let i = 0;i<projectNamesTemp.length;i=i+2)
      {
          projectNames.push(projectNamesTemp[i]);
      } 
      return projectNames;
} 


function addItem(container, template, endDatesF, projectNamesF) {
  var now = new Date();
  
  for(let i = 0; i < endDatesF.length; i++)
  {
    distance[i] = endDatesF[i].getTime() - now.getTime();
  }
  for(let x =0; x< endDatesF.length;x++)
  {
    days[x] = Math.floor(distance[x] / _day);
    seconds[x] = Math.floor((distance[x] % _minute) / _second);
    let num = days[x];
    let sec = seconds[x];
    let project = projectNamesF[x];      
    container.append(Mustache.render(template, { project, num, sec }));
  }
}

function update()
{
  const tmpl = $('#item_template0').html()
  const container = $('#app0');
  for(let i=0; i < endDates0.length; i++) 
  { 
    container.html("");
    addItem(container, tmpl,endDates0,projectNames0);
  }
}

function update1()
{
  const tmpl = $('#item_template0').html()
  const container = $('#app1');
  for(let i=0; i < endDates1.length; i++) 
  { 
    container.html("");
    addItem(container, tmpl,endDates1,projectNames1);
  }
}
function update2()
{
  const tmpl2 = $('#item_template0').html()
  const container2 = $('#app2');
  for(let i=0; i < endDates2.length; i++) 
  { 
    container2.html("");
    addItem(container2, tmpl2,endDates2,projectNames2);
  }
}
$(document).ready(function(){

const result = waitForElement();
function waitForElement(){
	if ((typeof sheet0 === 'undefined') || (typeof sheet1 === 'undefined') || (typeof sheet2 === 'undefined')){
		//alert("Broken. Refreshing.");
		location.reload(true);
	}
}

endDates0 = getDate(sheet0);
projectNames0  = getProjectName(sheet0);

endDates1 = getDate(sheet1);
projectNames1  = getProjectName(sheet1);

endDates2 = getDate(sheet2);
projectNames2  = getProjectName(sheet2);

})
$(document).ready(function(){
  setInterval(
              function () {
                  if(switchCounter == 0)
                  {
					//console.log("SwitchCounter 0");
					$('.container3').delay(500).fadeOut(500);
					$('.container1').delay(1000).fadeIn(500);
					update();
					switchCounter++;
                  }
                  else if(switchCounter == 1)
                  {
					//console.log("SwitchCounter 1");
                    $('.container1').delay(500).fadeOut(500);
                    $('.container2').delay(1000).fadeIn(500);
                    update1();
                    switchCounter++;
                  }
                  else
                  {
					//console.log("SwitchCounter not 1 or 0");
                    $('.container2').delay(500).fadeOut(500);
                    $('.container3').delay(1000).fadeIn(500);
                    update2();
                    switchCounter = 0;
                  }
              },
              5000);
  });
