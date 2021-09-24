(function(){
  'use strict';


// character indices is svg number - 1
  // var runeMap = [
  //   'p', 'b', 'f', 'v', 'hw', 'm', 'mb', 't', 'd', 'th', 'dh', 'r', 'ch', undefined,'sh',
  //   undefined, 'z', 'k', 'g', 'kh', 'gh', 'n', 'kw', 'gw', 'khw','ghw', 'ngw', 'nw', 'j', 'zh',
  //   'l', 'lh', 'nd', 'h', 'ʻ', 'ŋ', 'ng', 'nj', 'i', 'y', 'hy', 'u', 'û', 'w', 'ü',
  //   'e', 'ê', 'a', 'â', 'o', 'ô', 'ö', 'n', 's', undefined, undefined, undefined, undefined, undefined, undefined
  // ];
  // create object actual map
  // runeMap.forEach(function(val, index) {
  //   runeObjStr += val + ': "' + index + '",';
  // });
  // runeObjStr += "}";

  // added 'c'
  var runeObj = {p: "0",b: "1",f: "2",v: "3",hw: "4",m: "5",mb: "6",t: "7",d: "8",th: "9",dh: "10",r: "11",ch: "12",undefined: "13",sh: "14",undefined: "15",z: "16",k: "17", c:"17", g: "18",kh: "19",gh: "20",n: "21",kw: "22",gw: "23",khw: "24",ghw: "25",ngw: "26",nw: "27",j: "28",zh: "29",l: "30",lh: "31",nd: "32",h: "33",ʻ: "34",ŋ: "35",ng: "36",nj: "37",i: "38",y: "39",hy: "40",u: "41",û: "42",w: "43",ü: "44",e: "45",ê: "46",a: "47",â: "48",o: "49",ô: "50",ö: "51",n: "52",s: "53",undefined: "54",undefined: "55",undefined: "56",undefined: "57",undefined: "58",undefined: "59" };

  // sort map by key length in order to auto combine 
  var keys = Object.keys(runeObj);
  var sortedKeys = keys.sort(function(first, second){
    return first.length < second.length;
  });

  var runeMap = new Map();
  sortedKeys.forEach(function(key){
    // add one to runeObj[key] since was 0 based indices and svg numbers are 1 based
    if(key !== "undefined") runeMap.set(key, Number(runeObj[key]) + 1);
  });

  var title = document.getElementById('title');
  title.innerHTML = transliterate(title.innerText);


  var runeInput = document.getElementById('rune-input');
  var runeContainer = document.getElementById('rune-container');
  var diamonds = document.getElementById('diamonds');
  runeInput.onkeyup = function(event){
    var textValue = this.value 
    var text = transliterate(textValue);
    if(text.length > 0 ){
      diamonds.classList.remove(["hidden"]);
    } else {
      diamonds.classList.add(["hidden"]);
    }
    runeContainer.innerHTML = text;

  };

  function transliterate(textValue) {
    textValue = textValue.toLowerCase();
    var runeTags = '';
    // replace spaces
    textValue = textValue.replaceAll(' ', 0 + ',');
    // replace w/ svg
    runeMap.forEach(function(index, key) {
      textValue = textValue.replaceAll(key, index + ',');
    });

    var runeIndices = textValue.split(',');

    runeIndices.forEach(function(val){
      if(val === '0'){
        runeTags +='<span class="rune-space"></span>';
      } else if (val.length === 0) {
        // do nothing
      } else {
        runeTags += '<img class="rune" src="/runes/Certh_' + val + '.svg"/>';
      }
    });
    return runeTags;
  }
}());