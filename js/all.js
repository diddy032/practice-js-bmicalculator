//Dom
var ButtonCheck = document.querySelector('.button-check');
var BMIList = document.querySelector('.bmi-list');
var BMIShow = document.querySelector('.bmi-show');
var listData = JSON.parse(localStorage.getItem('BMI List Data')) || [];

//監聽
ButtonCheck.addEventListener('click', savelist, false);
BMIShow.addEventListener('click', inputclean, false);
BMIList.addEventListener('click', deleteitem, false);


updata(listData);



//更新資料，列出到頁面上
function updata(listData) {
  let len = listData.length;
  let liststr = '';
  for (let i = 0; i < len; i++) {
    liststr += '<li class="bmi-data" data-num="' + i + '" style="border-color:' + listData[i].Color + '"> <div class="bmidata-category h4">' + listData[i].Category + '</div> <div class="bmidata-warp"> <div class="bmidata-result"> <div class="h6 bmidatm-m">BMI</div> <div class="h4">' + listData[i].BMI + '</div> </div> <div class="bmidata-weight"> <div class="h6 bmidatm-m">weight</div> <div class="h4"> ' + listData[i].Weight + 'kg</div> </div> <div class="bmidata-height"> <div class="h6 bmidatm-m">height</div> <div class="h4">' + listData[i].Height + '</div> </div> </div> <div class="bmidata-date"> <div class="h6 bmidatm-m">' + listData[i].Date + '</div> </div> <div class="delete-icon"> <i class="far fa-times-circle" data-num="' + i + '"></i> </div></li>';
  }
  BMIList.innerHTML = liststr;
}

//儲存資料到陣列與localStorage
function savelist() {
  let HeightStr = document.querySelector('.body-height').value;
  let WeightStr = document.querySelector('.body-weight').value;

  //判斷數值是否為零
  if (HeightStr == '' || WeightStr == '' || HeightStr <= 0 || WeightStr <= 0) {
    alert('身高/體重不能為零，請輸入數值');
    return;
  }
  let BMIStr = ((WeightStr * 100) / (HeightStr * HeightStr) * 100).toFixed(2);



  //判斷體重
  if (BMIStr < 18.5) {
    CategoryStr = '過輕';
    ColorStr = '#31BAF9';
  }
  else if (18.5 <= BMIStr && BMIStr < 24) {
    CategoryStr = '理想';
    ColorStr = '#86D73F';
  }
  else if (24 <= BMIStr && BMIStr < 27) {
    CategoryStr = '過重';
    ColorStr = '#FF982D';
  }
  else if (27 <= BMIStr && BMIStr < 30) {
    CategoryStr = '輕度肥胖';
    ColorStr = '#FF6C02';
  }
  else if (30 <= BMIStr && BMIStr < 35) {
    CategoryStr = '中度肥胖';
    ColorStr = '#FF6C02';
  }
  else if (35 <= BMIStr) {
    CategoryStr = '重度肥胖';
    ColorStr = '#FF1200';
  }

  //取得當下日期
  let fullDate = new Date();
  let NowDate = (fullDate.getMonth() + 1) + '/' + fullDate.getDate() + '/' + fullDate.getFullYear();
  console.log(fullDate);
  console.log(NowDate);

  //存入陣列中
  listData.push({
    Height: HeightStr,
    Weight: WeightStr,
    BMI: BMIStr,
    Category: CategoryStr,
    Date: NowDate,
    Color: ColorStr,
  });

  let BMIShowstr = '<div class="show-circle" style="border-color:' + ColorStr + ';"> <div class="circle-value h1" style="color:' + ColorStr + ';">' + BMIStr + '</div> <div class="circle-title" style="color:' + ColorStr + ';">BMI</div> <div  id="circle-icon" class="circle-icon" style="background-color:' + ColorStr + ';"></div> </div> <div class="show-category h1" style="color:' + ColorStr + ';">' + CategoryStr + '</div> ';



  BMIShow.innerHTML = BMIShowstr;

  let listString = JSON.stringify(listData);
  localStorage.setItem('BMI List Data', listString);

  setTimeout(function () {
    document.getElementById('button-check').classList.toggle('disappear');
  }, 100);
  setTimeout(function () {
    document.getElementById('bmi-show').classList.toggle('disappear');
  }, 100);

  console.log(listData);
  updata(listData);
}



//清除 input值，顯示button-check
function inputclean(e) {
  let str = e.target.className;
  console.log(str);
  if (str !== 'circle-icon') { return };
  setTimeout(function () {
    document.getElementById('button-check').classList.toggle('disappear');
  }, 0);
  setTimeout(function () {
    document.getElementById('bmi-show').classList.toggle('disappear');
  }, 0);
  document.querySelector('.body-height').value = '';
  document.querySelector('.body-weight').value = '';
}

//刪除資料
function deleteitem(e) {
  if (e.target.nodeName !== 'I') { return };
  let num = e.target.dataset.num
  listData.splice(num, 1);
  let listString = JSON.stringify(listData);
  localStorage.setItem('BMI List Data', listString);
  updata(listData);
}




