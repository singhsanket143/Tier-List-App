let currentDraggedItem;

const tierInput = document.getElementById('tier');
const itemContainers = document.getElementsByClassName('item-container');
// const tierLists = document.querySelectorAll('.tier-list');
const submitBtn = document.getElementById('submit');
const imageForm = document.getElementById('image-form');

for(const itemContainer of itemContainers) {
    setUpItemContainerForDrag(itemContainer);
}
// tierLists.forEach(setUpDropZoneInTierList);


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
    // Colours String (hex code);
    let str = '#';
    const n = 6;
    for(let i = 0; i < n; i++) {
        let n = Math.floor(Math.random() * (17 - 0) + 0);
        str += n.toString(16);
    }

    const newTierList = document.createElement('div');
    newTierList.classList.add('tier-list');

    const heading = document.createElement('div'); // Try to randomly assign color to this heading
    heading.classList.add('heading');
    heading.textContent = tierListName;
    heading.style.backgroundColor = str;

    // Edit button
    const editBtn = document.createElement('i');
    editBtn.classList.add('fa-solid', 'fa-gear');

    // Edit functionality
    editBtn.addEventListener('click', (event) => {
        // console.log('event triggered')
        const input = document.createElement('input');
        input.classList.add("edit-input");
        input.type = "text";
        input.value = heading.textContent;
        heading.replaceWith(input);
        input.focus();

        const saveInput = () => {
            heading.textContent = input.value;
            input.replaceWith(heading);
        }

        input.addEventListener('keypress', (event) => {
            if (input.value != '' && event.key === 'Enter') {
                saveInput();
            }
        });
     });

    // Remove functionality
    const removeBtn = document.createElement('i');
    removeBtn.classList.add("fa-regular", 'fa-circle-xmark');
    removeBtn.addEventListener('click', ()=> {
        removeTeirList(newTierList);
    }); 

    const listContainer = document.createElement('div');
    listContainer.classList.add('list-container');

    // Button container
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const newTierListItems = document.createElement('div');
    newTierListItems.classList.add('tier-list-items');


    newTierList.appendChild(heading);
    newTierList.appendChild(listContainer);
    listContainer.appendChild(newTierListItems);
    listContainer.appendChild(btnContainer);
    
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(removeBtn);

    setUpDropZoneInTierListItem(newTierListItems);

    const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);
}

// Function to remove the tier list on a click event
function removeTeirList(newTierList) {
    // Empty the tier list in case if it has any item container
    const nonTierSection = document.getElementById('non-tier-section');
    const items = newTierList.querySelectorAll('.item-container');
    items.forEach(item => {
        nonTierSection.appendChild(item);
    });
    newTierList.remove();
}

function createTierListItem(imageUrl) {
    const imageDiv = document.createElement('div');
    imageDiv.setAttribute('draggable', 'true');
    imageDiv.classList.add('item-container');

    setUpItemContainerForDrag(imageDiv);

    const img = document.createElement('img');
    img.src = imageUrl;

    imageDiv.appendChild(img);

    const nonTierSection = document.getElementById('non-tier-section');
    nonTierSection.appendChild(imageDiv);

}

function setUpItemContainerForDrag(itemContainer) {
    itemContainer.addEventListener('dragstart', (event) => {
        console.log(event)
        currentDraggedItem = event.target.parentNode;
    });

    itemContainer.addEventListener('dblclick', (event) => {
        const parentNode = event.target.parentNode;
        const nonTierSection = document.getElementById('non-tier-section');
        nonTierSection.appendChild(parentNode);
    });
}

function setUpDropZoneInTierListItem(tierListItem) {
    tierListItem.addEventListener('drop', (event) => {
        event.preventDefault(); // stops the default behaviour of the event which is to not allow drop
    });

    tierListItem.addEventListener('dragover', function (event) {
        // console.log(event.target);
        // event.target.appendChild(currentDraggedItem);
        console.log("event coming up", event);
        if(this !== currentDraggedItem.parentNode) {
            this.appendChild(currentDraggedItem);
        }

    });
}