// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** 
 * FUNCTIONS 
 */

/* NAV */
const mainViews = document.getElementsByClassName('main-view');
const dropdownMenu = document.getElementById('dropdown-menu');

// hide dropdown menu and show main view elements
const hideMenuShowMain = () => {
  dropdownMenu.style.display = 'none';
  for (let mainView of mainViews) {
    mainView.style.display = 'flex';
  }
}

// hide main view elements and display dropdown menu
const hideMainShowMenu = () => {
  for (let mainView of mainViews) {
   mainView.style.display = 'none';
  }
  dropdownMenu.style.display = 'block';
}

/* HOME */
const actions = document.getElementsByClassName('action');
// indicates the action which is currently shown
let currAction = 0;
// animates actions by displaying them like a slideshow
const actionsAnimate = () => {
  const nextAction = (currAction + 1) % actions.length;
  // make current invisible
  actions[currAction].style.display = 'none';
  // show next
  actions[nextAction].style.display = 'inline';
  currAction = nextAction;
}

/**
 * LOADING/SETUP DYNAMIC ELEMENTS
 */
/* HOME */
// animate action verbs
window.setInterval(actionsAnimate, 2000);

/**
 * ADD EVENT LISTENERS
 */

/* NAV */
const menuIcon = document.getElementById('menu-icon');
menuIcon.onclick = hideMainShowMenu;

const closeButton = document.getElementById('close-button');
closeButton.onclick = hideMenuShowMain;

const dropdownMenuContent = document.getElementById('dropdown-menu-content').children;
for (let dropdownElement of dropdownMenuContent) {
  // hide dropdown menu and redirect user to relevant section
  dropdownElement.onclick = hideMenuShowMain;
}
