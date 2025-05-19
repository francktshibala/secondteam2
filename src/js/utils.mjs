// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      console.log(`No data found in localStorage for key: ${key}`);
      return null;
    }
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error getting data from localStorage (key: ${key}):`, error);
    return null;
  }
}

// save data to local storage
export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Data saved to localStorage (key: ${key}):`, data);
  } catch (error) {
    console.error(`Error saving data to localStorage (key: ${key}):`, error);
  }
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  try {
    const element = qs(selector);
    if (!element) {
      console.warn(`Element not found: ${selector}`);
      return;
    }
    
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  } catch (error) {
    console.error(`Error setting click listener on ${selector}:`, error);
  }
}

export function getParam(param) {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get(param);
    console.log(`URL parameter ${param}:`, value);
    return value;
  } catch (error) {
    console.error(`Error getting URL parameter ${param}:`, error);
    return null;
  }
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  try {
    if (!parentElement) {
      console.error("Parent element is null or undefined");
      return;
    }
    
    if (!list || !Array.isArray(list)) {
      console.error("List is null, undefined, or not an array:", list);
      return;
    }
    
    console.log(`Rendering list of ${list.length} items`);
    
    const htmlStrings = list.map(item => {
      try {
        return template(item);
      } catch (e) {
        console.error("Error rendering template for item:", item, e);
        return "";
      }
    });
    
    if (clear) {
      parentElement.innerHTML = "";
    }
    
    parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
    console.log("List rendering complete");
  } catch (error) {
    console.error("Error in renderListWithTemplate:", error);
  }
}