# Pagination bar (分頁) UI
###### tags: `UI` `Pagination`

搜尋關鍵字：web pagination design。
當API取得資料之後，如何表達資料、如何翻頁、分頁，是前端 UI 介面所要學習的。

### Github 作品
[UI_Pagination_Bar](https://github.com/capeta0507/UI_Pagination_Bar)

### 設計樣板

下圖為搜尋設計：
![](https://i.imgur.com/AkKNmzD.png)


下圖為分頁按鈕設計：
![](https://i.imgur.com/iPTYROl.png)

我們將會用 [Unsplash](https://unsplash.com/) 圖檔的網站，提供圖片搜尋的 API 來取得資料之後，進行資料顯示的分頁練習。

### Unsplash API 教學
1. [Photo Search Using the Unsplash API](https://www.youtube.com/watch?v=Rvv8xheoINc)
2. [How to make a flat design search box | HTML & CSS](https://www.youtube.com/watch?v=csY6KW7cIUM)
3. [Pagination UI Design Using Html CSS and jQuery | next() Prev()](https://www.youtube.com/watch?v=nRUbvKTiq8Y)
4. [How To Create Pagination Design using HTML and CSS || UI Tutorial](https://www.youtube.com/watch?v=mU--VbRr-hM)

### Unsplash 註冊申請
1. 到 Unsplash 去註冊一個帳號
用 FB 註冊，填入以下資料
1. 註冊資料
First name : David
Last name : Chan
Email address : davidtpe@seed.net.tw
Username : davidtpe
Password : david4255
1. 到 your apps 去註冊開發API申請
Application name : Photo_Search
Description : Unsplash_Search (Test)
Access Key : z2lKI1fv5HipWjpXTi6YFxymvT6Fg1z5mIDBIYK3RqA
Secret key : 6wK882suToEl_XLY43SPgpV2qv28VNel6zNfaes0Jck
1. 閱讀 [API Documenation](https://unsplash.com/documentation)
2. API Search photos 參數 [Search photos](https://unsplash.com/documentation#search-photos)

### postman API Test
用 postman get 呼叫 https://api.unsplash.com/search/photos/?query=sky&client_id=z2lKI1fv5HipWjpXTi6YFxymvT6Fg1z5mIDBIYK3RqA

可以得到 json response
![](https://i.imgur.com/qyk2vRY.png)

### 影像、影片網站
1. (圖檔)[Unsplash](https://unsplash.com/)
2. (圖檔)[Pexels](https://www.pexels.com/)
3. (影像壓縮) [SHORT PIXEL](https://shortpixel.com/)
4. (電影資料庫)[TMDb](https://www.themoviedb.org/?language=zh-TW)

### 所需要的程式邏輯
前端人員在 API 呼叫後端，取得資料後，一般來講會取得符合條件的多筆紀錄，以陣列整批取得，並且以 JSON 結構來表達紀錄。

取得多筆資料之後，必須妥善的以變數與運算來表達。以下是會用到的變數參考。

---
計算筆數與頁數
1. 總筆數：recTotal。
2. 單頁筆數：perPage。
3. 總頁數：pageTotal = Math.ceil(recTotal / perPage)。
4. 大頁數：perBigPage (代表每幾頁切成大頁)(通常是10)。
5. 總大頁數：bigPageTotal = Math.ceil(pageTotal / perBigPage)。
6. 本大頁次：currBigPageNo = 1 (由 1 開始到 bigPageTotal)。
範圍是 1~bigPageTotal
---
計算翻頁與顯示
1. 本頁頁次：currPageNo = 1 (由 1 開始到 pageTotal)。
2. 本頁起始紀錄：currRecord_Begin = (currPageNo - 1) * perPage。
3. 本頁結束紀錄：currRecord_End = currRecord_Begin + perPage - 1，不能超過 (recTotal - 1)，代表最後1頁的最後1筆。
4. currPage_Begin = (currBigPageNo - 1) *  perBigPage + 1。
5. currPage_End = currPage_Begin + perBigPage - 1。
currPage_End 必須 <= pageTotal。
---
點選頁號碼切換頁次
1. currPageNo = 選定的頁號碼。
2. 計算 currRecord_Begin。
3. 計算 currRecord_End，如果超過 (recTotal - 1)，currRecord_End = rec_Total - 1。
4. 顯示該頁紀錄 currRecord_Begin ~ currRecord_End 顯示循環。
---
上1頁、下1頁、上10頁、下10頁
1. 上1頁：計算 currPageNo = currPageNo - 1，不得低於 1。
2. 下1頁：計算 currPageNo = currPageNo + 1，不得高於 pageTotal。
3. 上10頁：計算 currBigPageNo = currBigPageNo - 1，不得低於 1。
4. 下10頁：計算 currBigPageNo = currBigPageNo + 1，不得高於 bigPageTotal。
5. 上10頁、下10頁，每次有異動，重新計算 currPageNo = (currBigPageNo - 1) * perBigPage + 1。

---
### 非 Pagination bar 控制
在資料量非常龐大的系統，分頁顯示或許不是最適當的方法，像 Facebook、Unsplash、yahoo 新聞、Youtube 搜尋/顯示，都不是採用分頁方式來顯示資料的。
他們是採用畫面捲動到底部前才開始讀取下一階段的資料，並且持續顯示下去的。

參考教學：
1. [The "scroll" event in JavaScript | window.onscroll](https://www.youtube.com/watch?v=V9CY0F4Wc7M)
2. [Back To Top (Scroll To Top) Button Using HTML5, CSS and JavaScript](https://www.youtube.com/watch?v=SJVCvnKM_lI)

程式範例：index_scroll.html
下面程式碼說明 window.addEventListener('scroll', function(){}); 來監測畫面的捲動處理。
程式中還取消了 jQuery 的引用，直接採用 javascript 來撰寫，但是，讀取 API 的動作保留 axios 好用的功能。

```javascript=
window.addEventListener('scroll', function(){
      if((document.documentElement.scrollHeight - window.innerHeight) === Math.ceil(window.scrollY) ){
        console.log("bottom! ... append");
        toTopBun.classList.add("active");  // 顯示 TOP 按鈕

        search = document.getElementById("mySearch").value;
        let search_resilt = '';
        let page_list = '';
        console.log(search);
        currPageNo += 1;
        console.log("...currPageNo:" + currPageNo);
        imageAPI =  API + `&query=${search}&per_page=${perPage}&page=${currPageNo}`
        
        if (pageTotal < currPageNo){
          console.log("圖檔搜尋結束");
        } else {
          read_show();
        }
      }
    });
```
如此程式便不需使用繁雜的分頁顯示技巧來處理大量資訊的顯示。
