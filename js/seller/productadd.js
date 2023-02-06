const selectBoxElements = document.querySelectorAll("div.mp-seller-add div.add-prodinfo div.select");

function toggleSelectBox(selectBox) {
  selectBox.classList.toggle("active");
}

function selectOption(optionElement) {
  const selectBox = optionElement.closest("div.mp-seller-add div.add-prodinfo div.select");
  const selectedElement = selectBox.querySelector("div.mp-seller-add div.add-prodinfo div.select div.selected div.selected-value");
  selectedElement.textContent = optionElement.textContent;
}

selectBoxElements.forEach(selectBoxElement => {
  selectBoxElement.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isOptionElement = targetElement.classList.contains("option");

    if (isOptionElement) {
      selectOption(targetElement);
    }

    toggleSelectBox(selectBoxElement);
  });
});

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  const isSelect = targetElement.classList.contains("select") || targetElement.closest("div.mp-seller-add div.add-prodinfo div.select");

  if (isSelect) {
    return;
  }

  const allSelectBoxElements = document.querySelectorAll("div.mp-seller-add div.add-prodinfo div.select");

  allSelectBoxElements.forEach(boxElement => {
    boxElement.classList.remove("active");
  });
});