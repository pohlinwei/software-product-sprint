const parentDir = ''; // TODO: add link

fetch(parentDir + 'projects/projects.json')
    .then(response => response.json())
    .then(projectsJson => setupWorkSection(projectsJson))
    .catch(err => console.error(err));

/** 
 * Sets up featured works section by creating project elements, and
 * left- and right- buttons for navigation.
 */
function setupWorkSection(projectsJson) {
  const projectsHtml = setupProjects(projectsJson);
  const worksHtml = addNavButtons(projectsHtml);

  const projectsPlaceholder = document.getElementById('projects');
  ensureNonNull(projectsPlaceholder);
  projectsPlaceholder.innerHTML = worksHtml;

  displayFirstProj();
  setupProjectNav();
}

/** Creates string which is used to display all projects. */
function setupProjects(projectsJson) {
  const projects = toProjects(projectsJson);
  const projectDivs = projects.map(project => project.toDiv);
  const projectsHtml = projectDivs.map(projectDiv => projectDiv.outerHTML)
                          .join('');
  return projectsHtml;
}

/** 
 * Converts an array of projects that is represented as JSON objects to Projects. 
 * @return {Array<Project>}
 */
const toProjects = (projectsJson) => {
  return projectsJson.map(projectJson => toProject(projectJson));
}

/** 
 * Converts a JSON-represented project to Project. 
 * @return {Project}
 */
const toProject = (projectJson) => {
  const name = projectJson.name;
  const image = projectJson.image;
  const description = projectJson.description;
  const tools = projectJson.tools;
  const date = projectJson.date;
  const page = projectJson.page;
  return new Project(name, image, description, tools, date, page);
}

/**
 * Adds navigation buttons.
 * @return {string} This string is the complete HTML content required for the
 *    featured works section.
 */
function addNavButtons(projectsHtml) {
  const leftButton = '<div id="left-button" class="button">' + 
      '<i class="fas fa-chevron-circle-left fa-lg"></i></div>';
  const rightButton = '<div id="right-button" class="button">' + 
      '<i class="fas fa-chevron-circle-right fa-lg"></i></div>';
  
  return leftButton + projectsHtml + rightButton;
}

const displayFirstProj = () => {
  const projects = document.getElementsByClassName('project');
  ensureNonNull(projects);
  projects[0].style.display = 'flex';
}

/** 
 * Sets up the navigation of projects in the featured works section using
 * the left and right buttons.
 */
function setupProjectNav() {
  const leftButton = document.getElementById('left-button');
  ensureNonNull(leftButton);
  leftButton.onclick = () => moveToProj(false);

  const rightButton = document.getElementById('right-button');
  ensureNonNull(rightButton);
  rightButton.onclick = () => moveToProj(true);

  const projects = document.getElementsByClassName('project');
  ensureNonNull(projects);
  // @type {number} Indicates the index of the project that is currently shown.
  let projIndex= 0;

  /** 
   * Moves to the next project. If `moveBy` is negative, moves to the previous project;
   * otherwise, if `moveBy` is positive, moves to the next project.
   * 
   * @param {boolean} toLeft If `true`, moves left; otherwise moves right
   */
  function moveToProj(toLeft) { 
    const currProj = projects[projIndex];
    const moveBy = toLeft ? 1 : -1;
    projIndex = (moveBy + projects.length + projIndex) % projects.length;
    const nextProj = projects[projIndex];
  
    if (toLeft) {
      showNextProj(currProj, nextProj, Slider.LEFT.hide, Slider.LEFT.show);
    } else {
      showNextProj(currProj, nextProj, Slider.RIGHT.hide, Slider.RIGHT.show);
    }
  }

  const ANIMATION_DURATION_SEC = 1;
  /**
   * Indicates type of animation that is to be applied.
   * @enum {string}
   */
  const Slider = Object.freeze({
    // moves projects leftwards
    LEFT: {
      hide: `leftout ${ANIMATION_DURATION_SEC}s 1`,
      show: `rightin ${ANIMATION_DURATION_SEC}s 1`
    },
    // moves projects rightwards
    RIGHT: {
      hide: `rightout ${ANIMATION_DURATION_SEC}s 1`,
      show: `leftin ${ANIMATION_DURATION_SEC}s 1`
    }
  });

  function showNextProj(currProj, nextProj, animationCurr, animationNext) {
    currProj.style.animation = animationCurr;
    setTimeout(() => {
      changeDispAndAnimation(currProj, 'none', 'none');
      changeDispAndAnimation(nextProj, 'flex', animationNext);
    }, toMilliseconds(ANIMATION_DURATION_SEC) / 2);
  }

  const changeDispAndAnimation = (element, dispVal, animationVal) => {
    element.style.display = dispVal;
    element.style.animation = animationVal;
  }
}
