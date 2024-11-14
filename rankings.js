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

// adding event listener to item
function setUpItem(item){
   item.addEventListener('dragstart', onDragItem);
   item.addEventListener('dblclick', itemDoubleClicked);
}

// adding event listener to dropzone 
function droppedInZone(dropzone){
   dropzone.addEventListener('drop', droppedOverDropZone);
   dropzone.addEventListener('dragover', dragOverDropZone);
}

//keeping track of item being dragged
function onDragItem(event) {
   draggedItem = event.target;
}


function droppedOverDropZone(){
   // if this zone is not the parent of the dragged item, it was not in the drop zone
   if (this !== draggedItem.parentNode) {
       // add item to drop zone
       this.appendChild(draggedItem);
   }
}


function dragOverDropZone(event){
   // allows us to drop an item, prevents browser natural defualt that doesnt 
   event.preventDefault();

}

// return item to unranked section
function itemDoubleClicked(){
   const unrankedZone = document.getElementById('unranked-drop-zone');
   if (unrankedZone !== this.parentNode){
       unrankedZone.appendChild(this);
   }
}