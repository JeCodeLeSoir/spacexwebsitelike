/*
  Author: JeCodeLeSoir 'Aurélien Lebreton'
*/

const ButtonSandWich = document.querySelector('.sandWich')
const NavigationBlock = document.querySelector('.navigation')

const ButtonSandWichOff = () => {
    NavigationBlock.classList.remove('open')
    ButtonSandWich.innerHTML = `<div></div><div></div><div></div>`
}

(() => {

   
    
    //Button Menu du site
    ButtonSandWich.addEventListener('click', (e) => {
        if (NavigationBlock.getAttribute('class').includes('open')) {
            ButtonSandWichOff();
        }
        else {
            NavigationBlock.classList.add('open')
            ButtonSandWich.innerHTML = "X"
        }
    })

    

    //Navigation Block
    const SetNavigationBlockHeight = () =>
        NavigationBlock.style.height
        = (window.screen.height - 48) + 'px'

    window.addEventListener('resize', SetNavigationBlockHeight)
    window.addEventListener('load', SetNavigationBlockHeight)

    const ButtonScrollTop = document.querySelector('.buttonScrollTop')
    var IsButtonScrollTopVisible = false;

    //check need button to scroll top
    window.addEventListener('scroll', () => {
        ButtonSandWichOff();
        if (window.scrollY > 88) {
            if (!IsButtonScrollTopVisible) {
                if (!ButtonScrollTop.getAttribute('class').includes('open')) {
                    ButtonScrollTop.classList.add('open')
                    IsButtonScrollTopVisible = true
                }
            }
        }
        else {
            if (IsButtonScrollTopVisible) {
                ButtonScrollTop.classList.remove('open')
                IsButtonScrollTopVisible = false
            }
        }
    })

    //Button click scroll navigat top
    ButtonScrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })

     
})()