const fetchProductDetail = function () {
  //const courseld = window.location.search.split("=")[1]; //co the bo window ,spilt la ham tach chuoi thanh mang
  const courseId = window.location.search.split("=")[1]; //lấy chuổi sau dấu =  trên thanh search
  axios({
    url:
      "https://5f5442d1e5de110016d51e7d.mockapi.io/dataProduct/1/" + courseId,
    method: "GET",
  })
    .then(function (res) {
      fetchAllProduct();
      console.log("response form backend", res.data);
      var product = res.data;
      console.log(product.title);
      renderProduct(res.data);
    })
    .catch(function (err) {
      //console.log(err);
      console.log("nono");
    });
};

const fetchAllProduct = function () {
  var number = Math.floor(Math.random() * 2) + 1; // random ngẫu nhiên product 1 và 2

  axios({
    url:
      "https://5f5442d1e5de110016d51e7d.mockapi.io/dataProduct/1/product" +
      number,
    method: "GET",
  })
    .then(function (res) {
      console.log("response form backend 2", res.data);

      rendersidlebarProduct(res.data, number);
    })
    .catch(function (err) {
      //console.log(err);
      console.log("nono");
    });
};

fetchProductDetail();
function renderProduct(data) {
  let productContent = "";
  productContent = `
  <div class="entry-thumbnail col-sm-6">
  <img alt="" src="${data.image}" />
</div>
<div class="priceProduce col-sm-6">
  <h3>${data.title}</h3>
  <h4>Giá từ : <span>${data.price}</span> VND</h4>
  <p>
  ${data.content}
  </p>
  <h6>Trọng Lượng</h6>
  <button class="draw">100gr</button>
  <button class="draw">200gr</button>
  <button class="">Mua ngay</button>
</div>
  `;
  document.getElementById("productRender").innerHTML = productContent;
}

function rendersidlebarProduct(data, number) {
  var sidlebarContent = "";
  for (let index = 0; index < 4; index++) {
    var productItem = data[index];
    sidlebarContent += `
  <div class="widget_tag_cloud">
  <div class="row media" href="#" >
    <div class="col-sm-4 media_img">
      <img src="${productItem.image}" style="width:90%" alt="yen sao" />
    </div>

    <div class="media-body col-sm-8">
      <h5 class="mt-0">${productItem.title}</h5>
      <p>Giá :${productItem.price}VND</p>
      <button class="" href="#" onclick="pageProductAPI(${number},${
      +index + 1
    })">Xemchi tiet</button>
    </div>
  </div>
</div>
  `;
  }

  document.getElementById("sidebarProductRender").innerHTML = sidlebarContent;
}

// scorll ẩn hiện list product
$(document).ready(function () {
  $(window).scroll(function (event) {
    var pos_body = $("html,body").scrollTop();
    // console.log(pos_body);
    if (pos_body < 1990) {
      $(".listProduct").addClass("listProductFixed");
    } else {
      $(".listProduct").removeClass("listProductFixed");
    }
  });
});

function pageProductAPI(key, id) {
  console.log(key);
  window.location.assign("blog.html?key=" + "product" + key + "/" + id);
}
