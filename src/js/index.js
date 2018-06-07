const active        = 'active';
const active_like   = 'active-like';
const active_unlike = 'active-unlike';

window.addEventListener('load', (event) => {
  const cursor    = document.getElementById('cursor');
  const ol_legend = document.getElementById('control-wrapper__list');
        ol_legend.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI' &&
                event.target.classList[0] !== active) {
                let active_element = findActiveElement('li');
                                     removeActiveClass(active_element, active);
                                     addClassToElement(event.target, active);
                cursor.style.top = `${setPositionCursor(event.target)}px`;
            } else return false;
        });

  const list_questions = Array.from(document.getElementsByClassName('list-accordion_item__question'));
        list_questions.forEach((element) => {
            element.addEventListener('click', (event) => {
                console.log(event.target.parentNode.classList[1]);
                if (event.target.parentNode.classList[1] === active) {
                  removeActiveClass(event.target.parentNode, active);
                } else {
                  let active_element = findActiveElement('div');
                  if (active_element !== null) removeActiveClass(active_element, active);
                  addClassToElement(event.target.parentNode, active);
                }

            });
        });

    const like_items   = Array.from(document.getElementsByClassName('list-accordion_item_wrapper_helpful_control__like'));
    const unlike_items = Array.from(document.getElementsByClassName('list-accordion_item_wrapper_helpful_control__unlike'));

    like_items.forEach((element) => {
       element.addEventListener('click', (event) => {
            let finger = event.target;
            resetLikeUnlike(finger.parentNode.childNodes[1]);
            if (event.target.classList[1] !== active_like) addClassToElement(finger, active_like);
            else event.target.classList.remove(active_like);
       });
    });

    unlike_items.forEach((element) => {
       element.addEventListener('click', (event) => {
            let finger = event.target;
            resetLikeUnlike(finger.parentNode.childNodes[3]);
            if (event.target.classList[1] !== active_unlike) addClassToElement(finger, active_unlike);
            else event.target.classList.remove(active_unlike);
       });
    });
});

function addClassToElement(element, className) {
  element.classList.add(className);
}

function findActiveElement(tagName) {
  return document.querySelector(`${tagName}.active`);
}

function removeActiveClass(element, className) {
  element.classList.remove(className);
}

function setPositionCursor(element) {
  return event.target.offsetTop - 2;
}

function resetLikeUnlike(element) {
  console.log(element);
  switch (element.classList[1]) {
    case active_like:
      removeActiveClass(element, active_like);
      break;
    case active_unlike:
      removeActiveClass(element, active_unlike);
      break;
    default:
      return false;
  }
}
