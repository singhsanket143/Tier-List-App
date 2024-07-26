let currentDraggedItem;

const tierInput = document.getElementById("tier");

const itemContainers = document.getElementsByClassName("item-container");

// const tierLists = document.querySelectorAll('.tier-list');

const submitBtn = document.getElementById("submit");

const imageForm = document.getElementById("image-form");

for (const itemContainer of itemContainers) {
  setUpItemContainerForDrag(itemContainer);
}

// tierLists.forEach(setUpDropZoneInTierList);

imageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const imageItemInput = document.getElementById("image-item");
  if (imageItemInput.value === "") {
    alert("Please enter a valid image url");
    return;
  }
  const imageUrl = imageItemInput.value;
  createTierListItem(imageUrl);
  imageItemInput.value = "";
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault(); // stops the default behaviour of the event
  // To get access of the element on which this event was fired
  if (tierInput.value === "") {
    alert("Please enter a tier name");
    return;
  }
  createTierList(tierInput.value);
  tierInput.value = "";
});

function createTierList(tierListName) {
  const newTierList = document.createElement("div");

  newTierList.classList.add("tier-list");

  const heading = document.createElement("div"); // Try to randomly assign color to this heading
  heading.classList.add("heading");
  heading.style.backgroundColor = randomColor();

  const textContainer = document.createElement("div");
  textContainer.textContent = tierListName;
  heading.appendChild(textContainer);

  setUpEditTierName(textContainer);

  const newTierListItems = document.createElement("div");
  newTierListItems.classList.add("tier-list-items");

  newDeleteBtn = document.createElement("div");
  newDeleteBtn.classList.add("deleteButton");
  const trashBinImg = document.createElement("img");
  trashBinImg.src = "./images/deleteButton.svg";
  newDeleteBtn.appendChild(trashBinImg);

  setUpDeleteBtnInTierList(newDeleteBtn, newTierList, newTierListItems);

  newTierList.appendChild(heading);
  newTierList.appendChild(newTierListItems);
  newTierList.appendChild(newDeleteBtn);

  setUpDropZoneInTierListItem(newTierListItems);

  const tierSection = document.getElementById("tier-list-section");
  tierSection.appendChild(newTierList);
}

function createTierListItem(imageUrl) {
  const imageDiv = document.createElement("div");
  imageDiv.setAttribute("draggable", "true");
  imageDiv.classList.add("item-container");

  setUpItemContainerForDrag(imageDiv);

  const img = document.createElement("img");
  img.src = imageUrl;

  imageDiv.appendChild(img);

  const nonTierSection = document.getElementById("non-tier-section");
  nonTierSection.appendChild(imageDiv);
}

function setUpItemContainerForDrag(itemContainer) {
  itemContainer.addEventListener("dragstart", (event) => {
    console.log(event);
    currentDraggedItem = event.target.parentNode;
  });

  itemContainer.addEventListener("dblclick", (event) => {
    const parentNode = event.target.parentNode;
    const nonTierSection = document.getElementById("non-tier-section");
    nonTierSection.appendChild(parentNode);
  });
}

function setUpDropZoneInTierListItem(tierListItem) {
  tierListItem.addEventListener("drop", (event) => {
    event.preventDefault(); // stops the default behaviour of the event which is to not allow drop
  });

  tierListItem.addEventListener("dragover", function (event) {
    // console.log(event.target);
    // event.target.appendChild(currentDraggedItem);
    console.log("event coming up", event);
    if (this !== currentDraggedItem.parentNode) {
      this.appendChild(currentDraggedItem);
    }
  });
}

function setUpDeleteBtnInTierList(newDeleteButton, newTierList, ImgList) {
  newDeleteButton.addEventListener("click", (event) => {
    const imgContainers = ImgList.children;
    const len = imgContainers.length;
    const nonTierSection = document.getElementById("non-tier-section");
    for (let i = 0; i < len; i++) {
      const imgContainer = imgContainers[0];
      nonTierSection.appendChild(imgContainer);
    }
    newTierList.remove();
  });
}

function setUpEditTierName(textContainer) {
  textContainer.addEventListener("dblclick", (event) => {
    const text = prompt("Enter New Tier Name ..", textContainer.textContent);
    if (text !== null) {
      textContainer.textContent = text;
    }
  });
}

function randomColor() {
  let hexNum = "0123456789abcdef";
  const cons = "#";
  let val = cons;
  for (let i = 0; i < 6; i++) {
    val += hexNum[Math.floor(Math.random() * 16)];
  }
  return val;
}
