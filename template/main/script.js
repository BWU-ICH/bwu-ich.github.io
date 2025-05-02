// function categoriesButtoncolorChange(event)
// {
//     for (var i = 0 ){

//     }
//     var content = event.target.id
//     content = 
//     alert(event.target.id)
// } 
document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取文章列表容器
    const articlesContainer = document.querySelector('.category-content');
    
    // 2. 使用事件委托监听点击事件
    articlesContainer.addEventListener('click', function(e) {
        // 3. 检查点击的是否是文章项
        const articleItem = e.target.closest('.content-item');
        
        if (articleItem) {
            // 4. 阻止默认行为（如果有链接被点击）
            e.preventDefault();
            
            // 5. 获取data-url属性中的跳转链接
            const targetUrl = articleItem.getAttribute('data-url');
            
            // 6. 验证链接是否存在
            if (targetUrl) {
                // 7. 跳转到对应页面
                window.location.href = targetUrl;
            } else {
                console.error('未找到文章链接:', articleItem);
            }
        }
    });
    
    // 8. 阻止文章内链接的冒泡（可选）
    document.querySelectorAll('.content-item a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // 动态加载通知公告
    loadNotices();
    highlightType();
});

// 动态加载通知公告
function loadNotices() {
    const noticesContainer = document.querySelector('.announcements-container .announcements:nth-child(2) ul');

    // 动态读取上上级目录中的 JSON 文件列表
    fetch('../../articles/list.json') //list.json 文件列出所有公告文件
        .then(response => {
            if (!response.ok) {
                throw new Error("无法加载公告列表");
            }
            return response.json();
        })
        .then(notices => {
            // 清空公告列表
            noticesContainer.innerHTML = '';

            // 遍历公告列表并生成 HTML
            notices.forEach(notice => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = notice.url;
                link.textContent = notice.title;
                listItem.appendChild(link);
                noticesContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("加载公告失败:", error);
        });
}

// 根据 URL 中的 type 参数设置对应元素的颜色
function highlightTypeLeft() {
    // 获取 URL 中的 type 参数
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (!type) return; // 如果没有 type 参数，直接返回

    // 查找对应的链接元素
    const links = document.querySelectorAll('.announcements ul li a');
    links.forEach(link => {
        if (link.href.includes(`type=${type}`)) {
            link.style.color = '#ff5757'; // 设置颜色为 #ff5757
            link.style.fontWeight = 'bold'; // 可选：加粗文字
        } else {
            link.style.color = ''; // 重置其他链接的颜色
            link.style.fontWeight = ''; // 重置其他链接的字体
        }
    });
}

// 根据 URL 中的 type 参数设置对应元素的颜色
function highlightTypeRight() {
    // 获取 URL 中的 type 参数
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (!type) return; // 如果没有 type 参数，直接返回

    // 查找右侧分类栏中的链接元素
    const links = document.querySelectorAll('#categories a');
    links.forEach(link => {
        if (link.href.includes(`type=${type}`)) {
            link.style.color = 'black'; // 设置颜色为黑色
            link.style.fontWeight = 'bold'; // 可选：加粗文字
        } else {
            link.style.color = ''; // 重置其他链接的颜色
            link.style.fontWeight = ''; // 重置其他链接的字体
        }
    });
}

// 页面加载时调用
document.addEventListener('DOMContentLoaded', highlightTypeLeft);
document.addEventListener('DOMContentLoaded', highlightTypeRight);

// 动态加载 material 文件夹中的 HTML 内容
function loadMaterialContent() {
    // 获取 URL 中的 type 参数
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (!type) return; // 如果没有 type 参数，直接返回

    // 构造对应的 HTML 文件路径
    const materialFilePath = `../material/html/${type}.html`;

    // 获取内容容器
    const contentContainer = document.querySelector('.category-content');

    // 使用 fetch 加载对应的 HTML 文件
    fetch(materialFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`无法加载文件: ${materialFilePath}`);
            }
            return response.text();
        })
        .then(htmlContent => {
            // 将加载的 HTML 内容插入到容器中
            contentContainer.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('加载内容失败:', error);
            contentContainer.innerHTML = `
                <p style="color: red;">无法加载内容，请检查文件路径或网络连接。</p>
            `;
        });
}

// 页面加载时调用
document.addEventListener('DOMContentLoaded', loadMaterialContent);

// 根据 URL 中的 type 参数动态加载对应的 CSS 文件
function loadMaterialCSS() {
    // 获取 URL 中的 type 参数
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (!type) return; // 如果没有 type 参数，直接返回

    // 构造对应的 CSS 文件路径
    const cssFilePath = `../material/css/${type}.css`;

    // 创建 <link> 元素
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = cssFilePath;

    // 将 <link> 元素插入到 <head> 中
    document.head.appendChild(linkElement);

    // 打印加载状态到控制台（可选）
    console.log(`加载了 CSS 文件: ${cssFilePath}`);
}

// 页面加载时调用
document.addEventListener('DOMContentLoaded', loadMaterialCSS);

// 轮播图效果
window.onload = function(){
    var box=this.document.getElementsByClassName("re")[0];
    var lik=box.getElementsByTagName("li");
    function fun(i,j){//转换图片函数，就是把透明度改了一下
      lik[i].style.opacity=1;
      lik[j].style.opacity=0;
      lik[i+5].style.backgroundColor="#ffffff";//改一下小图标
      lik[j+5].style.backgroundColor="#00000000"
    }
    fun(0,1);//初始化下
    var i =0;
    function auto(){//轮播循环函数
      if(++i>=5){
        i=0;
        fun(0,4);
      }
      else fun(i,i-1);
    }
    timer=this.setInterval(auto,2000);
    box.onmouseover = function () { //鼠标划上去，停止轮播
      console.log('good');
      clearInterval(timer);
    }
    box.onmouseout = function () { //鼠标划出，继续轮播
      timer = setInterval(auto, 2000); //调用定时器
    }
    var j =0;
    for(;j<5;j++){//点击小图标也可以转换图片
      lik[j+5].ind=j;
      lik[j+5].onclick=function(){
        fun(this.ind,i)
        i=this.ind;
      }
    }
  }