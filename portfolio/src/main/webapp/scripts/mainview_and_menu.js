/** 
 * Shows or hides main view.
 * @param {boolean} shouldShow if true, main view will be shown; otherwise, it will be hidden
 */
const showMainView = (shouldShow) => {
  const mainViews = document.getElementsByClassName('main-view');
  const dropdownMenu = document.getElementById('dropdown-menu');
  ensureNonNull(mainViews, dropdownMenu);

  const mainViewDisplay = shouldShow ? 'flex' : 'none';

  for (let mainView of mainViews) {
    mainView.style.display = mainViewDisplay;
  }

  if (shouldShow) {
    dropdownMenu.classList.replace('show-menu', 'hide-menu');   
  } else {
    dropdownMenu.classList.replace('hide-menu', 'show-menu');
  }
}

/**
 * Adds listener to dropdown menu, elements that belong to main view 
 * and elements in the dropdown menu to enable the user to toggle between them. 
 * To view the dropdown menu, the user has to click on the menu icon.
 * To view the main view after opening the dropdown, the user has to click close
 * or select an element in the dropdown menu.
 */
const setupToggleMainAndMenu = () => {
  const closeButton = document.getElementById('close-button');
  ensureNonNull(closeButton);
  closeButton.onclick = () => showMainView(true);

  const menuIcon = document.getElementById('menu-icon'); 
  ensureNonNull(menuIcon);
  menuIcon.onclick = () => showMainView(false);

  const dropdownMenuContent = document.getElementById('dropdown-menu-content');
  ensureNonNull(dropdownMenuContent);
  
  const dropdownElements = dropdownMenuContent.children;
  for (let dropdownElement of dropdownElements) {
    dropdownElement.onclick = () => showMainView(true);
  }
}

setupToggleMainAndMenu();
