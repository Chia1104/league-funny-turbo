import Image from "next/image";
import Link from "next/link";

const AdvertisePage = () => {
  return (
    <article>
      <div className="advertise">
        <div className="banner-bg">
          <div className="banner-logo">
            <Image
              src="/advertise/advertise_top2.png"
              alt="/advertise/advertise_top2"
              width={600}
              height={600}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex item-start">
              <h1 className="text-white text-3xl font-medium">廣告刊登</h1>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-white ml-2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </span>
            </div>
            <p className="ad-en">ADVERTISE</p>
          </div>
        </div>
        <div className="banner2">
          <div className="mx-4 flex-1">
            <p className="banner2-title">分享最令人共鳴的，</p>
            <p className="banner2-title">只有有玩遊戲的玩家們才懂才會分享。</p>
            <p className="banner2-content mt-4">
              迎接新世代的電競時代，遊戲大亂鬥歡迎您的到來，我們是最精準的遊戲類廣告投放網站。
            </p>
          </div>
          <div className="btns">
            <Link href="#detail">
              <button className="ad-btn">了解詳細</button>
            </Link>
            <Link href={"https://www.facebook.com/messages/t/GameSmash"}>
              <button className="ad-btn">立即洽詢</button>
            </Link>
          </div>
        </div>
        <div className="advertise-content">
          <div className="audience w-bg-secondary">
            <div className="title" id="detail">
              <p className="subtxt">我們的觀眾</p>
              <p className="subtxt2">OUR AUDIENCE</p>
            </div>
            <div className="advertise-img">
              <Image
                className="img"
                src="/about/about_img1.png"
                alt="about/img1"
                width={350}
                height={350}
              />
              <div className="content">
                <p className="tr">
                  單月
                  <br />
                  平均瀏覽點擊 <span className="sign">1,000 萬+</span>
                </p>
                <p className="tr2">60%以上是 18-24歲</p>
                <p className="tr3">資料來源 Google Analytics , Facebook.</p>
              </div>
            </div>
            <div className="advertise-img w-bg-other block-2">
              <div className="content block-2-txt">
                <p className="tr">facebook粉絲</p>
                <p className="sign">52 萬人</p>
                <span className="tr2">單篇貼文平均</span>
                <span className="tr2 is-lg">2,500個讚、3萬8千個互動</span>
                <p className="tr3">資料來源 Facebook.</p>
              </div>
              <Image
                className="img"
                src="/about/about_img2.png"
                alt="about/img2"
                width={350}
                height={350}
              />
            </div>
            <div className="advertise-img">
              <Image
                className="img"
                src="/about/about_img3.png"
                alt="about/img3"
                width={350}
                height={350}
              />
              <div className="content">
                <p className="tr">
                  <span className="sign">52% </span>
                  的使用者
                </p>
                <p className="tr">是使用行動裝置瀏覽我們網站</p>
                <p className="tr2">而且不斷增加中</p>
                <p className="tr3">資料來源 Google Analytics.</p>
              </div>
            </div>
          </div>
          <div className="last">
            <p className="last-sentence">歡迎您來信詢問刊登廣告。</p>
            <Link href={"https://www.facebook.com/messages/t/GameSmash"}>
              <button className="last-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-3">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span>立即洽詢</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AdvertisePage;
