
var sidebarMenu = document.getElementById("sidebarMenu");

var settingsForm = document.forms.settingsList;
var parag = document.getElementsByTagName("p");


function displayMenu(){
  if (sidebarMenu.className === "menu ") {
    sidebarMenu.className += "responsive";
    sidebarMenu.parentElement.className += " responsive";
    document.querySelector("body #settings-icon").style.display = "block";
    }
    else {
      sidebarMenu.className = "menu ";
      sidebarMenu.parentElement.className = "sidebar";
      document.querySelector("body #settings-icon").style.display = "";
    }
}

function displaySettings() {
  var settingsList = document.getElementById("settingsList");
  if (settingsList.style.display !== "block") {
    settingsList.style.display = "block";
  }
  else {
    settingsList.style.display = "";
  }
}

function changeFontSize(){
  var rangeValue = settingsForm.elements.fontSelector.value;
  for (var i = 0;parag.length > i; i++) {
    parag[i].style.fontSize = rangeValue + "px";
  }
}

function changeBackgroundColor() {
  var colorValue = settingsForm.elements.backgroundColorSelector.value;
  if (colorValue === "") { document.body.style.backgroundColor = "#ffffff";
    }
      else if (colorValue.charAt(0) !== "#") {
          document.body.style.backgroundColor = '#'+ colorValue;
      }
      else {
        document.body.style.backgroundColor = colorValue;
      }
}

function changeFontFamily() {
  var fontSelect = settingsForm.elements.familySelector;
  for (var i = 0;parag.length > i; i++) {
    parag[i].style.fontFamily = fontSelect.value + ', \'Times\',' + 'serif';
  }
}

function removeParag() {
  //parag.parentElement.removeChild(parag[parag.length - 1]);
  var content = document.getElementsByClassName('content')[0];

  if (parag.length > 0){
    content.removeChild(content.getElementsByTagName("p")[parag.length - 1]);}
    else {
      console.log('All \'p\' tags were removed!');}
}
