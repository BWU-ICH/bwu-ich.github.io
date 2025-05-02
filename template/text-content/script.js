// function categoriesButtoncolorChange(event)
// {
//     for (var i = 0 ){

//     }
//     var content = event.target.id
//     content = 
//     alert(event.target.id)
// }
// 返回按钮功能
document.querySelector('.back-button')?.addEventListener('click', function() {
    // 返回非遗项目列表页
    window.location.href = '../ichproject/index.html';
});

// 动态加载文章内容并渲染 Markdown
function loadArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        document.getElementById('article-title').textContent = "文章不存在";
        document.getElementById('article-content').innerHTML = `
            <p>抱歉，找不到您请求的文章。</p>
            <a href="../ichproject/index.html">返回首页</a>
        `;
        return;
    }

    // 动态读取文章 JSON 文件
    fetch(`../../articles/${articleId}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error("文章文件不存在");
            }
            return response.json();
        })
        .then(article => {
            // 设置页面标题
            document.title = article.title + " - 守艺";

            // 设置面包屑导航
            document.getElementById('breadcrumb').innerHTML = `
                <p>首页 > ${article.category} > ${article.title}</p>
            `;

            // 设置文章标题
            document.getElementById('article-title').textContent = article.title;

            // 动态加载文章的 .md 文件内容
            fetch(`../../articles/${articleId}.md`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("文章内容文件不存在");
                    }
                    return response.text();
                })
                .then(mdContent => {
                    // 使用 marked.js 渲染 Markdown 为 HTML
                    const htmlContent = marked.parse(mdContent);

                    // 将渲染后的 HTML 插入到页面中
                    document.getElementById('article-content').innerHTML = `
                        <div class="article-text-content">
                            ${htmlContent}
                        </div>
                    `;
                })
                .catch(error => {
                    console.error("加载文章内容失败:", error);
                    document.getElementById('article-content').innerHTML = `
                        <p style="color: red;">无法加载文章内容，请检查文件路径或网络连接。</p>
                    `;
                });
        })
        .catch(error => {
            console.error(error);
            document.getElementById('article-title').textContent = "文章不存在";
            document.getElementById('article-content').innerHTML = `
                <p>抱歉，找不到您请求的文章。</p>
                <a href="../ichproject/index.html">返回首页</a>
            `;
        });
}

// 页面加载时调用
document.addEventListener('DOMContentLoaded', loadArticle);

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
document.addEventListener('DOMContentLoaded', loadNotices);

