const $ = require("jquery");
const moment = require('moment');
moment.locale('ja', {
    weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
    weekdaysShort: ["日","月","火","水","木","金","土"],
});
const start = moment().format("YYYY年MM月DD日(ddd) HH:mm:ss");
let test = moment().toDate()
let h=0,m=0,s=0;

$(function() {
  init();
  let hour = 24; //制限時間(h)
  if (localStorage.getItem("h")) {

  } else {

  }
  $("#dead").text("【残り時間】  "+hour+"：00：00");

  //開始ボタンクリック
  $("#start").on('click', function(event) {
    $("#start").prop('disabled', true);
    $("#pause").prop('disabled', false);

    let startTime = moment().add(24, 'hours').format("YYYY年MM月DD日(ddd) HH:mm:ss");
    countDown(hour*60*60-1); // h * m * s
  });
  //一時停止ボタンクリック
  $("#pause").on('click', function () {
    $("#pause").prop('disabled', true);
    $("#restart").prop('disabled', false);
    $("#reset").prop('disabled', false);
    clearTimeout(timerID);
  });
  //再開ボタンクリック
  $("#restart").on('click', function () {
    $("#pause").prop('disabled', false);
    $("#restart").prop('disabled', true);
    $("#reset").prop('disabled', true);

    countDown(h*3600+m*60+s);
  });
  //リセットボタンクリック
  $("#reset").on('click', function () {
    $("#start").prop('disabled', false);
    $("#restart").prop('disabled', true);
    $("#reset").prop('disabled', true);

    clearTimeout(timerID);
    $("#dead").text("【残り時間】  "+hour+"：00：00");
  });

});

//初期化
function init() {
  clock();
  //ボタン非表示
  $("#pause").prop('disabled', true);
  $("#restart").prop('disabled', true);
  $("#reset").prop('disabled', true);
}

//現在時刻を表示
function clock() {
  let now = moment().format("YYYY年MM月DD日(ddd) HH:mm")
  $("#now").text("現在時刻：" + now);
  setTimeout(function () {
    clock();
  }, 1000);
}

//カウントダウン
let timerID = 0;
function countDown(time) {
  h = Math.floor(time / 3600);
  m = Math.floor((time - h*3600) / 60);
  s = Math.floor((time - h*3600 - m*60));
  if(h<10) h="0"+h;
  if(m<10) m="0"+m;
  if(s<10) s="0"+s;
  $("#dead").text("【残り時間】  "+h+"："+m+"："+s);
  localStorage.setItem("h", JSON.stringify(h));
  localStorage.setItem("m", JSON.stringify(m));
  localStorage.setItem("s", JSON.stringify(s));
  let test = JSON.parse(localStorage.getItem("s"));
  console.log(test);
  timerID = setTimeout(function () {
    time -= 1;
    countDown(time);
  }, 1000);
}
