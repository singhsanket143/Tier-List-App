let currentDraggedItem;

const tierInput = document.getElementById('tier');
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', (events) => {
    events.preventDefault();
    if(tierInput.value === ''){
        alert("Please enter name tier list name")
        return;
    }
    createTierList(tierInput.value);
    tierInput.value = ''
    saveTierList();
});

const itemContainers = document.getElementsByClassName('item-container');
const existingTierList = document.querySelectorAll('.tier-list-items');

for(let i of existingTierList){
    setUpDropZoneInTierListItem(i);
}

const imgForm = document.getElementById('image-form');
for(let itemContainer of itemContainers){
    setUpItemContainerForDrag(itemContainer);
}

imgForm.addEventListener('submit', (events) => {
    events.preventDefault();
    const imageItemInput = document.getElementById('img-item');
    if(imageItemInput.value === ''){
        alert("Please enter valid image url");
        return;
    }
    const imageUrl = imageItemInput.value;
    createTierListItem(imageUrl);
    imageItemInput.value = '';
    saveTierList();
});

document.addEventListener('DOMContentLoaded', loadTierList);

function createTierList(tierListName){
    const newTierList = document.createElement('div');
    newTierList.classList.add('tier-list');

    const heading = document.createElement('h2');
    heading.classList.add('heading');
    heading.textContent = tierListName;
    heading.style.backgroundColor = randomBackgroundColor();
    heading.addEventListener('blur', () => {
        saveTierList();
    });

    const newTierListItems = document.createElement('div');
    newTierListItems.classList.add('tier-list-items');

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);

    setUpDropZoneInTierListItem(newTierListItems);

    const functionalityDiv = document.createElement('div');
    functionalityDiv.classList.add('function-ico');

    const editBtn = document.createElement('i');
    editBtn.classList.add('bx', 'bxs-message-rounded-edit', 'edit-btn');

    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('bx', 'bxs-trash-alt', 'delete-btn');
    functionalityDiv.appendChild(editBtn);
    functionalityDiv.appendChild(deleteBtn);
    newTierList.appendChild(functionalityDiv);

    const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);

    editBtn.title = 'Edit';
    editBtn.addEventListener('click', () => {
        heading.contentEditable = true;
        const range = document.createRange();
        const selection = window.getSelection(); 
        /*
        window.getSelection(): This is a method of the window object that returns a Selection object. The Selection object represents the current text selection in the document.
        It doesn't take any parameters.
        It returns a Selection object, which contains information about the current selection state.
        */
        range.selectNodeContents(heading);
        range.collapse(false); // false means it cursor goes to end // true means it cursor goes to starts
        selection.removeAllRanges();
        selection.addRange(range);
        heading.focus();
    });

    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
        const parentNode = functionalityDiv.parentNode;
        const tierListItems = parentNode.querySelectorAll('.tier-list-items .item-container');
        const nonTierSection = document.getElementById('non-tier-section');
        tierListItems.forEach(item => {
            nonTierSection.appendChild(item);
        })
        parentNode.parentNode.removeChild(parentNode);
        saveTierList();
    });
}

function createTierListItem(imageUrl){
    const imageDiv = document.createElement('div');
    imageDiv.setAttribute('draggable', 'true');
    imageDiv.classList.add('item-container');

    const img = document.createElement('img');
    img.src = imageUrl;
    imageDiv.appendChild(img);
    setUpItemContainerForDrag(imageDiv);

    const nonTierSection = document.getElementById('non-tier-section');
    nonTierSection.appendChild(imageDiv);


    saveTierList();
}

function setUpItemContainerForDrag(itemContainer){
    itemContainer.addEventListener('dragstart', (event) => {
        currentDraggedItem = event.target.parentNode;
    });
    
    itemContainer.addEventListener('dblclick', (event) => {
        const parentNode = event.target.parentNode;
        const nonTierSection = document.getElementById('non-tier-section');
        nonTierSection.appendChild(parentNode);
        saveTierList();
    });

    itemContainer.addEventListener('click', (e) => {
        const removalOnKey = function(event){
            if(event.key === 'r' || event.key === 'R'){
                itemContainer.remove();
            }
            document.removeEventListener('keydown', removalOnKey);
            saveTierList();
        }
        document.addEventListener('keydown', removalOnKey);
    })
}

function setUpDropZoneInTierListItem(tierListItem){
    tierListItem.addEventListener('drop', (event) => {
        event.preventDefault();
    });

    tierListItem.addEventListener('dragover', function (event){
        if(this !== currentDraggedItem.parentNode){
            this.appendChild(currentDraggedItem);
            saveTierList();
        }
    });

}

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}

function randomBackgroundColor(){
    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    return rndCol;
}

function saveTierList() {
    const tiers = document.querySelectorAll('.tier-list');
    const tierListData = [];

    tiers.forEach(tier => {
        const tierName = tier.querySelector('.heading').textContent;
        const tierColor = tier.querySelector('.heading').style.backgroundColor;
        const items = Array.from(tier.querySelectorAll('img')).map(img => img.src);
        tierListData.push({ tierName, tierColor, items });
    });

    const nonTierItems = Array.from(document.getElementById('non-tier-section').querySelectorAll('img')).map(img => img.src);

    const data = { tierListData, nonTierItems };
    localStorage.setItem('tierList', JSON.stringify(data));
}

function loadTierList() {
    const data = JSON.parse(localStorage.getItem('tierList'));
    if (data) {
        data.tierListData.forEach(tier => {
            createTierList(tier.tierName);
            const createdTier = document.querySelector('.tier-list:last-child .tier-list-items');
            const createdHeading = document.querySelector('.tier-list:last-child .heading');
            createdHeading.style.backgroundColor = tier.tierColor;
            createdHeading.addEventListener('blur', () => {
                saveTierList();
            });
            tier.items.forEach(src => {
                const imgDiv = document.createElement('div');
                imgDiv.setAttribute('draggable', 'true');
                imgDiv.classList.add('item-container');

                const img = document.createElement('img');
                img.src = src;
                imgDiv.appendChild(img);
                setUpItemContainerForDrag(imgDiv);

                createdTier.appendChild(imgDiv);
            });
        });

        const nonTierSection = document.getElementById('non-tier-section');
        data.nonTierItems.forEach(src => {
            const imgDiv = document.createElement('div');
            imgDiv.setAttribute('draggable', 'true');
            imgDiv.classList.add('item-container');

            const img = document.createElement('img');
            img.src = src;
            imgDiv.appendChild(img);
            setUpItemContainerForDrag(imgDiv);

            nonTierSection.appendChild(imgDiv);
        });
    }
}

const tipsButton = document.getElementById('tips-btn');
tipsButton.addEventListener('click', (e) => {
    e.preventDefault()
    const tipsModalOpening = document.querySelector('.tips-section');
    tipsModalOpening.style.display = 'flex';
})

const modalClosing = document.getElementById('modal-closing')
modalClosing.addEventListener('click', (event) => {
    event.preventDefault();
    const tipsModalOpening = document.querySelector('.tips-section');
    tipsModalOpening.style.display = 'none';
})




