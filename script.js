const tierInput = document.getElementById('tier');

const submitBtn = document.getElementById('submit');

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

    const heading = document.createElement('h1');
    heading.textContent = tierListName;

    const newTierListItems = document.createElement('div');
    newTierListItems.classList.add('tier-list-items');


    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);


    const tierSection = document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);
}