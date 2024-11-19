/*
    Solution use the standard browser drag and drop API
    - Grab all the different items and set up event listeners on them
    - Grab all the different drop zones and set up event listeners on them
    - 
*/


// item being dragged
let draggedItem;

//Grab all items, for each item set up event listener
document.querySelectorAll('.item').forEach(setUpItem);

//Grab all drop zones, for each zone set up event listener
document.querySelectorAll('.drop-zone').forEach(droppedInZone);

export function setUpItem(item) {
    item.addEventListener('dragstart', onDragItem);
    item.addEventListener('dblclick', itemDoubleClicked);
 }
 
 export function droppedInZone(dropzone) {
    dropzone.addEventListener('drop', droppedOverDropZone);
    dropzone.addEventListener('dragover', dragOverDropZone);
 }
 
 // Make sure other functions like onDragItem, droppedOverDropZone, etc. are also exported if needed.
 export function onDragItem(event) {
    draggedItem = event.target;
 }
 
 export function droppedOverDropZone() {
    if (this !== draggedItem.parentNode) {
        this.appendChild(draggedItem);
    }
 }
 
 export function dragOverDropZone(event) {
    console.log('dragover fired');
    event.preventDefault();
   
 }
 
 export function itemDoubleClicked() {
    const unrankedZone = document.getElementById('unranked-drop-zone');
    if (unrankedZone !== this.parentNode) {
        unrankedZone.appendChild(this);
    }
 }