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

 /**
  * ADD EVENT LISTENERS
  */

/* NAV */
const menuIcon = document.getElementById('menu-icon');
// hide main view elements and display dropdown menu
menuIcon.onclick = () => {
  for (let mainView of mainViews) {
   mainView.style.display = 'none';
  }
  dropdownMenu.style.display = 'block';
}

const closeButton = document.getElementById('close-button');
// hide dropdown menu and show main view
closeButton.onclick = hideMenuShowMain;

const dropdownMenuContent = document.getElementById('dropdown-menu-content').children;
for (let dropdownElement of dropdownMenuContent) {
  // hide dropdown menu and redirect user to relevant section
  dropdownElement.onclick = hideMenuShowMain;
}
