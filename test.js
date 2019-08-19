// setTimeout(()=>{console.log(1),0});
// new Promise((resolve)=>{console.log(2);resolve("");}).then(()=>{console.log(3)});
// console.log(4);





// 例子2
console.log(1);

setTimeout(()=>{
  console.log(2);

  new Promise((resolve)=>{
    console.log(4);
    resolve();
  }).then(()=>{
    console.log(5);
  });
},1);


new Promise((resolve)=>{
  console.log(7);
  resolve();
}).then(()=>{
  console.log(8);

});

setTimeout(()=>{
  console.log(9);

  new Promise((resolve)=>{
    console.log(11);
    resolve();
  }).then(()=>{
    console.log(12);
  })
},1);



// 错误
// 1
// 7
// 6
// 8
// 2
// 4
// 3
// 5
// 9
// 11
// 10
// 12



// 错误
// 1
// 7
// 6
// 8
// 2
// 4
// 9
// 11
// 3
// 5
// 10
// 12

// 正确
// 1
// 7
// 6
// 8
// 2
// 4
// 9
// 11
// 3
// 10
// 5
// 12





var nums = [1,2,3]
nums.push(nums);
var i = 0;
var shit = function(arr){
  debugger
  if(Array.isArray(arr)){
    arr.map((item)=>{
      shit(item)
    })
  }else{
    if(arr === 3){
      i++
    }
  }
}

var renturnlength = function(arr,i){
  debugger
  if(Array.isArray(arr)){
    arr.map((n)=>{
      i=i+renturnlength(n,i)
    })
  }else{
    if(arr === 3){
      return 1
    }else{
      return 0
    }
  }
  return i
}

var nums = [1,2,3,3,4,6,7,8,8,7,6,5,4,3,3,2,1,3,4,5,6,7]


