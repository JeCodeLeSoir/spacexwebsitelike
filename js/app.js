/*
  Author: JeCodeLeSoir 'Aurélien Lebreton'
*/
(() => {
    const delay = ms => new Promise(res => setTimeout(res, ms))

    const ButtonSandWich = document.querySelector('.sandWich')
    const NavigationBlock = document.querySelector('.navigation')
    const htmlRouter = document.querySelector('#router')
    const Loading = document.querySelector('.loading')

    //=============OU la il u à truc chelou dans se js ???
    const Xcode = "БнубнуϮДнрлЯтгурϮЈϷϮАзгмфгмугϮвЯмсϮлнмϮбнвгϼϮИгϮлгϮорҷсгмтгϮлнзϮбϵгстϮИгБнвгКгСнзрϮϯ"

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
                isFont: true,
            },
            {
                name: 'Shop',
                author: 'kévin',
                path: 'team/kévin/shop.html',
                iframe: true,
                visibleInMenu: true,
                isFont: true,
            },
            {
                name: 'Careers',
                author: 'kévin',
                path: 'team/kévin/careers.html',
                iframe: true,
                visibleInMenu: true,
                isFont: true,
            },
            {
                name: 'Goodies',
                author: 'kévin',
                path: 'team/kévin/goodies.html',
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
        await delay(1000)

        const html = await GetPage(url)
        htmlRouter.innerHTML = html
        htmlRouter.appendChild(footer);
        Loading.classList.remove('open')

        return html
    }

    const FindRouteByIframe = async (url, route) => {
        Loading.classList.add('open')
        const footer = await GetFooter(route)
        await delay(1000)

        htmlRouter.innerHTML = "";

        var _iframe = document.createElement('iframe')
        _iframe.setAttribute('scrolling', 'no')
        _iframe.src = url

        console.log(route)

        _iframe.addEventListener('load', () => {

            //Bonjour ceci est un bricolage avec une iframe pour afficher 
            //des jolis page avec un loading
            //Et sur tout qui évite des problème de css entre notre équipe :)

            var contentWindow = _iframe.contentWindow;
            var style = document.createElement('style')

            if (route.isFont) {
                style.innerText = ` 
                    @import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
                    * { font-family:'Russo One', sans-serif !important; box-sizing:border-box !important; font-size: 20px; }
                `}

            style.addEventListener('load', async () => {
                _iframe.style.height = contentWindow.document.body.offsetHeight - 20 + "px"
            })

            contentWindow.document.head.appendChild(style)
            contentWindow.addEventListener('resize', () => {
                _iframe.style.height = contentWindow.document.body.offsetHeight - 20 + "px"
            })

            htmlRouter.appendChild(footer);
            Loading.classList.remove('open')
        })
        htmlRouter.appendChild(_iframe);
    }

    //Encore un truc de Xcode Chépaquoi ??? mais c'est pour faire quoi se truc ???
    const mdpXcode = 974;

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

    //x ==> String, code ==> number, return ==> String
    const XcodeEncode = (x, code) => {
        var txt = "";
        for (var i = 0; i < x.length; i++) {
            txt += String.fromCharCode(x[i].charCodeAt(0) + code)
        }
        return txt
    }

    //x ==> String, code ==> number, return ==> String
    const XcodeDecode = (x, code) => {
        var txt = "";
        for (var i = 0; i < x.length; i++) {
            txt += String.fromCharCode(x[i].charCodeAt(0) - code)
        }
        return txt
    }
})()