Package.describe({
  name: 'scydev:reaction-p2p-marketplace',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Some basic shop extensions.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  // meteor base packages
  api.use("standard-minifiers");
  api.use("mobile-experience");
  api.use("meteor-base");
  api.use("mongo");
  api.use("blaze-html-templates");
  api.use("session");
  api.use("jquery");
  api.use("tracker");
  api.use("logging");
  api.use("reload");
  api.use("random");
  api.use("ejson");
  api.use("spacebars");
  api.use("check");

  api.use('ecmascript');
  api.use('templating');
  api.use("less");
  api.use("reactioncommerce:core@0.10.0");
  api.use("reactive-var");

  api.use("utilities:spin");
  api.use("scydev:reaction-search@0.0.2");

  api.use("aldeed:template-extension");


  api.addFiles("common/collections/collectionFS.js", ["client", "server"]);
  api.addFiles("common/schemas/schemas.js", ["client", "server"]);

  api.addFiles('reaction-p2p-marketplace.js');

  api.addFiles("server/register.js", ["server"]);
  api.addFiles("server/security.js", ["server"]);

  api.addFiles("server/methods/accounts.js", "server");
  api.addFiles("server/methods/cart.js", ["server"]);
  api.addFiles("server/methods/checkout.js", ["server"]);

  api.addFiles("server/publications/pub-utils.js", ["server"]);
  api.addFiles("server/publications/publicProducts.js", ["server"]);
  api.addFiles("server/publications/sellerProducts.js", ["server"]);

  api.addFiles("client/templates/style.less", ["client"]);

  api.addFiles("client/templates/members/member.html", "client");
  api.addFiles("client/templates/members/member.js", "client");

  api.addFiles("client/templates/products/productsViewSwitcher.html", ["client"]);
  api.addFiles("client/templates/products/productsMarketplace.html", ["client"]);
  api.addFiles("client/templates/products/productsMarketplace.js", ["client"]);
  api.addFiles("client/templates/products/products.less", ["client"]);

  api.addFiles("client/templates/products/productGrid/productGrid.html", ["client"]);
  api.addFiles("client/templates/products/productGrid/productGrid.js", ["client"]);
  api.addFiles("client/templates/products/productList/productList.html", ["client"]);
  api.addFiles("client/templates/products/productList/productList.js", ["client"]);
  api.addFiles("client/templates/products/productList/productList.less", ["client"]);

  api.addFiles("client/templates/cart/checkout/header/header.html", ["client"]);
  api.addFiles("client/templates/cart/checkout/header/header.js", ["client"]);
  api.addFiles("client/templates/dropdown/dropdown.html", ["client"]);
  api.addFiles("client/templates/dropdown/dropdown.js", ["client"]);
  api.addFiles("client/templates/dropdown/dropdown.less", ["client"]);

  api.addFiles("client/collections/index.js", ["client"]);
  api.addFiles("client/helpers/globals.js", ["client"]);
  api.addFiles("client/helpers/products.js", ["client"]);
  api.addFiles("client/helpers/tags.js", ["client"]);

  api.addFiles("client/templates/cart/checkout/checkout.html", "client");
  api.addFiles("client/templates/cart/checkout/checkout.js", "client");
  api.addFiles("client/templates/cart/checkout/completed/completed.html", "client");
  api.addFiles("client/templates/cart/checkout/completed/completed.js", "client");

  api.addFiles("client/templates/dashboard/dashboard.js", "client");
  api.addFiles("client/templates/dashboard/settings/settings.html", "client");
  api.addFiles("client/templates/dashboard/settings/settings.js", "client");
  api.addFiles("client/templates/dashboard/orders/list/ordersList.html", "client");
  api.addFiles("client/templates/dashboard/orders/list/ordersList.js", "client");
  api.addFiles("client/templates/dashboard/orders/list/items/items.html", "client");
  api.addFiles("client/templates/dashboard/orders/list/items/items.js", "client");
  api.addFiles("client/templates/dashboard/orders/list/itemSeller/itemSeller.html", "client");
  api.addFiles("client/templates/dashboard/orders/list/itemSeller/itemSeller.js", "client");
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('scydev:reaction-p2p-marketplace');
  api.addFiles('reaction-p2p-marketplace-tests.js');
});
