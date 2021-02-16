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
  let modalContent = "";
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
  <button class="draw" onclick="getWeight(100)">100gr</button>
  <button class="draw" onclick="getWeight(200)">200gr</button>
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Mua Ngay
</button>
</div>
  `;
  // modal content
  modalContent = `
  <div class="modal-header text-center">
  <h5 class="modal-title" id="exampleModalLabel">
    ${data.title}
  </h5>
  <button
    type="button"
    class="close"
    data-dismiss="modal"
    aria-label="Close"
  >
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  <div class=".Contact__content col-12">
    <h1>Đăng kí mua</h1>
    <div class="contact__list mt-5">
      <form action="" name="form1">
        <input
          id="input__name"
          class="pl-3"
          type="text"
          name="HoTen"
          placeholder="Name"
        />
        <span
          class="sp-thongbao"
          id="firstNameError"
        ></span>
        <textarea
          id="input__area"
          class="pl-3 pt-3"
          name="NoiDung"
          id=""
          cols="20"
          rows="10"
          placeholder="Message"
        ></textarea>
        <span class="sp-thongbao" id="areaError"></span>
        <input
          id="input__email"
          class="pl-3"
          type="email"
          name="email"
          placeholder="email"
        />
        <span
          class="sp-thongbao"
          id="emailError"
        ></span>
        <input
          id="input__phone"
          class="pl-3"
          type="number"
          name="phone"
          placeholder="phone"
        />
        <span
          class="sp-thongbao"
          id="phoneError"
        ></span>
        <input
          id="input__count"
          class="pl-3"
          type="number"
          name="count"
          placeholder="số lượng"
          max="2"
        />
        <span
        class="sp-thongbao"
        id="countError"
      ></span>

      <input
          id="input__weight"
          class="pl-3"
          type="number"
          name="weight"
          placeholder="trọng lượng"
        />
     
        <p style="margin: 0">Giá trị ${data.price}</p>
        <button
          id="button__submit"
          type="button"
          class="btn"
          onclick="submitClick()"
          
        >
          submit
        </button>
      </form>
    </div>
  </div>
</div>
  `;
  document.getElementById("productRender").innerHTML = productContent;
  document.getElementById("modaljs").innerHTML = modalContent;
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

// check validation
function submitClick() {
  var Name = document.getElementById("input__name").value;
  var Area = document.getElementById("input__area").value;
  var Email = document.getElementById("input__email").value;
  var Phone = document.getElementById("input__phone").value;
  var Count = document.getElementById("input__count").value;
  var isValid = true;
  isValid &=
    checkRequired(Name, "firstNameError") &&
    checkLenght(Name, "firstNameError", 1, 15) &&
    checkString(Name, "firstNameError");

  isValid &=
    checkRequired(Area, "areaError") &&
    checkLenght(Area, "areaError", 1, 400) &&
    checkString(Area, "areaError");
  isValid &=
    checkRequired(Email, "emailError") &&
    checkLenght(Email, "emailError", 1, 30);
  isValid &=
    checkRequired(Phone, "phoneError") &&
    checkLenght(Phone, "phoneError", 1, 10);
  isValid &=
    checkRequired(Count, "countError") &&
    checkLenght(Count, "countError", 1, 2);
  if (isValid) {
    alert("Đã gửi thông tin của bạn");
  }
}

function checkRequired(value, errorId) {
  if (value) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  }
  document.getElementById(errorId).setAttribute("style", "display:block");
  document.getElementById(errorId).innerHTML = "Truong nay bat buoc nhap";
  return false;
}

function checkLenght(value, errorId, min, max) {
  if (value.length < min || value.length > max) {
    document.getElementById(errorId).setAttribute("style", "display:block");
    document.getElementById(
      errorId
    ).innerHTML = `*Do dai phai tu ${min} den ${max}`;
    return false;
  }
  document.getElementById(errorId).innerHTML = "";
  return true;
}

function checkString(value, errorId) {
  const pattern = new RegExp(
    "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂếẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
  );
  if (pattern.test(value)) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  }
  document.getElementById(errorId).setAttribute("style", "display:block");
  document.getElementById(errorId).innerHTML = "Du lieu ko dung dinh dang";
  return false;
}
// end

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
function getWeight(weight) {
  document.getElementById("input__weight").value = weight;
}
