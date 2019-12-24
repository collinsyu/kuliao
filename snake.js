// snake snacks sneak

// 约瑟夫环形

var J = function(){
    this.original = [];
    this.aftersort = [];
}
J.prototype.gen = function(n,m){
    if(n<1||m<1){
        return;
    }
    var arr = Array(...Array(n)).map((_, i) => i + 1); // 就是生成数组
    let index = 0;
    while (arr.length) {
        debugger
        index = (index + m - 1) % arr.length;
        this.aftersort.push(arr[index])
        arr.splice(index,1)
    }

}

var j = new J();
j.gen(20,30)
