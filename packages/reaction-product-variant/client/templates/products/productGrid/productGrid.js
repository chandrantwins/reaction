/**
 * productGrid helpers
 */

/**
 * loadMoreProducts
 * @summary whenever #productScrollLimitLoader becomes visible, retrieve more results
 * this basically runs this:
 * Session.set('productScrollLimit', Session.get('productScrollLimit') + ITEMS_INCREMENT);
 * @return {undefined}
 */
function loadMoreProducts() {
  let threshold;
  let target = $("#productScrollLimitLoader");
  let scrollContainer = $("#reactionAppContainer");

  if (scrollContainer.length === 0) {
    scrollContainer = $(window);
  }

  if (target.length) {
    threshold = scrollContainer.scrollTop() + scrollContainer.height() - target.height();

    if (target.offset().top < threshold) {
      if (!target.data("visible")) {
        target.data("productScrollLimit", true);
        Session.set("productScrollLimit", Session.get("productScrollLimit") + ITEMS_INCREMENT || 24);
      }
    } else {
      if (target.data("visible")) {
        target.data("visible", false);
      }
    }
  }
}

Template.productGrid.onCreated(function () {
  Session.set("productGrid/selectedProducts", []);
  Session.set("productScrollLimit", 24);
  // Update product subscription
  // this.autorun(() => applyProductFilters());

  this.autorun(() => {
    const isActionViewOpen = ReactionCore.isActionViewOpen();
    if (isActionViewOpen === false) {
      Session.set("productGrid/selectedProducts", []);
    }
  });
});

Template.productGrid.onRendered(() => {
  // run the above func every time the user scrolls
  $("#reactionAppContainer").on("scroll", loadMoreProducts);
  $(window).on("scroll", loadMoreProducts);
});

Template.productGrid.events({
  "click [data-event-action=loadMoreProducts]": (event) => {
    event.preventDefault();
    loadMoreProducts();
  },
  "change input[name=selectProduct]": (event) => {
    let selectedProducts = Session.get("productGrid/selectedProducts");

    if (event.target.checked) {
      selectedProducts.push(event.target.value);
    } else {
      selectedProducts = _.without(selectedProducts, event.target.value);
    }

    Session.set("productGrid/selectedProducts", _.uniq(selectedProducts));

    let products = Template.instance().products;
    let filteredProducts = _.filter(products, (product) => {
      return _.contains(selectedProducts, product._id);
    });

    ReactionCore.showActionView({
      label: "Edit Product",
      template: "productSettings",
      type: "product",
      data: {
        products: filteredProducts
      }
    });
  }
});

Template.productGrid.helpers({
  loadMoreProducts: function () {
    return ReactionCore.Collections.Products.find().count() >= Session.get("productScrollLimit");
  },
  products: function () {
    /* 
      For some reason Tracker (Meteor 1.2.4) does not rerun helper when subscription is ready, 
      when the complex filter is in the Products.find() 
    */
    // if (!ReactionCore.MeteorSubscriptions_Products.ready()) return;

    /*
    * take natural sort, sorting by updatedAt
    * then resort using positions.position for this tag
    * retaining natural sort of untouched items
    */

    // function to compare and sort position
    function compare(a, b) {
      if (a.position.position === b.position.position) {
        let x = a.position.updatedAt;
        let y = b.position.updatedAt;

        if (x > y) {
          return -1;
        } else if (x < y) {
          return 1;
        }

        return 0;
      }
      return a.position.position - b.position.position;
    }

    const gridProducts = ReactionCore.Collections.Products.find(Session.get("productFilters"), { sort: { latestOrderDate: 1 }}).fetch();

    for (let index in gridProducts) {
      if ({}.hasOwnProperty.call(gridProducts, index)) {
        let gridProduct = gridProducts[index];
        if (gridProduct.positions) {
          let _results = [];
          for (let position of gridProduct.positions) {
            if (position.tag === ReactionCore.getCurrentTag()) {
              _results.push(position);
            }
            gridProducts[index].position = _results[0];
          }
        }
        if (!gridProduct.position) {
          gridProducts[index].position = {
            position: 0,
            weight: 0,
            pinned: false,
            updatedAt: gridProduct.updatedAt
          };
        }
      }
    }

    const products = gridProducts;//gridProducts.sort(compare);
    Template.instance().products = products;
    return products;
  }
});
