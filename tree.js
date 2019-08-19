var char  = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var randomName = function(num = 6){
    var str = "";
    for (let i = 0;i<num;i++){
        str = str+ char[Math.floor(Math.random()*26)];
    }
    return str
}

var randomParent = function(big=0,i){
    var _i = Math.floor(Math.random()* big/2);
    if(_i ===i){
        return randomParent(big,i)
    }
    return _i
}


var TreeData = function(){
    this.plantdata = [];
    this.treedata ={};
}



TreeData.prototype.findChildrenById = function(id){
    var k = [];
    this.plantdata.map((item)=>{
        if(item.parent === id){
            k.push(item)
        }
    })
    return k
    
}
TreeData.prototype._genTreeData = function(root){
    // debugger
    var children = this.findChildrenById(root.id);
    if(children.length){
        root.children = children;
        root.children.map((__item)=>{
            this._genTreeData(__item)
        })
    }
}
TreeData.prototype.genTreeData = function(){
    // 生成树节点
    var root = this.plantdata[0];
    this.treedata = root;
    this._genTreeData(this.treedata);
    return this.treedata
    
}
TreeData.prototype.genData = function(count){
    this.plantdata = [];
    this.treedata ={};

    for (let i = 0; i <= count; i++) {
       this.plantdata.push({
           id:i,
           name:randomName(),
           parent:i===0?null:randomParent(i,i),
       })
        
    }
    this.genTreeData()
}

var drawData = function(obj,k){
    
    console.log(" ".repeat(k*2)+obj.name);
    
    k++
    if(obj.children){
        obj.children.map((item)=>{
            drawData(item,k)
        })
    }
    
}
TreeData.prototype.drawData = function(){
    drawData(this.treedata,0)
}

TreeData.prototype.isRoot = function(id){
    return this.treedata.id === id   
}

var parent = function(obj,id){
    // debugger
    var r;
    if(obj.id === id){
        r = obj
        return r
    }
    if(obj.children){
        for (let index = 0; index < obj.children.length; index++) {
            const _item = obj.children[index];
            r = parent(_item,id)
            if(r){
                break;
            }
        }
    }
    return r
}
TreeData.prototype.findParentById = function(id){
    return parent(this.treedata,id)
    
}

TreeData.prototype.findNextNode = function(obj){
    // NOTE: 2019-08-19 15:28:21 第一步查询到父亲，
    var p = this.findParentById(obj.parent);
    if(!p){
        return null
    }
    // debugger
    // NOTE: 2019-08-19 15:29:00 第二部查询自己到位置；
    var index = 0;
    p.children.map((item,ii)=>{
        if(item.id === obj.id){
            index = ii;
        }
    });
    // NOTE: 2019-08-19 15:29:22 第三部返回下一个node
    if(p.children[index+1]){
        return p.children[index+1]
    }else{
        return null
    }
    
}

TreeData.prototype._perttyDraw = function(obj,k,i){
    // debugger
    // var str = "┝";"│" ┕
    // NOTE: 2019-08-19 15:25:32 这里要查找下一级是否存在，存在就是t，不存在是就是结束
    var r = [];
    r.push(" │ ".repeat(k-1>0?k-1:0));

    if(this.findNextNode(obj)){
        r.push("┝ ")
    }else{
        r.push("┕ ")
    }
    // r.push(" │ ".repeat(k-1>0?k-1:0));
    if(this.isRoot(obj.id)){
        r = []
    }
    console.log(r.join(" ")+i+" "+obj.name);
    
    k++
    if(obj.children){
        obj.children.map((item,ii)=>{
            this._perttyDraw(item,k,i+"."+ii)
        })
    }
}
TreeData.prototype.perttyDraw = function(){
    this._perttyDraw(this.treedata,0,0)
}
var x = new TreeData();
x.genData(30);
x.treedata;
x.perttyDraw()