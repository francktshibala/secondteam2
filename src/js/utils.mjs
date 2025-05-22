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

// New function to render a single template (for header/footer)
export function renderWithTemplate(template, parentElement, data, callback) {
  try {
    if (!parentElement) {
      console.error("Parent element is null or undefined");
      return;
    }
    
    // Insert the template into the parent element
    parentElement.innerHTML = template;
    
    // If a callback was provided, call it with the data
    if (callback) {
      callback(data);
    }
  } catch (error) {
    console.error("Error in renderWithTemplate:", error);
  }
}

// New function to load an HTML template from a path
export async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const template = await response.text();
    return template;
  } catch (error) {
    console.error(`Error loading template from ${path}:`, error);
    return "";
  }
}

// New function to load and render the header and footer
export async function loadHeaderFooter() {
  try {
    // Load the header template
    const headerTemplate = await loadTemplate("/partials/header.html");
    // Get the header element
    const headerElement = document.getElementById("main-header");
    // Render the header
    renderWithTemplate(headerTemplate, headerElement);
    
    // Load the footer template
    const footerTemplate = await loadTemplate("/partials/footer.html");
    // Get the footer element
    const footerElement = document.getElementById("main-footer");
    // Render the footer
    renderWithTemplate(footerTemplate, footerElement);
    
    // Initialize the cart count after the header is loaded
    // (requires CartCount.mjs to be imported in the main script)
    const event = new CustomEvent("headerfooterloaded");
    document.dispatchEvent(event);
  } catch (error) {
    console.error("Error loading header and footer:", error);
  }
}