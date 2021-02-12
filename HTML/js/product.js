const fetchProductDetail = function () {
  //const courseld = window.location.search.split("=")[1]; //co the bo window ,spilt la ham tach chuoi thanh mang
  const courseId = window.location.search.split("=")[1];
  axios({
    url:
      "https://5f5442d1e5de110016d51e7d.mockapi.io/dataProduct/1/" + courseId,
    method: "GET",
  })
    .then(function (res) {
      console.log("response form backend", res.data);
    })
    .catch(function (err) {
      //console.log(err);
      console.log("nono");
    });
};
fetchProductDetail();
