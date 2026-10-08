javascript:(function(){
  var timeout = prompt("設定重新整理時間間隔[S]");
  var count = -1;
  var current = location.href;
  var maxTimes = 10;

  if(timeout > 0){
    reload();
  }else{
    location.replace(current);
  }

  function reload(){
    setTimeout(reload, 1000 * timeout);
      buildFrame();
  }

function buildFrame(){
   console.log("重新整理頁面");
  var fr4me = "<frameset cols='*'><frame src='" + current + "' name='myframe'/></frameset>";
  document.open();
  document.write(fr4me);
  document.close();

  var frame = window.frames.myframe;
  frame.frameElement.onload = function(){
    try{
      var doc = frame.document;
      var inputs = doc.querySelectorAll('input[name="prodno"]');
      var bookscount = 0;

      inputs.forEach(function(elem, index){
        if(elem.disabled){
          //console.log("第 " + index + " 個元素是 disabled");
        }else{
          if(!elem.checked){
            elem.checked = true;
            var td = $(elem).closest('td');
             // 往前三格就是書名 (因為順序是：定價 → 庫存 → 回頭書 → 新書)
            var titleCell = td.prev().prev().prev();
            var title = titleCell.text().trim();
            console.log(title + "已勾選");
            bookscount++;
            //console.log("第 " + index + " 個元素可用");
          }
        }
      });

      if(bookscount){
        var btn = doc.getElementById("addCart");
        if(btn){
	      btn.click();
	      console.log("🛒 已點擊加入購物車");
        }else{
	      console.log("⚠️ 找不到加入購物車按鈕");
        }

      }
    }catch(e){
      console.error(e);
    }
  };
}
})();
