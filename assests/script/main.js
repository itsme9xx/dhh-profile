const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const headerMenuList = $(".header__menu__list");
const headerMenuItem = $(".header__menu__item");
const itemCard = $$(".contain__wrap");
const listCategory = $(".list__category");
const itemCategory = $(".item__category");
const nameCategoryItem = $$(".category__name");
const previewPicture = $(".contain__work-item-picture");
const previewVideo = $(".contain__work-item-video");
const previewAudio= $(".contain__work-item-audio");
const previewContent= $(".contain__work-item-content");
const previewGallery= $(".contain__work-item-gallery");
const nameJob = $(".contain__card__job");

const app = {
    counter: 1,
    handleEvent: function() {
        // Animation job name
        var words = ["Web Designer", "Developer"],
            part,
            i = 0,
            offset = 0,
            len = words.length,
            forwards = true,
            skip_count = 0,
            skip_delay = 30,
            speed = 40;
        var wordflick = function () {
        setInterval(function () {
            if (forwards) {
                //words[i].length đ dài của chuỗi trong mảng
                if (offset >= words[i].length) {
                    ++skip_count;
                    //Trì hoãn thời gian xuất hiện cũa văn bản
                    if (skip_count == skip_delay) {
                    forwards = false;
                    skip_count = 0;
                    }
                }
            }
            else {
                //Tăng giá trị mảng, và resetde639 chạy lại từ mới
                if (offset == 0) {
                    forwards = true;
                    i++;
                    offset = 0;
                    if (i >= len) {
                        i = 0;
                    }
                }
            }

            //const str = 'Mozilla';
            //console.log(str.substr(1, 2));
            // expected output: "oz"
            //console.log(str.substr(2));
            // expected output: "zilla"
            part = words[i].substr(0, offset);
            if (skip_count == 0) {
                if (forwards) {
                    offset++;
                }
                //Ẩn đi từng chữ cái
                else {
                    offset--;
                }
            }
            nameJob.innerHTML = part;
            $(".header-job").innerHTML = part;
        },speed);
        };

        wordflick();

        // Slider
        sliderClick = (index) => {
            this.counter = index;
        }
        $("#rd-sl" + app.counter).checked = true;
        setInterval(function() {
            $("#rd-sl" + app.counter).checked = true;
            app.counter++;
            if(app.counter > 3) {
                app.counter = 1;
            }
        }, 3000)
        
        //Lắng nghe sự kiện người dùng touchpad, Không dùng cho web nhưng lưu lại cần khi cần
        // let isTouchDevice = function() {
        //     return (("ontouchstart" in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
        // };
        
        // Xử lí active header khi scroll tới
        document.onscroll = () => {
            let getScrollY  = scrollY;
            itemCard.forEach((item, index) => {
                if(getScrollY >  item.offsetTop - 70 && getScrollY < item.offsetTop + item.offsetHeight) {
                    headerMenuList.querySelector(".active").classList.remove("active");
                    if(headerMenuList.children[index].getAttribute("data-name") === item.getAttribute("data-name")) {
                        headerMenuList.children[index].classList.add("active");
                    }
                }
            });
        }
        // Xử lý khi chọn button Header
        headerMenuList.addEventListener("click", function(element) {
            // kiểm tra width màn hình
            const widthScreen  = window.innerWidth || document.documentElement.clientWidth || 
            document.body.clientWidth;
            const getElementHeader = element.target.closest(".header__menu__item");
            if(widthScreen < 1024) {
                headerMenuList.querySelector(".active").classList.remove("active");
                headerMenuList.style.pointerEvent = "none";
                getElementHeader.classList.add("active");
                let getDataName = getElementHeader.getAttribute("data-name");
                itemCard.forEach(item => {
                    if(item.getAttribute("data-name") === getDataName) {
                        scrollTo(0, item.offsetTop - 60)
                    }
                });
            }else {
                if(!getElementHeader.classList.contains("active")) {
                    headerMenuList.querySelector(".active").classList.remove("active");
                    getElementHeader.classList.add("active");
                    let getDataName = getElementHeader.getAttribute("data-name");
                    itemCard.forEach(item => {
                        if(item.classList.contains("hidden")) {
                            if(item.getAttribute("data-name") === getDataName) {
                                item.classList.remove("hidden");
                                item.style.animationName = "fadeInLeft";
                            }
                        }else {
                            item.style.animationName = "fadeOutLeft";
                            setTimeout(function() {
                                item.classList.add("hidden");
                            }, 500)
                        }
                    })
                }
            }
        });

        // XỬ lý Category Work
         listCategory.onclick = function(element) {
             if(element.target.closest(".item__category")) {
                let getDataNameCategory = element.target.getAttribute("data-name");
                listCategory.querySelector(".category-active").classList.remove("category-active");
                element.target.closest(".item__category").classList.add("category-active");
                nameCategoryItem.forEach(item => {
                    if(item.getAttribute("data-name") === getDataNameCategory || getDataNameCategory === "all") {
                        item.closest(".col").classList.remove("hide");
                        item.closest(".col").classList.add("show");
                    }else {
                        item.closest(".col").classList.add("hide");
                        item.closest(".col").classList.remove("show");
                    }
                });
             }
        }

        // Xử lý Click vào Content Preview
        nameCategoryItem.forEach(item => {
            item.closest(".work__contain").onclick = function() {
                let getSrcImage = item.closest(".work__contain").querySelector(".work__image img").getAttribute("src");
                if(item.getAttribute("data-name") === "image") {
                    previewPicture.classList.remove("disable");
                    previewPicture.querySelector("img").setAttribute("src", getSrcImage);
                    previewPicture.querySelector("i").onclick = function() {
                        previewPicture.classList.add("disable");
                    }    
                }else if(item.getAttribute("data-name") === "video") {
                    previewVideo.classList.remove("disable");
                    $(".yvideo").setAttribute("src", "https://www.youtube.com/embed/j9VLOXdx9VQ");
                    previewVideo.querySelector("i").onclick = function() {
                        previewVideo.classList.add("disable");
                        $(".yvideo").setAttribute("src", " ");
                    }
                }else if(item.getAttribute("data-name") === "music") {
                    previewAudio.classList.remove("disable");
                    previewAudio.querySelector("i").onclick = function() {
                        previewAudio.classList.add("disable");
                        previewAudio.querySelector("audio").load();
                    }
                }else if(item.getAttribute("data-name") === "content") {
                    previewContent.classList.remove("disable");
                    previewContent.querySelector("img").setAttribute("src", getSrcImage);
                    previewContent.querySelector("i").onclick = function() {
                        previewContent.classList.add("disable");
                    }
                }else {
                    previewGallery.classList.remove("disable");
                    let index = 0;
                    previewGallery.querySelector(".exit i").onclick = function() {
                        previewGallery.classList.add("disable");
                    }
                    $(".nav-left").onclick = function() {
                        index--;
                        $(".current-page").innerHTML = index;
                        $(".nav-right").classList.remove("disable");
                        previewGallery.querySelector("img").setAttribute("src", nameCategoryItem[index].closest(".work__contain").querySelector(".work__image img").getAttribute("src"));
                        if(index === 0) {
                            $(".nav-left").classList.add("disable");
                        }
                    }
                    $(".nav-right").onclick = function() {
                        index++;
                        $(".current-page").innerHTML = index;
                        $(".nav-left").classList.remove("disable");
                        previewGallery.querySelector("img").setAttribute("src", nameCategoryItem[index].closest(".work__contain").querySelector(".work__image img").getAttribute("src"));
                        if(index === 7) {
                            $(".nav-right").classList.add("disable");
                        }
                    }
                }
            }
        });
    },


    start: function() {
        this.handleEvent();
    }
};

app.start();