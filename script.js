let currentDraggedItem;

const tierInput = document.getElementById('tier');

const itemContainers = document.getElementsByClassName('item-container');

// const tierLists = document.querySelectorAll('.tier-list');

const submitBtn = document.getElementById('submit');

const imageForm = document.getElementById('image-form');

const tierSection = document.getElementById('tier-list-section');
const nonTierSection = document.getElementById('non-tier-section');


for (const itemContainer of itemContainers) {
    setUpItemContainerForDrag(itemContainer);
}

// tierLists.forEach(setUpDropZoneInTierList);


imageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const imageItemInput = document.getElementById('image-item');
    if (imageItemInput.value === '') {
        alert('Please enter a valid image url');
        return;
    }
    const imageUrl = imageItemInput.value;
    createTierListItem(imageUrl);
    imageItemInput.value = '';

    saveTierLists()
});

submitBtn.addEventListener('click', (event) => {
    event.preventDefault(); // stops the default behaviour of the event
    // To get access of the element on which this event was fired
    if (tierInput.value === '') {
        alert('Please enter a tier name');
        return;
    }
    createTierList(tierInput.value);
    tierInput.value = '';

    saveTierLists()
});

function createTierList(tierListName) {
    const newTierList = document.createElement('div');

    newTierList.classList.add('tier-list');

    const heading = document.createElement('div'); // Try to randomly assign color to this heading
    heading.classList.add('heading');

    const textContainer = document.createElement('div');
    textContainer.textContent = tierListName;

    heading.appendChild(textContainer);

    const newTierListItems = document.createElement('div');
    newTierListItems.classList.add('tier-list-items');


    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);

    setUpDropZoneInTierListItem(newTierListItems);

    // const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);


    // random color generator on the Heading names

    let color = []
    for (let i = 0; i < 3; i++) {
        color.push(Math.floor(Math.random() * 255));
    }

    // console.log(color);
    heading.style.backgroundColor = 'rgb(' + color.join(',') + ')';

    // heading.style.color = "" || "White"

    // Making heading editable
    // heading.contentEditable = true;

    // EDIT icon
    const editIcon = document.createElement('span');
    editIcon.classList.add('material-symbols-outlined', 'g-icons')
    editIcon.style.color = "#FFFFFF"
    editIcon.style.cursor = "pointer"
    editIcon.title = "Edit"
    editIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>'
    heading.appendChild(editIcon);
    editIcon.addEventListener('click', () => {
        heading.contentEditable = true;
    })

    // Delete icon
    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('material-symbols-outlined', 'g-icons')
    deleteIcon.style.color = "#FFFFFF"
    deleteIcon.style.cursor = "pointer"
    deleteIcon.title = "Delete"
    deleteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'
    heading.appendChild(deleteIcon);
    deleteIcon.addEventListener('click', () => {
        // Move images back to non-tier section
        const items = newTierListItems.getElementsByClassName('item-container');
        while (items.length > 0) {
            nonTierSection.appendChild(items[0]);
        }
        newTierList.remove();
        saveTierLists();
    });
    saveTierLists()

    // localStorage.setItem("Tierlist", newTierList.innerHTML)
    // localStorage.getItem(newTierList.innerHTML )
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
    
    saveTierLists()


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
        saveTierLists()
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
        if (this !== currentDraggedItem.parentNode) {
            this.appendChild(currentDraggedItem);
        }
        saveTierLists()
    });
}

// Local Storage Functionality feature

function saveTierLists() {
    localStorage.setItem("tierLists", tierSection.innerHTML);
    localStorage.setItem("nonTierItems", nonTierSection.innerHTML);
}

function showTierLists() {
    tierSection.innerHTML = localStorage.getItem("tierLists") || '';
    nonTierSection.innerHTML = localStorage.getItem("nonTierItems") || '';

    const newItemContainers = document.getElementsByClassName('item-container');
    for (const itemContainer of newItemContainers) {
        setUpItemContainerForDrag(itemContainer);
    }

    const newTierListItems = document.getElementsByClassName('tier-list-items');
    for (const tierListItem of newTierListItems) {
        setUpDropZoneInTierListItem(tierListItem);
    }

    const newHeadings = document.getElementsByClassName('heading');
    for (const heading of newHeadings) {
        const editIcon = heading.querySelector('.material-symbols-outlined[title="Edit"]');
        const deleteIcon = heading.querySelector('.material-symbols-outlined[title="Delete"]');

        editIcon.addEventListener('click', () => {
            heading.contentEditable = true;
        });

        deleteIcon.addEventListener('click', () => {
            // Move images back to non-tier section
            const newTierListItems = heading.nextElementSibling;
            const items = newTierListItems.getElementsByClassName('item-container');
            while (items.length > 0) {
                nonTierSection.appendChild(items[0]);
            }
            heading.parentNode.remove();
            saveTierLists();
        });
    }
}

showTierLists()