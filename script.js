let currentDraggedItem;

const tierInput = document.getElementById('tier');

const itemContainers = document.getElementsByClassName('item-container');

// const tierLists = document.querySelectorAll('.tier-list');
let data = JSON.parse(sessionStorage.getItem('tierList')) || {tierListData :[] ,nonTierDataList: []}
const {tierListData,nonTierDataList}= data
if(tierListData){
    tierListData.forEach(item=>{
   
        createTierList(item.heading,item.images)
   
    })
  
}
 
  if(nonTierDataList){
    nonTierDataList.forEach(item=>{
        createTierListItem(item)
    })
   
  }
console.log(nonTierDataList,"nonnnnnn")

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

function createTierList(tierListName,imgUrlarr) {
    const newTierList = document.createElement('div');

    newTierList.classList.add('tier-list');

    const heading = document.createElement('div'); // Try to randomly assign color to this heading
    heading.classList.add('heading');
   const ColorClass =Math.round(Math.random()*10)
   console.log(ColorClass)
   heading.classList.add(`color${ColorClass}`)

    const textContainer = document.createElement('div');
    textContainer.textContent = tierListName;

    heading.appendChild(textContainer);
    heading.setAttribute('contenteditable', 'true'); 
    const newTierListItems = document.createElement('div');
    newTierListItems.classList.add('tier-list-items');
    if(imgUrlarr){
        imgUrlarr.forEach((imgUrl)=>{
            const img = document.createElement('img');
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('item-container')
            img.src = imgUrl;
            imgContainer.appendChild(img)
            newTierListItems.appendChild(imgContainer);
        })
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn')
    deleteBtn.textContent='Delete'
    

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);
    newTierList.appendChild(deleteBtn)

    setUpDropZoneInTierListItem(newTierListItems);

    const tierSection = document.getElementById('tier-list-section');
   
    
    tierSection.appendChild(newTierList);
    deleteBtn.addEventListener('click', (e)=>{
        console.log(e.target.parentNode)
        const removeItem = e.target.parentNode;
        tierSection.removeChild(removeItem)
        saveToLoaclStorage();
    })
     saveToLoaclStorage();
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
    saveToLoaclStorage();

}

function setUpItemContainerForDrag(itemContainer) {
    itemContainer.addEventListener('dragstart', (event) => {
        console.log(event)
        currentDraggedItem = event.target.parentNode;
        console.log("draggg start")
    });

    itemContainer.addEventListener('dblclick', (event) => {
        const parentNode = event.target.parentNode;
        const nonTierSection = document.getElementById('non-tier-section');
        nonTierSection.appendChild(parentNode);
        saveToLoaclStorage();
    });
  
}

function setUpDropZoneInTierListItem(tierListItem) {
    tierListItem.addEventListener('drop', (event) => {
        event.preventDefault(); // stops the default behaviour of the event which is to not allow drop
        console.log("dropp")
    });

    tierListItem.addEventListener('dragover', function (event) {
        // console.log(event.target);
        // event.target.appendChild(currentDraggedItem);
        // console.log("event coming up", event);
        if(this !== currentDraggedItem.parentNode) {
            this.appendChild(currentDraggedItem);
            saveToLoaclStorage();
        }

    });
   
}

function saveToLoaclStorage (){
    const tierLists = document.querySelectorAll('.tier-list');
    const tierListData = [];

    tierLists.forEach((item)=>{
      const heading = item.querySelector('.heading').textContent;
      console.log(heading);
      const ItemImg = item.querySelectorAll('img')
   
      const images=[]
      if(ItemImg){
        ItemImg.forEach(item=>{
            images.push(item.src)
        })
   
      }
      tierListData.push({heading, images})
    })

    const nonTierDataList = [];
    nontierSection = document.getElementById("non-tier-section")
    nontierSection.querySelectorAll('.item-container img').forEach((img)=>{
        nonTierDataList.push(img.src)
        console.log(img)
    });
    console.log(nonTierDataList,"are nontierlist")
  
    sessionStorage.setItem('tierList',JSON.stringify({tierListData,nonTierDataList}))
    // sessionStorage.setItem('nontierList',JSON.stringify(nonTierDataList))


}
