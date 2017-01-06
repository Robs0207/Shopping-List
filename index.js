// single state object declaration
var state = {
    items: []
};

var groceryItemElement = (
    '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
    '<button class="shopping-item-toggle js-shopping-item-toggle">' +
    '<span class="js-crossOfList-button-label"></span>' +
    '</button>' +
    '<button class="shopping-item-delete js-shopping-item-delete">' +
    '<span class="button-label">Delete</span>' +
    '</button>' +
    '</div>' +
    '</li>');


// function to handle the events
$(function() {

    var formElement = $('#js-shopping-list-form');
    var listElement = $('.js-shopping-list');
    var newItemIdentifier = '#js-shopping-list-entry';
    var itemCrossOf = '.js-shopping-item-crossOf';

    handleAddItem(formElement, listElement, newItemIdentifier);
    handleCrossOfItem(listElement, itemCrossOf, state);
});

// event listeners
function handleAddItem(formElement, listElement, newItemIdentifier) {

    formElement.click(function(event) {
        event.preventDefault();

        var newItem = formElement.find(newItemIdentifier).val();

        if (document.getElementById('js-shopping-list-entry').value != '') {

            addItem(state, $('input').val());          // add new item to state object
            renderGroceryList(state, $(listElement));  // add new item element to HTML 
            this.reset(); // clear input
        }
    });
}

function handleCrossOfItem(listElement, itemCrossOf, state) {

    listElement.on('click', 'li', function(event) {

        if ($(event.target).text() === 'Delete') {                  // delete item
            
            var purged = state.items.splice(($(this).index()));
            this.remove();
        } 
        else {

            var itemIndex = ($(this).index());
            
            if (state.items[itemIndex].crossOfList === false) {
                state.items[itemIndex].crossOfList = true;         // cross of the list
            } 
            else {
                state.items[itemIndex].crossOfList = false;        // restore item to the list
            }

            renderGroceryList(state, $(listElement));
        }
    });
}

// state modification functions
var addItem = function(state, item) {
    state.items.push({
        groceryItem: item,  // input value from add item form
        crossOfList: false, // initialize var to keep track of state of item, i.e. still on list or crossed of
    });
};

// render functions
var renderGroceryList = function(state, element) {

    var itemsHTML = state.items.map(function(item, index) {
        return renderGroceryItem(item, index, groceryItemElement);
    });

    element.html(itemsHTML); // set HTML element

};

function renderGroceryItem(item, itemId, groceryItemElement) {

    var element = $(groceryItemElement); // element with item name and checked and delete buttons

    element.find('.js-shopping-item').text(item.groceryItem);


    if (item.crossOfList === false) {

        element.find('.js-crossOfList-button-label').text('Cross of List');
        element.find('.js-shopping-item').addClass('js-shopping-item-crossOfList');
    } else {

        element.find('.js-crossOfList-button-label').text('Restore to List');
        element.find('.js-shopping-item').addClass('shopping-item__checked');
    }

    return element;
};
