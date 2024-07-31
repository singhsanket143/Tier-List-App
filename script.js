let currentDraggedItem;

const tierInput = document.getElementById('tier');

const itemContainers = document.getElementsByClassName('item-container');

// const tierLists = document.querySelectorAll('.tier-list');

const submitBtn = document.getElementById('submit');

const imageForm = document.getElementById('image-form');


for(const itemContainer of itemContainers) {
    setUpItemContainerForDrag(itemContainer);
}

// tierLists.forEach(setUpDropZoneInTierListItem);  


imageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const imageItemInput = document.getElementById('image-item');
    if(imageItemInput.value === '') {
        alert('Please enter a valid image url');
        return;
    }
    const imageUrl = imageItemInput.value;
    createTierListItem(imageUrl);
    imageItemInput.value = '';
});

submitBtn.addEventListener('click', (event) => {
    event.preventDefault(); // stops the default behaviour of the event
    // To get access of the element on which this event was fired
    if(tierInput.value === '') {
        alert('Please enter a tier name');
        return;
    }
    createTierList(tierInput.value);
    tierInput.value = '';
});

function createTierList(tierListName) {
    const newTierList = document.createElement('div');

    newTierList.classList.add('tier-list');

    const heading = document.createElement('h1'); // Try to randomly assign color to this heading
    heading.textContent = tierListName;

    const newTierListItems = document.createElement('div');
    newTierListItems.classList.add('tier-list-items');

    const deleteImagediv = document.createElement('div');
    const deleteIcon = document.createElement('img');
    deleteIcon.src = "https://cdn-icons-png.freepik.com/512/3807/3807871.png";
    deleteImagediv.classList.add("delete-icon");

    deleteImagediv.appendChild(deleteIcon);

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);
    newTierList.appendChild(deleteImagediv);
    setUpDropZoneInTierListItem(newTierListItems);

    const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);
    DeleteTierList(tierSection, deleteImagediv, newTierList);
}

function DeleteTierList(tierSection, deleteImagediv, newTierList){
    deleteImagediv.addEventListener('click', () => {
        tierSection.removeChild(newTierList);
    })

}

function createTierListItem(imageUrl) {
    const imageDiv = document.createElement('div');
    imageDiv.setAttribute('draggable', 'true');
    imageDiv.classList.add('item-container');

    console.log(imageDiv);

    const img = document.createElement('img');
    img.src = imageUrl;

    imageDiv.appendChild(img);

    const nonTierSection = document.getElementById('non-tier-section');
    nonTierSection.appendChild(imageDiv);

    setUpItemContainerForDrag(imageDiv);
}

function setUpItemContainerForDrag(itemContainer) {
    itemContainer.addEventListener('dragstart', (event) => {
        console.log("Start dragging");
        currentDraggedItem = event.target.parentNode;
    });

    itemContainer.addEventListener('dblclick', (event) => {
        const parentNode = event.target.parentNode;
        const nonTierSection = document.getElementById('non-tier-section');
        nonTierSection.appendChild(parentNode);
    });
}

function setUpDropZoneInTierListItem(tierListItem) {
    tierListItem.addEventListener('dragover', (event) => {
        console.log("dragover");
        event.preventDefault(); // stops the default behaviour of the event which is to not allow drop
    });

    tierListItem.addEventListener('drop', function (event) {
        // console.log(event.target);
        // event.target.appendChild(currentDraggedItem);
        console.log("event coming up", event);
        console.log(currentDraggedItem);
        if(this !== currentDraggedItem.parentNode) {
            this.appendChild(currentDraggedItem);
        }
    });
}
