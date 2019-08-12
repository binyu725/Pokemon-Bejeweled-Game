
//this is what's triggered when any button in the matrix is pressed

function buttonClicked(i, j) { //this is where you should start
  if (stage < 2) {
    clickHistory.push(i*8 + j);
    if (clickHistory.length % 2 == 1) {
      setStatusText("Pokemon [" + getButtonColor(i, j) + "] has chosen");
    }
    if (clickHistory.length % 2 == 0) {
      exchange();
      setStatusText("Pokemon [" + getButtonColor(parseInt(clickHistory[clickHistory.length - 2] / 8), clickHistory[clickHistory.length - 2] % 8) + "] and Pokemon [" + getButtonColor(i, j) + "] has exchanged! Gotcha!");
      if (!is3InLine()) {
        exchange();
        setStatusText("Fail to exchange");
      } else {
        getClear("addPoints");
      }
    }
  } else {
    if (progress < 100 && progress >= 0) {
      clickHistory.push(1);
      if (clickHistory.length == 1) {
        reduceProgress();
      }
      progress += 3;
      setProgressBar("bar", "bg-success", progress);
    } else if (progress >= 100) {
      setStatusText("Congratulations! You caught Giant Pikachu! You clear the game! Thanks for playing!");
    }
  }
}

function exchange() {
  var firstClickedRow = parseInt(clickHistory[clickHistory.length - 2] / 8);
  var firstClickedColumn = clickHistory[clickHistory.length - 2] % 8;
  var firstButtonColor = getButtonColor(firstClickedRow, firstClickedColumn);
  var secondClickedRow = parseInt(clickHistory[clickHistory.length - 1] / 8);
  var secondClickedColumn = clickHistory[clickHistory.length - 1] % 8;
  var secondButtonColor = getButtonColor(secondClickedRow, secondClickedColumn);
  if (Math.abs(firstClickedColumn - secondClickedColumn) + Math.abs(firstClickedRow - secondClickedRow) <= 1) {
    setButtonColor(firstClickedRow, firstClickedColumn, secondButtonColor);
    setButtonColor(secondClickedRow, secondClickedColumn, firstButtonColor);
  }
}

function is3InLine() {
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      var sameColorInRow = [];
      sameColorInRow.push(i + ", " + j);
      for (c = j - 1; c >= 0; c--) {
        if (getButtonColor(i, c) == getButtonColor(i, j)) {
          sameColorInRow.push(i + ", " + c);
        }
        else {
          break;
        }
      }
      for (c = j + 1; c < 8; c++) {
        if (getButtonColor(i, c) == getButtonColor(i, j)) {
          sameColorInRow.push(i + ", " + c);
        }
        else {
          break;
        }
      }
      var sameColorInColumn = [];
      sameColorInColumn.push(i + ", " + j);
      for (r = i - 1; r >= 0; r--) {
        if (getButtonColor(r, j) == getButtonColor(i, j)) {
          sameColorInColumn.push(r + ", " + j);
        }
        else {
          break;
        }
      }
      for (r = i + 1; r < 8; r++) {
        if (getButtonColor(r, j) == getButtonColor(i, j)) {
          sameColorInColumn.push(r + ", " + j);
        }
        else {
          break;
        }
      }
      if (sameColorInRow.length >= 3) {
        return true;
      }
      if (sameColorInColumn.length >= 3) {
        return true;
      }
    }
  }
  return false;
}

function getClear(type) {
  setTimeout(function() {
    for (i = 0; i < 8; i++) {
      for (j = 0; j < 8; j++) {
        var sameColorInRow = [];
        sameColorInRow.push(i + ", " + j);
        for (c = j - 1; c >= 0; c--) {
          if (getButtonColor(i, c) == getButtonColor(i, j)) {
            sameColorInRow.push(i + ", " + c);
          }
          else {
            break;
          }
        }
        for (c = j + 1; c < 8; c++) {
          if (getButtonColor(i, c) == getButtonColor(i, j)) {
            sameColorInRow.push(i + ", " + c);
          }
          else {
            break;
          }
        }
        var sameColorInColumn = [];
        sameColorInColumn.push(i + ", " + j);
        for (r = i - 1; r >= 0; r--) {
          if (getButtonColor(r, j) == getButtonColor(i, j)) {
            sameColorInColumn.push(r + ", " + j);
          }
          else {
            break;
          }
        }
        for (r = i + 1; r < 8; r++) {
          if (getButtonColor(r, j) == getButtonColor(i, j)) {
            sameColorInColumn.push(r + ", " + j);
          }
          else {
            break;
          }
        }
        if (sameColorInRow.length >= 3) {
          for (a = 0; a < sameColorInRow.length; a++) {
            setButtonColor(parseInt(sameColorInRow[a].charAt(0)), parseInt(sameColorInRow[a].charAt(3)), "white");
          }
          if (type == "addPoints") {
            progress += parseInt(getButtonText(parseInt(sameColorInRow[0].charAt(0)), parseInt(sameColorInRow[0].charAt(3)))) * 2;
            setProgressBar("bar", "bg-success", progress);
            if (progress >= 100) {
              if (stage == 0) {
                setStatusText("Congratulations! You got 100%! Is it too simple? Go to next stage(HELL!) now!!!");
              } else {
                setStatusText("Congratulations! You overcome the hell level!!! Go to next stage now!!!");
              }
            }
          }
        }
        if (sameColorInColumn.length >= 3) {
          for (a = 0; a < sameColorInColumn.length; a++) {
            setButtonColor(parseInt(sameColorInColumn[a].charAt(0)), parseInt(sameColorInColumn[a].charAt(3)), "white");
          }
          if (type == "addPoints") {
            progress += parseInt(getButtonText(parseInt(sameColorInColumn[0].charAt(0)), parseInt(sameColorInColumn[0].charAt(3)))) * 2;
            setProgressBar("bar", "bg-success", progress);
            if (progress >= 100) {
              if (stage == 0) {
                setStatusText("Congratulations! You got 100%! Is it too simple? Go to next stage(HELL!) now!!!");
              } else {
                setStatusText("Congratulations! You overcome the hell level!!! Go to next stage now!!!");
              }
            }
          }
        }
      }
    }
  }, 600);

  setTimeout(function() {
    for (col = 0; col < 8; col++) {
      var remainedColor = [];
      for (row = 0; row < 8; row++) {
        if (getButtonColor(row, col) != "white") {
          remainedColor.push(getButtonColor(row, col));
        }
      }
      for (row = 8 - remainedColor.length; row < 8; row++) {
          setButtonColor(row, col, remainedColor[row - (8 - remainedColor.length)]);
      }
      for (row = 0; row < 8 - remainedColor.length; row++) {
          setButtonColor(row, col, getRandomColor());
      }
    }
    if (is3InLine()) {
      var x = type;
      getClear(x);
    }
  }, 1300);
}

function fillGiantPikachu() {
    for (i = 0; i < 8; i++) {
      for (j = 0; j < 8; j++) {
        setButtonColor(i, j, i + "," + j);
      }
    }
}

function reduceProgress() {
  progress -= 1;
  setProgressBar("bar", "bg-success", progress);
  t = setTimeout(reduceProgress, 100);
  if (progress >= 100) {
    clearTimeout(t);
    fillGiantPikachu();
    setStatusText("Congratulations! You caught Giant Pikachu! You clear the game! Thanks for playing!");
  } else if (progress < 0) {
    clearTimeout(t);
    setStatusText("Defeat! The Giant Pikachu killed you. ");
  }
}
