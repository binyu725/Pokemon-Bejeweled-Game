var clickHistory = [];
var progress;
var stage = 0;

function setup() { //initialize everything
  fillFunctionButtons();
  fillStatusText();
  fillProgressBar();
  fillMatrix();
  setStatusText("Loaded succesfully!", "text-bold" );
}

function fillFunctionButtons() {
  var headDiv = document.getElementById("head");
  var funcBtnRow = createRow();
  //createButton(buttonText, styleClass, functionName);
  funcBtnRow.appendChild(createButton("Start/Restart game", "btn btn-primary btn-sm m-3", "f1()"));
  funcBtnRow.appendChild(createButton("Refill with all random Pokemons (-10% points)", "btn btn-warning btn-sm m-3", "f2()"));
  funcBtnRow.appendChild(createButton("Next stage", "btn btn-dark btn-sm m-3", "f3()"));
  headDiv.appendChild(funcBtnRow);
}

function fillStatusText() {
  var headDiv = document.getElementById("head");
  var infoTextRow = createRow("ml-3");
  infoTextRow.id = "infoText"; //set id of this element so we can change it later
  headDiv.appendChild(infoTextRow);
}

function setStatusText(text, style) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild(document.createTextNode(text));
  textDiv.innerHTML = "";
  textDiv.appendChild(newText);
}

function fillProgressBar() {
  var headDiv = document.getElementById("head");
  var progessRow = createRow("progress");
  progress = 0;
  //a green colored bar
  var bar = createProgressBar("bar", "bg-success", progress);
  progessRow.appendChild(bar);
  headDiv.appendChild(progessRow);
}

function fillMatrix() {
  var matrix = document.getElementById("grid");
  for (i = 0; i < 8; i++) {
    var newRow = createRow("justify-content-md-center");
    for (j = 0; j < 8; j++) {
      newRow.appendChild(createDefaultButton(i, j));
    }
    matrix.appendChild(newRow);
  }
}

function fillAllRandom() { //sample function 1
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, getRandomColor());
      setButtonText(i, j, stage + 1);
    }
  }
  getClear("no");
}

function f1() {
  setStatusText("Game Start!");
  progress = 0;
  clickHistory = [];
  stage = 0;
  fillAllRandom();
  setProgressBar("bar", "bg-success", progress);
}

function f2() {
  if (getButtonText(0, 0) < 1) {
    setStatusText("Start game first!");
  } else if (stage != 2) {
    setStatusText("Refill with random Pokemons");
    fillAllRandom();
    progress -= 10;
    setProgressBar("bar", "bg-success", progress);
  }
}

function f3() {
  if (progress < 100) {
    setStatusText("Reach 100% points!")
  } else if (stage < 2) {
    stage++;
    progress = 0;
    setProgressBar("bar", "bg-success", progress);
    clickHistory = [];
    if (stage != 2) {
      fillAllRandom();
      if (stage == 1) {
        setStatusText("WELCOME TO HELL! TRY TO REACH 100% POINTS!!!");
      }
    } else {
      fillGiantPikachu();
      progress = 50;
      setProgressBar("bar", "bg-success", progress);
      setStatusText("Because you caught too many Pikachus, the Giant Pikachu is angry! Click to catch the Giant Pikachu!");
    }
  } else {
    setStatusText("This is final stage! If you want more stage, email me!");
  }
}

// helper functions below

function createRow(className) {
  var rowDiv = document.createElement("div");
  if (className == null) {
    rowDiv.className = "row";
  } else {
    rowDiv.className = "row " + className;
  }
  return rowDiv;
}

function createButton(buttonText, styleClass, functionName) {
  var button = document.createElement("button");
  button.className = styleClass;
  button.appendChild(document.createTextNode(buttonText));
  button.setAttribute("onclick", functionName);
  return button;
}

function createProgressBar(bar_id, color, value) {
  var bar = document.createElement("div");
  bar.id = bar_id;
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  return bar;
}

function setProgressBar(bar_id, color, value) {
  var bar = document.getElementById(bar_id);
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  bar.innerHTML = value + "%";
}

function createDefaultButton() {
  var button = document.createElement("div");
  button.className = "thumbnail";
  button.setAttribute("onclick", "buttonClicked("+i+","+j+")");

  //the image part
  var img = document.createElement("img");
  img.id = "img_" + i + "_" + j;
  img.setAttribute("src", "images/white.jpg");
  img.setAttribute("alt", "white");
  img.setAttribute("class", "rounded");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");

  //the text part
  var text = document.createElement("label");
  text.setAttribute("class", "caption unselectable");
  text.id = "text_" + i + "_" + j;

  button.appendChild(img);
  button.appendChild(text);
  return button;
}

function setButtonColor(i, j, color) {
  if (stage != 2) {
    var button = document.getElementById("img_" + i + "_" + j);
    button.setAttribute("src", "images/" + color + ".jpg");
    button.setAttribute("alt", color);
  } else {
    var button = document.getElementById("img_" + i + "_" + j);
    if (progress < 100) {
      button.setAttribute("src", "images/Giant Pikachu/" + color + ".jpg");
    } else {
      button.setAttribute("src", "images/Pokeball/" + color + ".jpg");
    }
    button.setAttribute("alt", color);
  }
}

function setButtonText(i, j, text) {
  var button = document.getElementById("text_" + i + "_" + j);
  button.innerHTML = text;
  button.style.display = 'none';
}

function getButtonColor(i, j) {
  var img = document.getElementById("img_" + i + "_" + j);
  return img.getAttribute("alt");
}

function getButtonText(i, j) {
  var text = document.getElementById("text_" + i + "_" + j);
  return text.innerHTML;
}

function getRandomColor() {
  //you might want to change this to get more colors
  var random = getRandomNumber(stage * 8, (stage + 1) * 8 - 1);
  do {
  if (random < 1) {
    return "Bulbasaur";
  } else if (random < 2) {
    return "Charmander";
  } else if (random < 3) {
    return "Cyndaquil";
  } else if (random < 4) {
    return "Magikarp*";
  } else if (random < 5) {
    return "Mudkip";
  } else if (random < 6) {
    return "Squirtle";
  } else if (random < 7) {
    return "Totodile";
  } else if (random < 8) {
    return "Chikorita";
  } else if (random < 16) {
    return "Pikachu" + (random - 7);
  } 
  } while(random >= 16);
}

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
