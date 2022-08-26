/*
eseményfigyelő minden számra és operátorra
az input egy stringbe
a bevitt adatok folyamatos kiírása

clear gomb eseményfigyelője

ellenőrzés:
    operátorral nem kezdődhet és végződhet
    két operátor nem lehet egymás után
    több tizedesvessző nem lehet egy számban
    
az input szétválogatása számokra és operátorokra
    
eseményfigyelő az egyenlőségre

eredmény számítása

erdmény kiírása
*/

let input = "";
let isError = false;
let opArray = [];
let separatedString = "";
let numbersArray = [];
let resultNumber = "";

/* ráadjuk az eseményfigyelőket */
const addButtonClickListener = () => {
  document.querySelectorAll(".number, .operator").forEach((element) => {
    element.addEventListener("click", () => changeOutput(element));
  });
};

/* összefűzzük a bemenetet egy stringgé */
const setInputValue = (element) => {
  input = input.concat(element.textContent);
  //console.log(input);
};

/* beállítjuk a resultrow-ban megjelenítendő outputot */
const setOutput = (output) => {
  document.querySelector(".resultRow").textContent = output;
};

/* a bevitelnek megfelelően folyamatosan változtatjuk a kimenetet */
const changeOutput = (element) => {
  setInputValue(element);
  setOutput(input);
};

/*az első karakter nem lehet operátor, ekkor átállítjuk az isErrort true-re*/
checkInputFirstOperator = (stringInput) => {
  //console.log(stringInput);
  if (
    stringInput.startsWith("+") ||
    stringInput.startsWith("-") ||
    stringInput.startsWith("x") ||
    stringInput.startsWith("÷")
  ) {
    isError = true;
  }
  //console.log("isError in checkInputFirstOperator:", isError);
};

/*az utolsó karakter nem lehet operátor, ekkor átállítjuk az isErrort true-ra*/
checkInputLastOperator = (stringInput) => {
  //console.log(stringInput);
  if (
    stringInput.endsWith("+") ||
    stringInput.endsWith("-") ||
    stringInput.endsWith("x") ||
    stringInput.endsWith("÷")
  ) {
    isError = true;
  }
  //console.log("isError in checkInputLastOperator:", isError);
};

/* megnézzük, hogy az adott elem operátor-e */
const isOperator = (item) => {
  if (item === "+" || item === "-" || item === "x" || item === "÷") {
    return true;
  } else {
    return false;
  }
};

/* megnézzük, hogy van-e olyan, hogy két operátor van egymás után */
checkInputDoubleOperator = (stringInput) => {
  for (let i = 0; i < stringInput.length - 1; i++) {
    if (isOperator(stringInput[i]) & isOperator(stringInput[i + 1])) {
      isError = true;
    }
  }
};

/* megnézzük, hogy van-e egymás után két tizedesvessző */
checkInputDoubleDot = (stringInput) => {
  for (let i = 0; i < stringInput.length - 1; i++) {
    if ((stringInput[i] == ".") & (stringInput[i + 1] == ".")) {
      isError = true;
    }
  }
  //console.log("isError in checkInputDoubleDot:", isError);
};

/* megnézzük a bemenetet, hogy jó-e a számok és operátorok rendje */
const checkInput = (input) => {
  checkInputFirstOperator(input);
  if (isError == false) {
    checkInputLastOperator(input);
  }
  if (isError == false) {
    checkInputDoubleOperator(input);
  }
  if (isError == false) {
    checkInputDoubleDot(input);
  }
  //console.log(isError);
};

/* kiszedjük sorrendben az operátorokat egy tömmbe */
const getOperatorArray = (arr) => {
  opArray = arr
    .filter((item) => Number.isNaN(parseFloat(item)))
    .filter((item) => item !== ".");
  //console.log(opArray);
};

/* egyforma elválasztókra cseréljük a számok közötti operátorokat */
const setSameSeparator = (inputString) => {
  separatedString = inputString.replace("-", "+");
  separatedString = separatedString.replace("x", "+");
  separatedString = separatedString.replace("÷", "+");
};

/* szétdaraboljuk a bemenő stringet, és átkonvertáljuk számokká */
const separateNumbers = () => {
  numbersArray = separatedString.split("+");
  numbersArray = numbersArray.map((item) => parseFloat(item));
  //console.log(numbersArray);
};

/* elvégezzük a megfelelő műveleteket */
const selectOperator = (number1, number2, string) => {
  //let number = 0;
  if (string == "+") {
    number = number1 + number2;
  } else if (string == "-") {
    number = number1 - number2;
  } else if (string == "x") {
    number = number1 * number2;
  } else if (string == "÷") {
    number = number1 / number2;
  }
  return number;
};

/* minden elemre elvégezzük a műveleteket */
const countResult = (numbersArray, opArray) => {
  resultNumber = numbersArray[0];
  for (let i = 0; i < numbersArray.length; i++) {
    resultNumber = selectOperator(
      resultNumber,
      numbersArray[i + 1],
      opArray[i]
    );
  }
  //console.log(resultNumber);
};

/* eseménykezelő a clear gombra */
const addClearClickListener = () => {
  document.querySelector(".clear").addEventListener("click", () => {
    resultNumber = "";
    isError = false;
    setOutput(resultNumber);
  });
};

/* eseménykezelő az egyenlő gombra */
const addEqualClickListener = () => {
  document.querySelector(".equal").addEventListener("click", () => {
    checkInput(input);
    getResult();
    input = "";
  });
};

/* eredmény számítás */
const getResult = () => {
  if (isError == true) {
    setOutput("ERROR");
  } else {
    getOperatorArray([...input]);
    setSameSeparator(input);
    separateNumbers(separatedString);
    countResult(numbersArray, opArray);
    /* valahogy még mindig előfordul, hogy NaN lesz a végeredmény */
    Number.isNaN(resultNumber) ? setOutput("ERROR") : setOutput(resultNumber);
  }
};

const startCalculator = () => {
  addButtonClickListener();
  addEqualClickListener();
  addClearClickListener();
};

startCalculator();
