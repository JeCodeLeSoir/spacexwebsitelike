/*
  Author: JeCodeLeSoir 'Aurélien Lebreton'
*/
(() => {

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

    const DrawByFetch = async (url) => {
        Loading.classList.add('open')
        const footer = await GetFooter()
        await delay(100)

        var html = await GetPage(url)

        var script;
        if(html.indexOf("====Script") != -1){
            var data = html.split("====Script")
            html = data[0]
            script = data[1];
        }
        
        htmlRouter.innerHTML = html
        htmlRouter.appendChild(footer);
        Loading.classList.remove('open')

        new Function(script)();

        return html
    }

    const DrawByIframe = async (url, route) => {
        Loading.classList.add('open')
        const footer = await GetFooter(route)
        await delay(100)

        htmlRouter.innerHTML = "";

        var _iframe = document.createElement('iframe')
        _iframe.setAttribute('scrolling', 'no')
        _iframe.src = url

        _iframe.addEventListener('load', () => {

            //Ceci est un bricolage avec une iframe pour afficher 
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
                        -webkit-tap-highlight-color: transparent;  
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

            const SetHeightIfram = () => _iframe.style.height = contentWindow.document.body.offsetHeight - 20 + "px"

            style.addEventListener('load', SetHeightIfram)
            contentWindow.document.head.appendChild(style)


            contentWindow.addEventListener('resize', SetHeightIfram)
            contentWindow.document.fonts.onloadingdone = SetHeightIfram

            htmlRouter.appendChild(footer);
            Loading.classList.remove('open')
        })

        htmlRouter.appendChild(_iframe);
    }

    const SelectecDrawingPage = (route) => {
        if (route.iframe) {
            DrawByIframe(route.path, route)
        }
        else {
            DrawByFetch(route.path);
        }
    }

    //Writ And Read Query Url
    const QueryUrl = () => {
        const href = decodeURI(window.location.href)
        const url =  href.indexOf('?') !== -1 ? href.split('?')[0] : href
        return {
            params: [],
            get() {
                if (href.indexOf('?') !== -1) {
                    Arraydata = {}
                    href.split('?')[1].split('&').forEach((e) => {
                        var params = e.indexOf('=') !== -1 ? e.split('=') : [e, null]
                        Arraydata[params[0]] = { key: params[0], value: params[1] }
                    })
                    return Arraydata
                } else {
                    return []
                }
            },
            set(key, value) {
               this.params.push({key:key, value:value})
            },
            goto() {
                var location = url + (this.params.length > 0 ? '?' : '');
                for(var i = 0; i<this.params.length; i++){
                    var data = this.params[i];
                    location += (data.key + "=" + data.value) 
                    + (i!== this.params.length-1 ? "&" : "");
                }
                console.log(location)
                window.location = location
            }
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

                var Query = QueryUrl()

                Query.set('page', element_menu.name)
                Query.goto()

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            })

            NavigationBlock.appendChild(element_li)
        })
    })

    //load page by link paramatre index.html?NamePage
    window.addEventListener('load', () => {

        var Query = QueryUrl().get()

        if (Query.page) {

            var isFind = false

            for (var i = 0; i < Router.pages.length; i++) {
                route = Router.pages[i]
                if (Query.page.value === route.name) {
                    SelectecDrawingPage(route)
                    isFind = true;
                    break;
                }
            }
            if (!isFind) {
                DrawByFetch(Router.notFound)
            }
        }
        else {
            DrawByFetch(Router.default)
        }
    })

})()