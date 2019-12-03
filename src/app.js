import './app.css'
import _ from 'lodash';
window.onload = function() {

  var storeSelect = document.querySelector('.store-select');
  var listingSelect = document.querySelector('.listing-select');

  listingSelect.onfocus = function(e) {
    storeSelect.value = '';
  }

  storeSelect.onfocus = function() {
    listingSelect.value = '';
  }

  var listingElements = ['apple', 'orange', 'banana', 'potato', 'tomatoe'];
  var storeElements = [];

  var tmpl = document.getElementById('listing-tmpl').innerHTML;
  var html = _.template(tmpl)({ items: listingElements });
  document.querySelector('.listing-select').innerHTML = html;

  function moveElement(element, from, to) {
    var elementPosition = from.indexOf(element);
    if (elementPosition > -1) {
      to.push(element);
      from.splice(elementPosition, 1);
    }
  }

  function updateUI() {
    storeSelect.innerHTML = '';
    listingSelect.innerHTML = '';

    for (var i = 0; i < listingElements.length; i++) {
      var newOption = document.createElement('option');
      newOption.innerText = listingElements[i];
      listingSelect.append(newOption);
    }

    for (var i = 0; i < storeElements.length; i++) {
      var newOption = document.createElement('option');
      newOption.innerText = storeElements[i];
      storeSelect.append(newOption);
    }
  }

  var addToStoreButton = document.querySelector('#add-to-store-button');
  var removeFromStoreButton = document.querySelector('#remove-from-store-button');

  addToStoreButton.onclick = function() {
    var selectedOptions = document.querySelectorAll('.listing-select option:checked');
    for (var i = 0; i < selectedOptions.length; i++) {
      moveElement(selectedOptions[i].innerText, listingElements, storeElements);
    }
    updateUI();
  }

  removeFromStoreButton.onclick = function() {
    var selectedOptions = document.querySelectorAll('.store-select option:checked');
    for (var i = 0; i < selectedOptions.length; i++) {
      moveElement(selectedOptions[i].innerText, storeElements, listingElements);
    }
    updateUI();
  }

  var deleteFromListingButton = document.querySelector('#delete-from-listing-button');
  var deleteFromStoreButton = document.querySelector('#delete-from-store-button');

  deleteFromListingButton.onclick = function() {
    var selectedOptions = document.querySelectorAll('.listing-select option:checked');
    for (var i = 0; i < selectedOptions.length; i++) {
      var elementPosition = listingElements.indexOf(selectedOptions[i].innerText);
      listingElements.splice(elementPosition, 1);
    }
    updateUI();
  }

  deleteFromStoreButton.onclick = function() {
    var selectedOptions = document.querySelectorAll('.store-select option:checked');
    for (var i = 0; i < selectedOptions.length; i++) {
      var elementPosition = storeElements.indexOf(selectedOptions[i].innerText);
      storeElements.splice(elementPosition, 1);
    }
    updateUI();
  }

  var clearListingButton = document.querySelector('#clear-listing-button');
  var clearStoreButton = document.querySelector('#clear-store-button');

  clearListingButton.onclick = function() {
    listingElements = [];
    updateUI();
  }

  clearStoreButton.onclick = function() {
    storeElements = [];
    updateUI();
  }

  var addToListingButton = document.querySelector('#add-to-listing-button');

  addToListingButton.onclick = function() {
    var newElement = prompt('What do you like to add to listing?');
    listingElements.push(newElement);
    updateUI();
  }

  var sortStoreButton = document.querySelector('#sort-store-button');

  sortStoreButton.onclick = function() {
    storeElements.sort();
    updateUI();
  }

}