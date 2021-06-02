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
            name: 'kévin Shop',
            author: 'kévin',
            path: 'team/kévin/index.html',
            iframe: true,
            visibleInMenu: true,
            isFont: true,
        }
    ]
}