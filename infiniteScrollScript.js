const imageContainer = document.getElementById('image-container');
const loader= document.getElementById('loader');

let photosArray=[];
let ready =false; 
let imagesLoaded=0;
let totalImages=0; 

// unsplash API 

const count= 30; 
const apiKey= 'NL4Y3T9Dq7L2SZwlivG7kBHpfgXOMlImPxIJOtCRoEE';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded 

function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;

    if(imagesLoaded===totalImages) {
        ready= true;
        loader.hidden=true;
        console.log('ready=', ready);
    }
}

// Helper Function to Set Attributes on DOM Elements 

function setAttributes(element, attributes) {

    for (const key in attributes) 
    {
        element.setAttribute(key, attributes[key])
    }
}
//Create Elements for Links & Photos to DOM  

function displayPhotos() {
totalImages=photosArray.length; 
console.log('total images', totalImages);
//Run Function  fro each obkect in photoArray 
photosArray.forEach((photo) => {
 
    // Create <a>  to link to Unsplash  
    const item= document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank'); 

  setAttributes(item, {
      href: photo.links.html,  
      target: '_blank ', 

  });


    //Create  <img> for Photo 

    const img =document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);

  setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description, 
  });
  img.addEventListener('load', imageLoaded);


    item.appendChild(img);
    imageContainer.appendChild(item);

});
}

//Event listener, check when each is finished loading 

 

// Ger photos from Unsplash APi  

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
         photosArray = await response.json();
        displayPhotos();
    }
    catch (error) {
        // catch error here
    }
}
// check to see if scrolling near bottom of page, load more photos 

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        getPhotos();
        // console.log('window.innerHeight:', window.innerHeight);
        // console.log('window.scrollY:', window.scrollY);
        // console.log('window.innerHeight + scrollY:', window.scrollY +window.innerHeight);
        // console.log('document.body.offsetHeight -1000:', document.body.offsetHeight - 1000);
        console.log('load more');
    }
});


//on load  
getPhotos();
