//=== Router
//Config

//exemple add pages
/*
  pages -->
  {
      name: 'exemple',
      author: 'author',
      path: 'url',
      iframe: true, //is ifram
      visibleInMenu: true, //is visible
      isFont: false, //is active font
  }
*/

const Router = {
  notFound: 'pages/404.html',
  default: 'pages/home.html',
  route: '/',
  footer: 'pages/footer.html',

  pages: [{
      name: 'home',
      path: 'pages/home.html',
      visibleInMenu: true,
    },
    {
      name: 'Gallery Photo',
      path: 'pages/galeryphoto.html',
      visibleInMenu: true,
    },
    {
      name: 'Falcon 9',
      author: 'Pierre',
      path: 'team/loupy/index.html',
      iframe: true,
      visibleInMenu: true,
      isFont: false,
    },
    {
      name: 'Shop',
      author: 'Kévin',
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
      author: 'Kévin',
      path: 'team/kévin/goodies.html',
      iframe: true,
      visibleInMenu: true,
      isFont: true,
    },
    {
      name: 'Payment',
      author: 'Kévin',
      path: 'team/kévin/payment.html',
      iframe: true,
      visibleInMenu: true,
      isFont: true,
    },
    {
      name: 'About',
      author: 'Kévin',
      path: 'team/kévin/about.html',
      iframe: true,
      visibleInMenu: true,
      isFont: true,
    }
  ]
};