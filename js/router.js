/*
  Author: JeCodeLeSoir 'Aurélien Lebreton'
*/
(()=>{

    const delay = ms => new Promise(res => setTimeout(res, ms))
    const htmlRouter = document.querySelector('#router')
    const Loading = document.querySelector('.loading')
    const NavigationBlock = document.querySelector('.navigation')
    
    const GetPage = async (url) => {
        const getPagebyFetch = await fetch(url)
        const html = await getPagebyFetch.text()

        return html
    }

    const GetFooter = async (route) => {
        var footer_html = await GetPage(Router.footer)
        var footer = document.createElement('div')
        
        if (route === undefined) {
            footer_html = footer_html.replace("{{Author}}", "Aurélien")
        }
        else {
            footer_html = footer_html.replace("{{Author}}", route.author)
        }
        
        footer.innerHTML = footer_html
        footer.classList.add('footer')

        return footer
    }


    const FindRoute = async (url) => {
        Loading.classList.add('open')
        const footer = await GetFooter()
        await delay(100)

        const html = await GetPage(url)
        htmlRouter.innerHTML = html
        htmlRouter.appendChild(footer);
        Loading.classList.remove('open')

        return html
    }

    const FindRouteByIframe = async (url, route) => {
        Loading.classList.add('open')
        const footer = await GetFooter(route)
        await delay(100)

        htmlRouter.innerHTML = "";

        var _iframe = document.createElement('iframe')
        _iframe.setAttribute('scrolling', 'no')
        _iframe.src = url

        _iframe.addEventListener('load', () => {

            //Bonjour ceci est un bricolage avec une iframe pour afficher 
            //des jolis page avec un loading
            //Et sur tout qui évite des problème de css entre notre équipe :)

            var contentWindow = _iframe.contentWindow;
            var style = document.createElement('style')

            if (route.isFont) {
                style.innerText = ` 
                    @import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
                    * { 
                        font-family:'Russo One', sans-serif !important; 
                        box-sizing:border-box !important; 
                        font-size: 20px; 
                    }

                    h1, h2, h3, h4, h5, h6{
                        font-family: var(--Base-Font-family);
                        font-size: 25px;
                    }

                    @media screen and (min-width: 800px) {
                        h1, h2, h3, h4, h5, h6{
                            font-size: 35px !important;
                        }
                    }
                `
            }

            style.addEventListener('load', async () => {
                _iframe.style.height = contentWindow.document.body.offsetHeight - 20 + "px"
            })

            contentWindow.document.head.appendChild(style)
            contentWindow.addEventListener('resize', () => {
                _iframe.style.height = contentWindow.document.body.offsetHeight - 20 + "px"
            })

            contentWindow.document.fonts.onloadingdone = function (fontFaceSetEvent) {
                _iframe.style.height = contentWindow.document.body.offsetHeight - 20 + "px"
            }

            htmlRouter.appendChild(footer);
            Loading.classList.remove('open')
        })

        htmlRouter.appendChild(_iframe);
    }

    const FindPage = (route)=>{
        if (route.iframe) {
            FindRouteByIframe(route.path, route)
        }
        else {
            FindRoute(route.path);
        }
    }

    //Add button in block Navigation
    window.addEventListener('load', async () => {
        Router.pages.forEach((element_menu) => {
            const element_li = document.createElement('li')
            const element_a = document.createElement('a')
            element_a.innerText = element_menu.name.toUpperCase();
            element_li.appendChild(element_a)
            element_a.addEventListener('click', () => {
                ButtonSandWichOff();

                var defaults = window.location.href
                if(defaults.indexOf('?') !== -1){
                    defaults = decodeURI(defaults.split('?')[0])
                }

                window.location = defaults + "?" + element_menu.name

                //FindPage(element_menu)

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            })
            NavigationBlock.appendChild(element_li)
        })
    })

    //load page by link paramatre index.html?NamePage

    window.addEventListener('load', ()=> {
        if(window.location.href.indexOf('?') !== -1){
            var name = decodeURI(window.location.href.split('?')[1])
            
            if(name.indexOf('&') !==-1){
                name = name.split('&')[0]
                console.log(name)
            }
            
            var isFind = false
            for(var i = 0; i< Router.pages.length; i++){
                route = Router.pages[i]
                if(name === route.name){
                    FindPage(route)
                    isFind = true;
                    break;
                }
            }
            if(!isFind){
                FindRoute(Router.notFound)
            }
        }
        else{
            FindRoute(Router.default)
        }
    })

})()