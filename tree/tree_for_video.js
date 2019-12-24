// TODO: 2019-08-20 10:15:24 这里的思路不要错，肯定是先生成父节点，才能有子节点，之前面试
// 的思路有错误，我总想的根据子节点，查询父节点，然后往父节点里面塞值，这是错误的！
// 创建tree的时候：由父==》子；findchildren；
// 在tree已经生成的基础上，在其他的方法中才会用到findById！！



// NOTE: 2019-08-20 11:44:35 随机生成字母有很多种方法，有时间要整理一下；


var randmomName = function(len){
    var result = [];
     for(var i=0;i<len;i++){
        var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
         //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
         result.push(String.fromCharCode(65+ranNum));
     }
  return  result.join('');
}


var _genTreeData = function(arr,parentNode){
    // debugger
    var parentId = parentNode.id;
    var _child = [];
    var _newArr = [];
    // TODO: 2019-08-20 11:21:50 这里需要优化，怎么提出掉已经进入树掉数据，不要每次都全部遍历一遍
    
    arr.map((item)=>{
        if(item.parent === parentId){
            _child.push(item);
        }else{
            _newArr.push(item);
        }
    });
    this.processArr = _newArr
    parentNode.children = parentNode.children||[];
    parentNode.children = _child;
    if(parentNode.children.length>0){
        parentNode.children.map((_item)=>{
            _genTreeData(this.processArr,_item)
        })
    }
    
}

class TreeText {
    constructor() {
        this.processArr = [];
        this.plainData = [];
        this.treeData = {};
        this.root = {};
        this.length = 0;
    }

    //直接写方法即可
    // TODO: 2019-08-20 09:54:44 随机生成父级id
    randomId(num = 0){
        if(num<0){
            return 0;
        }
        // ceil上位，round四舍五入，floor下位 , 为了减少层级，除以2
        let _num = Math.floor(Math.random()*num/2);
        return _num
    }
    // TODO: 2019-08-20 10:07:34 生成平层的数据数组
    genData(length){
        this.length = length;
        let arr = [];
        for (let ii = 0; ii < length; ii++) {
            arr.push({
                id:ii,
                name:randmomName(6),
                parent:ii===0?null:this.randomId(ii)
            })
            
        }
        this.plainData = arr;

 
        // TODO: 2019-08-20 10:13:41 生成一下treedata，不要污染plaindata
        var _pd = JSON.parse(JSON.stringify(this.plainData))
        this.root = this.treeData = _pd[0];
        _pd.shift();
        // 这里要删掉第一条，要不然回死循环！因为会一直往root里面塞数据
        _genTreeData.call(this,_pd,this.root)
    }
    // 直接打印rawdata
    printTree(k=0,obj=this.treeData){
        console.log("  ".repeat(k)+obj.name);
        k++;
        if(obj.children){
            obj.children.map((item)=>{
                this.printTree(k,item)
            })
        }
    }
    isRoot(id){
        return id===this.root.id;
    }
    findById(id,obj){
        var r;
        if(obj.id === id){
            r = obj;
            return r
        };
        if(obj.children){
            for (let i = 0; i < obj.children.length; i++) {
                r = this.findById(id,obj.children[i]);
                if(r){
                    break;
                }
            }
        }
        return r;
    }
    // 判断是否是当前父节点的最后一个节点
    isLastNode(obj){
        let parentNode = this.findById(obj.parent,this.root);
        if(parentNode){
            // debugger
            return parentNode.children[parentNode.children.length-1].id === obj.id
        }
    }
    // 这里需要修饰下打印，需要找到父级方法，找到next 方法
    // 不仅仅要打印空格， 还需要用到特殊字符 
    // ┝ 有分枝且不是最后一个子节点 
    // │ 没有分支，但是父节点不是最后一个节点
    // ┕ 是最后一个节点
    modifyPrint(k=0,obj=this.treeData){
        
        if(this.isRoot(obj.id)){
            console.log(obj.name);
        }else{
            let f = length => Array.from({length}).map((v,k) => " │ ");
            var _n = f(k-1);
            // 判断父节点是否是最后一个节点
            var p = this.findById(obj.parent,this.root);
            if(p){
                var ispl = this.isLastNode(p);
                if(ispl){
                    _n.pop();
                    _n.push("   ")
                }
            }
            
            // 查找是否是最后一个节点
            var isl = this.isLastNode(obj);
            // debugger
            if(isl){
                _n.push(" ┕ ")
            }else{
                _n.push(" ┝ ")
            }
            console.log(_n.join("")+obj.name);
            
        }
        k++;
        if(obj.children.length){
            obj.children.map((item)=>{
                this.modifyPrint(k,item)
            })
        }
        
    }

}

var n = new TreeText();
n.genData(20)