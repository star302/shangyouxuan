window.onload = function(){
    // 全局缩略图下标
    let bigPicIndex = 0;
    let imgData = goodData.imagessrc;

    // 路径渲染
    (function(){
        let nav = document.getElementById('nav');
        let data = goodData.path;
        for(let i = 0; i < data.length; i++) {
            let aNode = document.createElement('span');
            if(i === data.length - 1) {
                aNode.innerHTML = `<a>${data[i].title}<\/a>`;
            }else{
                aNode.innerHTML = `<a href="${data[i].url}">${data[i].title}<\/a><i>\/<\/i>`;
            }
            nav.appendChild(aNode);
        }
    }())
    // 图片放大
    picGreater();
    function picGreater(){
        let smallPic = document.getElementById('smallPic')
        smallPic.onmouseenter = function(){
            let mask = document.createElement('div');
            mask.className = 'mask';
            let bigPic = document.createElement('div');
            bigPic.className = 'bigPic';
            bigPic.innerHTML = `<img src="${imgData[bigPicIndex].b}" alt="" />`
            let leftTop = document.getElementById('leftTop');
            leftTop.appendChild(bigPic);
            smallPic.appendChild(mask);
            // mask移动
            smallPic.onmousemove = function(e){
                let left = e.clientX - leftTop.getBoundingClientRect().left - mask.offsetWidth / 2;
                let top = e.clientY - leftTop.getBoundingClientRect().top - mask.offsetHeight / 2;
                // 边界控制
                left = Math.max(left, 0);
                top = Math.max(top, 0);
                left = Math.min(left, leftTop.clientWidth - mask.offsetWidth);
                top = Math.min(top, leftTop.clientHeight - mask.offsetHeight);

                mask.style.left = left + 'px';
                mask.style.top = top + 'px';
                // 大图跟随移动
                let img = document.querySelector('.container .content .contentContainer .center .left .leftTop .bigPic img');
                img.style.left = -2 * left + 'px';
                img.style.top = -2 * top + 'px';
            }
            smallPic.onmouseleave = function() {
                leftTop.removeChild(bigPic);
                smallPic.removeChild(mask);
            }
        }
    }
    // 缩略图动态渲染
    let picList = document.getElementById('picList');

    (function(){
        for(let i = 0; i < imgData.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = `<img src="${imgData[i].s}" alt="">`
            picList.appendChild(li);
        }
    }())
    // 缩略图点击
    let smallPicture = document.querySelector('.container .content .contentContainer .center .left .leftTop .smallPic img');
    smallPicture.src = imgData[0].s;

    let liNodes = document.querySelectorAll('.container .content .contentContainer .center .left .leftBottom .picList li');
    liNodes[0].className = 'active';
    smallpicClike();
    // 外边框
    function  init(i){
        for(let i = 0; i < liNodes.length; i++) {
            liNodes[i].className = '';
        }
        liNodes[i].className = 'active';
    }
    function smallpicClike() {
        for(let i = 0; i < liNodes.length; i++) {
            liNodes[i].onclick = function(){
                bigPicIndex = i;
                smallPicture.src = imgData[i].s;
                init(i);
            }
        }
    }
    // 缩略图切换
    changePic();
    function changePic() {
        let pre = document.querySelector('.container .content .contentContainer .center .left .leftBottom a:first-child');
        let next = document.querySelector('.container .content .contentContainer .center .left .leftBottom a:last-child');
        let step = liNodes[0].offsetWidth + 20;
        pre.onclick = function(){
            bigPicIndex--;
            if(bigPicIndex < 0){
                bigPicIndex = 0;
            }
            init(bigPicIndex)
            if(bigPicIndex > 1 && bigPicIndex < imgData.length - 3){
                picList.style.left = picList.offsetLeft + step + 'px';
            }
            console.log(picList.offsetLeft)
            smallPicture.src = imgData[bigPicIndex].s;
        }
        next.onclick = function(){
            bigPicIndex++;
            if(bigPicIndex === imgData.length){
                bigPicIndex--;
            }
            init(bigPicIndex);

            if(bigPicIndex > 2 && bigPicIndex < imgData.length - 2){
                picList.style.left = picList.offsetLeft - step + 'px';
            }
            smallPicture.src = imgData[bigPicIndex].s;
        }
    }
    // 商品详情动态渲染
    let goodsDetail = goodData.goodsDetail;
    (function(){
        let rightTop = document.querySelector('.container .content .contentContainer .center .right .rightTop')
        rightTop.innerHTML = `<h3>${goodsDetail.title}</h3>
        <p>${goodsDetail.recommend}</p>
        <div class="priceContainer">
            <div class="priceTop">
                <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                <div class="price">
                    <div>
                        <span>￥</span>
                        <p>${goodsDetail.price}</p>
                        <span>降价通知</span>
                    </div>
                    <p>
                        <span>累计评价</span>
                        <span>${goodsDetail.evaluateNum}</span>
                    </p>
                </div>
            </div>
            <div class="priceBottom">
                <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <p>
                    <span>${goodsDetail.promoteSales.type}</span>
                    <span>${goodsDetail.promoteSales.content}</span>
                </p>
            </div>
        </div>
        <div class="support">
            <div>
                <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                <p>${goodsDetail.support}</p>
            </div>
            <div>
                <span>配&nbsp;送&nbsp;至</span>
                <p>${goodsDetail.address}</p>
            </div>
        </div>`
    }())
    // 商品参数动态渲染
    canshu();
    function canshu(){
        let choose = document.querySelector('.container .content .contentContainer .center .right .rightBottom .chooseContainer');
        let detail = goodsDetail.crumbData;
        let fragment = document.createDocumentFragment();
        for(let i = 0; i < detail.length; i++){
            let dlNode = document.createElement('dl');
            let s = `<dt>${detail[i].title}</dt>`;
            for(let j = 0; j < detail[i].data.length; j++){
                s += `<dd changePrice="${detail[i].data[j].changePrice}">${detail[i].data[j].type}</dd>`
            }
            dlNode.innerHTML = s;
            fragment.appendChild(dlNode);
        }
        choose.appendChild(fragment);
    }
    // 商品参数点击事件
    let checkNodes = document.querySelectorAll('.container .detailContainer .right .choose .listContainer .listmiddle li div input');
    let dlNodes = document.querySelectorAll('.container .content .contentContainer .center .right .rightBottom .chooseContainer > dl');
    let oldPrice = document.querySelector('.container .detailContainer .right .choose .listContainer .listleft p')
    let allPrice = document.querySelector('.container .detailContainer .right .choose .listContainer .listright span')
    for(let i = 0; i < dlNodes.length; i++){
        let ddNodes = dlNodes[i].querySelectorAll('dd');
        ddNodes[0].className = 'active';
    }
    
    clickdd();
    function clickdd(){
        // 选择结果重绘函数
        let arr = new Array(dlNodes.length).fill('');
        function repaint(){
            let resultNode = document.querySelector('.container .content .contentContainer .center .right .rightBottom .chooseResult');
            resultNode.innerHTML = '';
            for(let i = 0; i < arr.length; i++){
                if(arr[i]){
                    let divNode = document.createElement('div');
                    divNode.innerHTML = `${arr[i].innerText}<a index="${i}">X</a>`;
                    resultNode.appendChild(divNode);
                }
            }
            // 给x添加点击事件
            let aNodes = document.querySelectorAll('.container .content .contentContainer .center .right .rightBottom .chooseResult div a');
            // console.log(aNodes);
            for(let i = 0; i < aNodes.length; i++){
                aNodes[i].onclick = function(){
                    let index = aNodes[i].getAttribute('index');
                    // console.log(i)
                    arr[index] = '';
                    repaint();
                    let ddNodes = dlNodes[index].querySelectorAll('dd');
                    for(let k = 0; k < ddNodes.length; k++){
                        ddNodes[k].className = '';
                    }
                    ddNodes[0].className = 'active';
                    changePrice(arr);
                }
            }
        }
        // 给每一行的dd添加点击事件
        for(let i = 0; i < dlNodes.length; i++){
            let ddNodes = dlNodes[i].querySelectorAll('dd');
            for(let j = 0; j < ddNodes.length; j++){
                ddNodes[j].onclick = function(e){
                    for(let k = 0; k < ddNodes.length; k++){
                        ddNodes[k].className = '';
                    }
                    ddNodes[j].className = 'active';
                    arr[i] = this;
                    repaint()
                    changePrice(arr);
                }
            }
        }
    }
    // 价格变动
    function changePrice(arr){
        let price = document.querySelector('.container .content .contentContainer .center .right .rightTop .priceContainer .priceTop .price > div > p');
        let changePrice = 0;
        for(let i = 0; i < arr.length; i++){
            if(arr[i]){
                changePrice += Number(arr[i].getAttribute('changeprice'));
            }
        }
        console.log(changePrice);
        price.innerText = goodsDetail.price + changePrice;
        oldPrice.innerHTML = `￥${price.innerText}`;
        let addprice = 0;
        for(let j = 0; j < checkNodes.length; j++){
            if(checkNodes[j].checked){
                addprice += Number(checkNodes[j].value);
            }
        }
        allPrice.innerHTML = `￥${Number(oldPrice.innerHTML.slice(1)) + addprice}`;
    }
    // 配件搭配价格变动
    smallThings();
    function smallThings(){
        for(let i = 0; i < checkNodes.length; i++){
            checkNodes[i].onclick = function(){
                let addprice = 0;
                for(let j = 0; j < checkNodes.length; j++){
                    if(checkNodes[j].checked){
                        addprice += Number(checkNodes[j].value);
                    }
                }
                allPrice.innerHTML = `￥${Number(oldPrice.innerHTML.slice(1)) + addprice}`;
            }
        }
    }
    // tab切换
    function changeTab(tabs, contents){
        for(let i = 0; i < tabs.length; i++){
            tabs[i].onclick = function(){
                for(let j = 0; j < tabs.length; j++){
                    tabs[j].className = '';
                    contents[j].className = '';
                }
                tabs[i].className = 'active';
                contents[i].className = 'active';
            }
        }
    }
    leftSideTab();
    function leftSideTab(){
        let tabs = document.querySelectorAll('.container .detailContainer .left .asideTop h4');
        let divs = document.querySelectorAll('.container .detailContainer .left .asideBottom >div');
        changeTab(tabs, divs);
    }
    rightDetailTab();
    function rightDetailTab(){
        let tabs = document.querySelectorAll('.container .detailContainer .right .rightDetail .detailNav li');
        let divs = document.querySelectorAll('.container .detailContainer .right .rightDetail >div')
        changeTab(tabs, divs);
    }
    // 侧边栏点击
    (function(){
        let btn = document.querySelector('.container .rightAside .controll')
        let content = document.querySelector('.container .rightAside')
        let flag = true;
        btn.onclick = function(){
            if(flag){
                content.className = 'rightAside active'
                btn.className = 'controll active'
            }else{
                btn.className = 'controll'
                content.className = 'rightAside'
            }
            flag = !flag;
        }
    }())
}