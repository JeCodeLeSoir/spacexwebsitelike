/*
  Author: JeCodeLeSoir 'Aurélien Lebreton'
*/
(() => {
    const delay = ms => new Promise(res => setTimeout(res, ms))

    const ButtonSandWich = document.querySelector('.sandWich')
    const NavigationBlock = document.querySelector('.navigation')
    const htmlRouter = document.querySelector('#router')

    //=== Router
    //Config
    const Router = {
        default: 'pages/home.html',
        route: '/',
        footer: 'pages/footer.html',
        pages: [
            {
                name: 'home',
                path: 'pages/home.html',
                visibleInMenu: true,
            },
            {
                name: 'Galery Photo',
                path: 'pages/galeryphoto.html',
                visibleInMenu: true,
            },
            {
                name: 'Loupy Falcon 9',
                author: 'Pierre',
                path: 'team/loupy/index.html',
                iframe: true,
                visibleInMenu: true,
                isFont: false,
            },
            {
                name: 'kévin Shop',
                author: 'kévin',
                path: 'team/kévin/index.html',
                iframe: true,
                visibleInMenu: true,
                isFont: true,
            }
        ]
    }

    const GetPage = async (url) => {
        const getPagebyFetch = await fetch(url)
        const html = await getPagebyFetch.text()

        return html
    }

    var footer = undefined;

    const Loading = async (route) => {
        var footer_html = await GetPage(Router.footer)
        
        footer = document.createElement('div')

        if (route === undefined) {
            footer_html = footer_html.replace("{{Author}}", "Aurélien")
        }
        else {
            footer_html = footer_html.replace("{{Author}}", route.author)
        }

        footer.innerHTML = footer_html
        footer.classList.add('footer')


        htmlRouter.innerHTML = '<div class="loading"><span>🚀</span></div>'
        htmlRouter.appendChild(footer)
    }

    const FindRoute = async (url) => {
        await Loading()
        await delay(2000)

        const html = await GetPage(url)
        htmlRouter.innerHTML = html
        htmlRouter.appendChild(footer);
        return html
    }

    const FindRouteByIframe = async (url, route) => {

        await Loading(route)
        await delay(2000)

        htmlRouter.innerHTML = "";

        var _iframe = document.createElement('iframe')
        _iframe.setAttribute('scrolling', 'no')
        _iframe.src = url

        console.log(route)
        _iframe.addEventListener('load', () => {
            
            var contentWindow = _iframe.contentWindow;
            var style = document.createElement('style')

            console.log(route.isFont)
            if(route.isFont !== undefined)
               if(route.isFont)
                    style.innerText = ` 
                    @font-face {
                        font-family: 'Odibee Sans';
                        src: url(https://fonts.gstatic.com/s/odibeesans/v4/neIPzCSooYAho6WvjeToRbk1cJDfq3se.woff2) format('woff2');
                    }
                    *{ font-family:'Odibee Sans'; box-sizing:border-box; }
                `

            style.addEventListener('load', async () => {
                _iframe.style.height = contentWindow.document.body.offsetHeight - 20 + "px"
            })
            contentWindow.document.head.appendChild(style)
            contentWindow.addEventListener('resize', () => {
                _iframe.style.height = contentWindow.document.body.offsetHeight - 20 + "px"
            })

            htmlRouter.appendChild(footer);
        })

        htmlRouter.appendChild(_iframe);
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

                if (element_menu.iframe) {
                    FindRouteByIframe(element_menu.path, element_menu)
                }
                else {
                    FindRoute(element_menu.path);
                }

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            })
            NavigationBlock.appendChild(element_li)
        })
    })
    window.addEventListener('load', FindRoute(Router.default))

    //=== Menu
    window.addEventListener('resize', () => {

    })

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

    const ButtonSandWichOff = () => {
        NavigationBlock.classList.remove('open')
        ButtonSandWich.innerHTML = `<div></div><div></div><div></div>`
    }

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