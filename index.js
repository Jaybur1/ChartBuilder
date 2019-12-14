const data = [
  [54, "html"],
  [67, "js"],
  [90, "pascal"],
  [150, "turbo pascal"],
  [30, "ruby"],
  [54, "html"],
  [67, "js"],
  [90, "pascal"],
  [150, "turbo pascal"],
  [30, "ruby"],
  [54, "html"],
  [67, "js"],
  [90, "pascal"],
  [150, "turbo pascal"],
  [30, "ruby"],
  [54, "html"],
  [67, "js"],
  [90, "pascal"],
  [150, "turbo pascal"],
];
const options = {
  valueType: "",
  labelType: "",
  isLabeld: true,
  title: "Test Chart",
  height: 500,
  width: 300,
  barColor: "blue",
  hoverColor: "green",
  labelColor: "black",
  horizontal: false
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
  dataInputBox.style.opacity = 0;
  dataInputBox.style.zIndex = 0;
  chartDiv.style.opacity = 0;
  chartDiv.style.zIndex = 0;
}

const setVisibleSection = section => {
  setSectionsToDefault();
  section.style.opacity = 1;
  section.style.zIndex = 1;
}

//chart manipulation
const newBar = (value, max, data, key = "",chart,options) => {
  const bar = document.createElement("div");
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
  
  chartDiv.appendChild(title);
  chartDiv.appendChild(chart);
  chart.appendChild(value);
  chart.appendChild(label);

  
};

const collectData = () => {
  const data = [];
  dataInputArr = dataInput.value.split(' ');
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

//handlers
mainBtns.forEach(elem => {
  elem.onclick = () => {
    setPagesToDefault();
    setVisiblePage(mainPage);
  };
});

buildBtns.forEach(elem => {
  elem.onclick = () => {
    setVisiblePage(buildPage);
    setVisibleSection(dataInputBox)
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
  setValueLabelType(options);
  drawChart(collectData(),options);
  setVisibleSection(chartDiv);
 
}


