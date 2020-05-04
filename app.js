$(function () {
    //自动换页的定时器
    let autoChangeTimer
    let isRunning = false

    autoChange()
    clickChange()
    clickPointerChange()
    /*
    * 点击下方按钮切换图片函数
    * */
    function clickPointerChange() {
        let $li = $('#pointer>li')
        let $imgList = $('.img-list')
        // let current =  $imgList.position().left
        let index      //点击的位置所代表的图片
        $li.click(function () {
            let current =  $imgList.position().left
            index = $(this).index()
            let expectPos = (index+1)*-600
            if(expectPos !== current)  //如果目标不是当前图片才会执行
            {
                clearInterval(autoChangeTimer)
                imgChange(expectPos)
                autoChange()
            }
        })
    }
    /*
    * 自动切换函数
    * */
    function autoChange() {
        autoChangeTimer = setInterval(function () {
            imgChange(true)
        }, 3000)
    }
    /*
    *   点击切换函数，只是单纯调用一下下边的函数
    * */
    function clickChange() {
        let $leftArrow = $('.arrow-left')
        let $rightArrow = $('.arrow-right')
        //清除自动切换定时器
        $leftArrow.click(function () {
            imgChange(false)
            clearInterval(autoChangeTimer)
            //清除定时器后再执行函数
            autoChange()
        })
        $rightArrow.click(function () {
            imgChange(true)
            clearInterval(autoChangeTimer)
            autoChange()
        })
    }
    /*
    *   图片切换函数 点击左右箭头切换图片
    *   param: item
    *   为true时切换至下一张
    *   为false时切换至上一张
    *   为数字时表示切换到指定图片
    * */
    function imgChange (item){
         if(isRunning)
            return
        isRunning = true
        let $ul = $('.img-list')
        let $pointer = $('#pointer')
        //左右箭头按钮，及其定时器
        let arrowTimer, imgIndex

        //得到当前的left值
        let current =  $ul.position().left
        let imgWidth = $ul.children(':first').width()
        
        let target
        let movingTime, itemTime   //总移动时间以及每次移动的间隔时间
        let itemSpeed              //每次移动的距离
        if(typeof item ==='boolean'){
            target = item? current-imgWidth : current+imgWidth
        }else{
            target = item
        }

        movingTime = 400
        itemTime = 4
        itemSpeed = (target - current)/(movingTime/itemTime)

        console.log(current, target, itemSpeed)

        arrowTimer = setInterval(function () {
            current = current + itemSpeed
            $ul.css('left', current)
            if(target === current){
                //图片到最后一张之后瞬间回到第一张 图片戏法
                if(current === -3600){
                    current = -600
                    $ul.css('left', current)
                }
                if(current === 0){
                    current = -3000
                    $ul.css('left', 3000)
                }
                imgIndex = ~~(-600 - current)/600
                let str = ':eq('+ imgIndex +')'
                $pointer.children().removeClass('on')
                $pointer.children(str).addClass('on')

                clearInterval(arrowTimer)
                isRunning = false
            }
            }, itemTime)

    }

})