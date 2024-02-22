(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        factory(require("sweetalert2"));
    } else if (typeof define === 'function' && define.amd) {
        define(['sweetalert2'], factory);
    } else {
        factory(global.Swal);
    }
})(this, function (Swal) {
    // alert('脚本运行中...');

    // 错误信息输出机制
    let ERROR = {
        ERROR_FLAG: "[SEAYJ TOOLS ERROR]:",
        ERROR_MAIN: "",// 仅需要提供此处信息即可
        ERROR_AUXILIARY_INFO: "Please provide this information to the script developer for addressing your issue.",
        ERROR_FEEDBACK: "https://www.seayj.cn/",
        CLOG_ERROR_INFO: () => {
            console.error(ERROR.ERROR_FLAG + ERROR.ERROR_MAIN + "\n" + ERROR.ERROR_AUXILIARY_INFO + "\n" + ERROR.ERROR_FEEDBACK);
        }
    };

    //////
    /// B站相关的扩展功能实现
    /// - B站扩展模块按钮（封面下载按钮、视屏下载按钮）
    //////
    let Bilibili = {
        videoExtensionModuleBtnContainer: "#arc_toolbar_report>div.video-toolbar-left>div.video-toolbar-left-main",
        videoCoverItemSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1160 1024" class="video-coin-icon video-toolbar-item-icon" width="28" height="28"><path fill-rule="evenodd" clip-rule="evenodd" d="M767.4 127.8h-512c-33.9 0-66.5 13.5-90.5 37.5s-37.5 56.6-37.5 90.5V719c40.2-72.1 116.3-119.2 202-119.2 40.4 0 78.4 10.4 111.5 28.6 42-94.6 134.8-156.6 240.5-156.6 85.8 0 164.8 41.1 214 109.4V255.8c0-33.9-13.5-66.5-37.5-90.5s-56.5-37.5-90.5-37.5z m-96 304c-61.7 0-112-50.3-112-112s50.3-112 112-112 112 50.3 112 112-50.2 112-112 112z m0 0" fill="currentColor"></path><path d="M872.7 635.4c-37.2-71.2-111-115.8-191.3-115.6-89.7 0-167.9 54.6-200.3 136.9 51 43.9 80.3 107.9 80.3 175.1-0.2 21.7-3.3 43.2-9.4 64h215.4c33.9 0 66.5-13.5 90.5-37.5s37.5-56.6 37.5-90.5V648.1c-9.4 0.6-18.3-4.4-22.7-12.7z m0 0M329.4 647.8c-84.1-0.1-157.6 56.9-178.4 138.5-2.3 8.7-9.2 15.3-18 17.2 15.5 53.2 64.1 92.3 122.3 92.3h248.3c0-2.5 0-4.9 0.8-7.4 18-56 8.2-117.2-26.4-164.8-34.5-47.5-89.8-75.7-148.6-75.8z m0 0" fill="currentColor"></path></svg>',
        videoItemSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1244 1024" class="video-coin-icon video-toolbar-item-icon" width="28" height="28"><path fill-rule="evenodd" clip-rule="evenodd" d="M460.458667 263.125333L339.541333 120.874667H202.666667l120.874666 142.250666h136.917334z m355.541333 0l-120.874667-142.250666h-136.917333l120.917333 142.250666h136.874667z m-177.792 0l-120.874667-142.250666H380.458667l120.874666 142.250666h136.874667z m229.333333-142.250666H736l120.874667 142.250666h64V174.208c0-30.208-23.082667-53.333333-53.333334-53.333333z m-705.749333 0h-5.333333c-30.250667 0-53.333333 23.125333-53.333334 53.333333v88.917333h179.541334L161.792 120.874667zM103.125333 849.792c0 30.208 23.082667 53.333333 53.333334 53.333333h711.082666c30.250667 0 53.333333-23.125333 53.333334-53.333333V298.666667H103.125333v551.125333z m284.416-391.125333c0-30.208 24.917333-44.458667 53.333334-44.458667 8.917333 0 19.584 1.792 28.458666 7.125333l202.666667 117.333334a50.346667 50.346667 0 0 1 0 88.874666L469.333333 744.874667a52.181333 52.181333 0 0 1-28.458666 7.125333c-28.416 0-53.333333-14.208-53.333334-44.458667V458.666667z" fill="currentColor"></path></svg>',
        videoCoverDownloadDialogTitle: [
            '封面来啦~',
            '哈哈哈，封面来咯~',
            '这是你掉的封面吗？',
            '是封面啦，快来看看！',
            '封面送上门，赶紧领取！',
            '这不是梦，是真的封面，快来拿！',
            '封面来啦，打开看看吧！',
            '哈哈哈，封面又来报到了！'
        ],
        videoCoverDownloadDialogText: [
            '生活不仅有眼前的苟且，还有诗和远方。',
            '人生就像一杯茶，不会苦一辈子，但会苦一阵子。',
            '人生就像一盒巧克力，你永远不知道下一颗是什么味道。',
            '活着就是为了改变世界，难道还有其他原因吗？',
            '人生就是一场修行，磨难是前行的阶梯。',
            '人生最大的错误，就是不断担心会犯错。',
            '人生就像一部电影，哭过、笑过、留下遗憾，但最后一定要精彩收场。',
            '生活不是等待风暴过去，而是学会在雨中翩翩起舞。'
        ],
        API: {
            videoInfo: "https://api.bilibili.com/x/web-interface/view"
        },
        aidRegex: /[Aa][Vv][0-9]+/g,
        bvidRegex: /[Bb][Vv][1-9A-HJ-NP-Za-km-z]{10}/g,
        aid: '',
        bvid: ''
    };

    Bilibili.getRandomNumbers = function (min, max) {
        const timestamp = Date.now();
        const seed = timestamp + Math.floor(Math.random() * 1000);  // 随机种子
        return Math.floor(Math.random(seed) * (max - min) + min);
    }

    Bilibili.getVideoIdentifier = function () {
        // 获取路径
        let path = window.location.pathname;

        let videoIdentifier = path.match(Bilibili.bvidRegex);   // 尝试获取 BVID
        if (!videoIdentifier) {
            videoIdentifier = path.match(Bilibili.aidRegex);    // BVID 获取失败，尝试获取 AID
            if (!videoIdentifier) {                             // 未获取 AID 或 BVID
                ERROR_MAIN = "'videoIdentifier' is null.";
                return ERROR.CLOG_ERROR_INFO();
            }

            Bilibili.aid = videoIdentifier;
        }

        Bilibili.bvid = videoIdentifier;
    }

    Bilibili.videoCoverDownload = function () {
        // 重获取当前视频标识
        Bilibili.getVideoIdentifier();

        let url = "";
        if (Bilibili.bvid) {
            url = Bilibili.API.videoInfo + "?bvid=" + Bilibili.bvid;
        } else if (Bilibili.aid) {
            url = Bilibili.API.videoInfo + "?aid=" + Bilibili.aid;
        }

        // 使用 fetch 发起 GET 请求
        fetch(url)
            .then(response => {
                // 检查响应是否成功
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // 将响应转换为 JSON 格式
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    title: Bilibili.videoCoverDownloadDialogTitle[Bilibili.getRandomNumbers(0, Bilibili.videoCoverDownloadDialogTitle.length)],
                    text: Bilibili.videoCoverDownloadDialogText[Bilibili.getRandomNumbers(0, Bilibili.videoCoverDownloadDialogText.length)],
                    imageUrl: data.data.pic,// 解析 JSON 数据
                    imageAlt: "Video Cover",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "下载",
                    cancelButtonText: "取消",
                    footer: '<a href="https://github.com/SeaYJ/SeaYJTools/issues" target="_blank">Encountered any difficulties? Please tell me here.</a>',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // 通过 Fetch API 创建 Blob 对象下载图片
                        fetch(url)
                            .then(response => { // 检查网络问题
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.blob();
                            })
                            .then(blob => {     // 下载图片
                                const url = window.URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;                // 设置<a>元素的 href 属性为 Blob URL
                                link.download = 'image.jpg';    // 设置<a>元素的 download 属性为要保存的文件名
                                link.click();                   // 模拟点击<a>元素来触发下载
                                window.URL.revokeObjectURL(url);// 释放 Blob URL 对象
                                Swal.fire({                     // 提示下载成功
                                    icon: "success",
                                    title: "已保存",
                                    timer: 1600,                // 自动关闭倒计时（毫秒）
                                    timerProgressBar: true      // 倒计时进度条
                                });
                            })
                            .catch(error => {
                                ERROR.ERROR_MAIN = 'There was a problem with the fetch operation(Download failed):' + error;
                                ERROR.CLOG_ERROR_INFO();
                            });
                    } else if (result.isDismissed) {
                        // 取消了，不做操作
                    }
                });;
            })
            .catch(error => {
                // 处理错误
                ERROR.ERROR_MAIN = 'There was a problem with your fetch operation:' + error;
                ERROR.CLOG_ERROR_INFO();
            });
    }

    Bilibili.addVideoExtensionModuleBtn = function () {
        let replyBoxTextarea = document.querySelector(".reply-box-textarea");
        let commentSubmit = document.querySelector(".comment-submit");
        if (replyBoxTextarea || commentSubmit) {
            let videoInfoDetail = document.querySelector(".video-info-detail");
            if (videoInfoDetail) {
                // 获取页面对应位置的 DOM 容器
                const videoToolbarLeftMain = document.querySelector(Bilibili.videoExtensionModuleBtnContainer);
                if (!videoToolbarLeftMain) {
                    ERROR.ERROR_MAIN = "'videoToolbarLeftMain' is null.";
                    return ERROR.CLOG_ERROR_INFO();
                }

                // 为了使按钮间的 margin 被 B 站自动管理，这里需要获取 Vue 项目中生成的 data-v-xxx 属性。
                // 因为这个属性与文件路径有关，并且调试环境与开发环境可能还会产生不一致，
                // 所以，直接使用 JS 读取已经生成的元素身上的 data-v-xxx 属性才较为合理。
                // 这里已页面中对应位置的 DOM 容器的 data-v-xxx 属性为获取目标，
                // 如果按钮元素 margin 失效，则应该优先考虑此处代码。
                let attributes = videoToolbarLeftMain.attributes;   // 获取元素的所有属性
                let dateVName;
                for (let i = 0; i < attributes.length; i++) {       // 遍历所有属性，找到以 data-v- 开头的属性
                    dateVName = attributes[i].name;
                    if (dateVName.startsWith('data-v-')) {
                        break;                                      // 如果找到了符合条件的属性，跳出循环
                    }
                }

                // 创建“封面下载”按钮
                const videoCoverItemWrap = document.createElement("div");
                videoCoverItemWrap.classList.add("toolbar-left-item-wrap");
                videoCoverItemWrap.setAttribute(dateVName, "");         // 决定了 margin 样式是否会被使用

                const videoCoverIteam = document.createElement("div");
                videoCoverIteam.classList.add("video-cover");
                videoCoverIteam.classList.add("video-toolbar-left-item");
                videoCoverIteam.setAttribute('title', "封面下载");      // 鼠标悬停提示

                const videoCoverIteamText = document.createElement("span");
                videoCoverIteamText.classList.add("video-like-info");   // 这个样式直接与“点赞”按钮保持一致
                videoCoverIteamText.classList.add("video-toolbar-item-text");
                videoCoverIteamText.textContent = "封面";               // 实际显示文字

                videoCoverIteam.addEventListener('click', Bilibili.videoCoverDownload);

                // 创建“视频下载”按钮
                const videoItemWrap = document.createElement("div");
                videoItemWrap.classList.add("toolbar-left-item-wrap");
                videoItemWrap.setAttribute(dateVName, "");              // 决定了 margin 样式是否会被使用

                const videoIteam = document.createElement("div");
                videoIteam.classList.add("video-download");
                videoIteam.classList.add("video-toolbar-left-item");
                videoIteam.setAttribute('title', "视频下载");           // 鼠标悬停提示

                const videoIteamText = document.createElement("span");
                videoIteamText.classList.add("video-like-info");        // 这个样式直接与“点赞”按钮保持一致
                videoIteamText.classList.add("video-toolbar-item-text");
                videoIteamText.textContent = "视频";                    // 实际显示文字

                // 组装元素
                videoCoverIteam.innerHTML = Bilibili.videoCoverItemSvg;
                videoCoverIteam.appendChild(videoCoverIteamText);
                videoCoverItemWrap.appendChild(videoCoverIteam);
                videoIteam.innerHTML = Bilibili.videoItemSvg;
                videoIteam.appendChild(videoIteamText);
                videoItemWrap.appendChild(videoIteam);

                // 向页面中添加新DOM元素
                videoToolbarLeftMain.insertAdjacentElement("beforeend", videoCoverItemWrap);
                videoToolbarLeftMain.insertAdjacentElement("beforeend", videoItemWrap);
            }
        } else {
            setTimeout(Bilibili.addVideoExtensionModuleBtn, 1000); // 每隔一秒重新检查一次
        }
    }

    Bilibili.addVideoExtensionModuleBtn(); // 初始调用


    // alert('脚本运行完毕！');
});
