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
    const newTierList = document.createElement('div');

    newTierList.classList.add('tier-list');

    const heading = document.createElement('div'); // Try to randomly assign color to this heading
    heading.classList.add('heading');

    const textContainer = document.createElement('input');
    textContainer.readOnly = true;
    textContainer.setAttribute('type','text')
    textContainer.value = tierListName;
    

    heading.appendChild(textContainer);

    const newTierListItems = document.createElement('div');
    newTierListItems.classList.add('tier-list-items');


    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);

    setUpDropZoneInTierListItem(newTierListItems);

    const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);

    // added am icon of remove ( cross )
    const removeTierList = document.createElement("i")
    removeTierList.setAttribute('class',"ri-delete-bin-5-line")
    newTierList.appendChild(removeTierList)

    // added am icon of EDIT ( PEN )
    const editTierList = document.createElement("i")
    editTierList.setAttribute('class',"ri-edit-2-line")
    newTierList.appendChild(editTierList)
    
    
    // different color generator for tier list
    RandomColorGenerator(newTierList)

    // edit function ( not able to do it)
    const iconsEdit = document.querySelector('.ri-edit-2-line')
    // edit function
    function editList(iconsEdit,textContainer){
        iconsEdit.addEventListener('click',(e)=>{
            console.log(textContainer.value)
            console.log(e)
        })
    }

    setUpEditRemove(textContainer)

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

function RandomColorGenerator(newTierList){
    const colorOne = Math.round(Math.random()*255)
    const colorTwo = Math.round(Math.random()*255)
    const colorThree = Math.round(Math.random()*255)
    const generatedColor = `rgb(${colorOne},${colorTwo},${colorThree})`
    newTierList.style.backgroundColor = generatedColor
}

// remove and edit 
    function setUpEditRemove(){
        // why here we cannot use class selector ?
        const iconsRemove = document.querySelectorAll('.ri-delete-bin-5-line')
        iconsRemove.forEach((e)=>{
            removeTierList(e)
        })
        // remove function
        function removeTierList(iconsRemove){
            iconsRemove.addEventListener("click",(event)=>{
                const tierList = event.target.parentNode
                tierList.remove()
            })      
        }
    }

