//const data = [
//  [54, "html"],
//  [67, "js"],
//  [90, "pascal"],
//  [150, "turbo pascal"],
//  [30, "ruby"],
//  [54, "html"],
//  [67, "js"],
//  [90, "pascal"],
//  [150, "turbo pascal"],
//  [30, "ruby"],
//  [54, "html"],
//  [67, "js"],
//  [90, "pascal"],
//  [150, "turbo pascal"],
//  [30, "ruby"],
//  [54, "html"],
//  [67, "js"],
//  [90, "pascal"],
//  [150, "turbo pascal"],
//];
const options = {
  valueType: "",
  labelType: "",
  title: "Test Chart",
  height: 500,
  width: 300,
  barColor: "blue",
  hoverColor: "green",
  created: false
};

//Variables

// buttons
const buildBtns = document.querySelectorAll(".build-btn");
const mainBtns = document.querySelectorAll(".main-btn");
const instructionBtn = document.querySelector(".instruction-btn");
const exampleBtn = document.querySelector(".example-btn");
const createChartBtn = document.querySelector('#create');

// pages
const mainPage = document.querySelector(".main-page");
const buildPage = document.querySelector(".build-page");
const instructionPage = document.querySelector(".instruction-page");
const examplePage = document.querySelector(".example-page");

//// build values
const dataInputBox = document.querySelector('.data-init');
const dataInput = document.querySelector('#data');
const valueTypeInput = document.querySelector('#valueType');
const labelTypeInput = document.querySelector('#labelType');
const titleInput = document.querySelector('#titleType');
const colorInput = document.querySelector('#color');
const hoverColorInput = document.querySelector('#hoverColor');

//chart
const chartDiv = document.querySelector("#chart");

//functions

//pages manipulation
const setPagesToDefault = () => {
  mainPage.style.opacity = 0;
  mainPage.style.zIndex = 0;
  examplePage.style.opacity = 0;
  examplePage.style.zIndex = 0;
  instructionPage.style.opacity = 0;
  instructionPage.style.zIndex = 0;
  buildPage.style.opacity = 0;
  buildPage.style.zIndex = 0;
};

const setVisiblePage = page => {
  setPagesToDefault();
  page.style.opacity = 1;
  page.style.zIndex = 1;
};

const setSectionsToDefault = () => {
  dataInputBox.style.opacity = -1;
  dataInputBox.style.zIndex = -1;
  chartDiv.style.opacity = -1;
  chartDiv.style.zIndex = -1;
};

const setVisibleSection = section => {
  section.style.opacity = 1;
  section.style.zIndex = 10;
};

const newChartOption = () => {
  chartDiv.innerHTML = "";
  const inputValues = [dataInput, valueTypeInput,labelTypeInput, titleInput];
  inputValues.forEach(elem => elem.value = null);
  createChartBtn.innerHTML = "Create";
  setSectionsToDefault();
  setVisibleSection(dataInputBox);

};

const updateChartOption = () => {
  createChartBtn.innerHTML = "Update";
  setVisibleSection(dataInputBox);
};

const instructionsChartOption = () => {
  setVisiblePage(instructionPage);
}

//chart manipulation
const newBar = (value, max, data, key = "",chart,options) => {
  const bar = document.createElement("div");
  bar.className ='bars';
  bar.style = `
  background: ${options.barColor};
  transition: 1s;
  width: ${((value/max)*100)}%;
  margin-top:${data.length > 4 ? ((options.height / data.length)/data.length)/2 : ((options.height / data.length)/data.length)/10}%;
  height:${data.length > 3 ? (100/data.length)-10 : ((50/data.length))}%`;

  const keySpan = document.createElement("sapn");
  keySpan.className = "bar-key";
  keySpan.innerHTML = key;

  const valueSpan = document.createElement("span");
  valueSpan.className = "bar-value";
  valueSpan.innerHTML = value;

  bar.onmouseover = () => {
    keySpan.style.transform = 'translate(-50%,-50%)rotate(90deg)scale(2)';
    valueSpan.style.transform = 'translate(-50%,-50%)rotate(90deg)scale(3)';
    valueSpan.style.marginTop = '-150px';
    bar.style.width = `${((value/max)*100) == 100 ? ((value/max)*100) : ((value/max)*100) + 15}%`;
    bar.style.background = options.hoverColor;
  }

  bar.onmouseout = () => {
    keySpan.style.transform = null;
    valueSpan.style.transform = null;
    bar.style.width = `${((value/max)*100)}%`;
    bar.style.background = options.barColor;
  }

  bar.appendChild(keySpan);
  bar.appendChild(valueSpan);
  chart.appendChild(bar);

};

const findMax = data => {
  let max = 0;
  for (let arr of data) {
    if (arr[0] > max) max = arr[0];
  }
  console.log(max);
  return max;
};

const createBars = (data,chart,options) => {
  const max = findMax(data);
  for (let d of data) {
    newBar(d[0], max, data, d[1],chart,options);
  }
};

const drawChart = (data, options) => {
  const title = document.createElement("h1");
  title.innerHTML = options.title;
  title.className = "chart-title";

  const value = document.createElement("h3");
  value.className = "chart-value";
  value.innerHTML = options.valueType;
  value.style.transform = `${
    options.horizontal ? "" : "rotate(90deg); transform-origin:left;"
  }`;

  const label = document.createElement("h3");
  label.className = "chart-label";
  label.innerHTML = options.labelType;
  label.style.transform = `${
    options.horizontal ? "" : "rotate(90deg); transform-origin:left;"
  }`;

  const chart = document.createElement("div");
  chart.className = "chart-box";
  chart.style.width = `${options.width}px`;
  chart.style.height = `${options.height}px`;
  
  createBars(data,chart,options);
  
  const optionsMenu = document.createElement("div");
  optionsMenu.className = 'optionsMenu';
  const newChartBtn = document.createElement("button");
  newChartBtn.className = 'optionsMenuBtns newBuild-btn';
  newChartBtn.innerHTML = "New chart";
  newChartBtn.onclick = () => {
    newChartOption();
  }
  const updateChartBtn = document.createElement("button");
  updateChartBtn.className = 'optionsMenuBtns updateBuild-btn'
  updateChartBtn.innerHTML = "Update chart";
  updateChartBtn.onclick = () => {
    updateChartOption();
  }
  const instructionsChartBtn = document.createElement("button");
  instructionsChartBtn.className = 'optionsMenuBtns instructionBuild-btn';
  instructionsChartBtn.innerHTML = "How To";



  optionsMenu.appendChild(newChartBtn);
  optionsMenu.appendChild(updateChartBtn);
  optionsMenu.appendChild(instructionsChartBtn);

  chartDiv.appendChild(title);
  chartDiv.appendChild(chart);
  chartDiv.appendChild(optionsMenu);
  chart.appendChild(value);
  chart.appendChild(label);

  options.created = true;
  
};

const collectData = () => {
  const data = [];
  dataInputArr = dataInput.value.trim().split(' ');
  for (let i = 0; i < dataInputArr.length; i += 2) {
    let valueLabelPair = [];
    valueLabelPair.push(Number(dataInputArr[i + 1]), dataInputArr[i])
    data.push(valueLabelPair);
  }
  return data;
}

const setValueLabelType = (options) => {
  options.valueType = valueTypeInput.value;
  options.labelType = labelTypeInput.value;
}

const setOptions = (options) => {
  setValueLabelType(options);
  options.title = titleInput.value;
  options.barColor = colorInput.value;
  options.hoverColor = hoverColorInput.value;
}

//handlers
mainBtns.forEach(elem => {
  elem.onclick = () => {
    setVisiblePage(mainPage);
  };
});

buildBtns.forEach(elem => {
  elem.onclick = () => {
    setVisiblePage(buildPage);
    !options.created ? newChartOption() : setVisibleSection(chartDiv);
  };
});

instructionBtn.onclick = () => {
  setVisiblePage(instructionPage);
};

exampleBtn.onclick = () => {
  setVisiblePage(examplePage);
};

createChartBtn.onclick = () => {
  chartDiv.innerHTML = "";
  setOptions(options);
  drawChart(collectData(),options);
  dataInputBox.style.opacity = 0;
  dataInputBox.style.zIndex = -1;
  chartDiv.style.opacity = 9;
  chartDiv.style.zIndex = 5;
 
}


