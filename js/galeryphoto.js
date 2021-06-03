const galeryphoto = () => {
    console.log("galeryphoto")

    const Photos = document.querySelectorAll('.photo')

    console.log(Photos)

    const Fullscreen = document.querySelector('.fullscreen')
    
    Photos.forEach((photo)=>{

        console.log(photo)

        photo.addEventListener('click', ()=>{
           var divphoto = document.createElement('div')
           var img_photo = document.createElement('img')

           img_photo.src = photo.src;

           divphoto.appendChild(img_photo)

           Fullscreen.innerHTML = divphoto.innerHTML
           Fullscreen.style.zIndex = 999;
        })

    })

    Fullscreen.addEventListener('click', ()=>{
        Fullscreen.style.zIndex = -1;
        Fullscreen.innerHTML = ""
    })
}