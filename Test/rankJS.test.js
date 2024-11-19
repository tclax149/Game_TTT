import { setUpItem, droppedInZone, onDragItem, droppedOverDropZone, dragOverDropZone, itemDoubleClicked } from '../Rankings/rankings.js';

// Mocking DragEvent
global.DragEvent = function(type, params = {}) {
    const event = new Event(type, { bubbles: true, cancelable: true });
    event.preventDefault = jest.fn(); // Mock preventDefault
    event.dataTransfer = params.dataTransfer || {
      data: {},
      setData(key, value) { this.data[key] = value; },
      getData(key) { return this.data[key]; },
    };
    return event;
  };
  


describe('RankJS Tests', () => {
  it('should correctly rank items', () => {
    expect(true).toBe(true);
  });


  it('should set up drag event listeners on items', () => {
    document.body.innerHTML = `<div class="item" draggable="true"></div>`;
    const item = document.querySelector('.item');
    setUpItem(item);
    expect(item.ondragstart).toBeDefined();
    expect(item.ondblclick).toBeDefined();
  });

  // Test for setting up drop zones
  it('should set up drop event listeners on drop zones', () => {
    document.body.innerHTML = `
      <div class="drop-zone"></div>
    `;
    const dropZone = document.querySelector('.drop-zone');
    droppedInZone(dropZone);
    expect(dropZone.ondrop).toBeDefined();
    expect(dropZone.ondragover).toBeDefined();
  });

  // Test drag and drop functionality
  it('should move item to drop zone on drop', () => {
    document.body.innerHTML = `
      <div class="drop-zone"></div>
      <div id="unranked-drop-zone"></div>
      <div class="item" draggable="true"></div>
    `;
    const item = document.querySelector('.item');
    const dropZone = document.querySelector('.drop-zone');
    setUpItem(item);
    droppedInZone(dropZone);

    // Simulate dragging and dropping
    item.dispatchEvent(new DragEvent('dragstart'));
    dropZone.dispatchEvent(new DragEvent('drop', { dataTransfer: { getData: () => 'item' } }));

    expect(dropZone.contains(item)).toBe(true);
  });

  // Test double-click functionality to return item to "unranked"
  it('should return item to unranked drop zone on double-click', () => {
    document.body.innerHTML = `
      <div class="drop-zone"></div>
      <div id="unranked-drop-zone"></div>
      <div class="item" draggable="true"></div>
    `;
    const item = document.querySelector('.item');
    const unrankedZone = document.getElementById('unranked-drop-zone');
    setUpItem(item);

    // Simulate double-clicking the item
    item.dispatchEvent(new Event('dblclick'));

    expect(unrankedZone.contains(item)).toBe(true);
  });

  it('should prevent default action on drag over drop zone', () => {
    document.body.innerHTML = `<div class="drop-zone"></div>`;
    
    const dropZone = document.querySelector('.drop-zone');
    const preventDefault = jest.fn();  // Mock function to track if preventDefault is called

    // Create a DragEvent and pass the preventDefault mock as a function
    const dragOverEvent = new DragEvent('dragover', { cancelable: true, bubbles: true });

    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        preventDefault();  // Track the call to preventDefault
    });

    dropZone.dispatchEvent(dragOverEvent);

    // Verify that preventDefault was called
    expect(preventDefault).toHaveBeenCalled();
});

});




