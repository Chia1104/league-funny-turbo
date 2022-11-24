import Image from "next/image";
import Link from "next/link";
import "./about.scss";

const AboutPage = () => {
  return (
    <article>
      <div className="about">
        <div className="banner-bg">
          <div className="banner-logo"></div>
        </div>
        <div className="article">
          <div className="title">
            <h1 className="title-logo">關於“遊戲大亂鬥”</h1>
            <hr className="title-hr"></hr>
          </div>
          <div className="article-about">
            <p className="py-2">
              「遊戲大亂鬥」網站創立於 2012
              年，主要致力於推廣台灣電子競技以及實況影片、直播之電競社群。
            </p>
            <p className="py-2">
              成立的初衷是常常在 YouTube
              上可以發現國外玩家行之有年的將自己的遊戲電競影片剪輯後上傳分享的風氣，在台灣還不見普及。為了推廣讓網友除了看遊戲實況，也可以將自己有趣的影片上傳分享，開始了我們精心挑選引進外國影片分享給網友，最終想要推動華人地區的玩家們人人皆分享電競實況影片的風氣。也讓更多玩家可以不只玩遊戲也可以從中獲得成就感。
            </p>
            <p className="py-2">
              至今，遊戲大亂鬥目前是台灣最新最紅的遊戲實況影片網站，每月有
              120萬+ 個活躍使用者，在 alexa Taiwan 排名大約在 100
              名左右，遊戲的社群網路之中年輕人最喜愛的電競遊戲影片社群，同時也是最多網友投稿遊戲實況影片互動的網絡。
            </p>
          </div>
          <div className="audience">
            <div className="title">
              <p>我們的觀眾</p>
              <h2>OUR AUDIENCE</h2>
            </div>
            <div className="about-img">
              <Image
                src="/about/about_img1.png"
                alt="about/img1"
                width={350}
                height={350}
              />
              <div className="pl-16">
                <p className="tr">
                  單月
                  <br />
                  平均瀏覽點擊 <b className="sign">1,000 萬+</b>
                </p>
                <p className="tr2">60%以上是 18-24歲</p>
                <p className="tr3">資料來源 Google Analytics , Facebook.</p>
              </div>
            </div>
            <div className="about-img bg-r2">
              <div className="pr-16 text-right">
                <p className="tr">facebook粉絲</p>
                <p className="sign">52 萬人</p>
                <p className="tr2">單篇貼文平均</p>
                <p className="tr2">2,500個讚、3萬8千個互動</p>
                <p className="tr3">資料來源 Facebook.</p>
              </div>
              <Image
                src="/about/about_img2.png"
                alt="about/img2"
                width={350}
                height={350}
              />
            </div>
            <div className="about-img">
              <Image
                src="/about/about_img3.png"
                alt="about/img3"
                width={350}
                height={350}
              />
              <div className="pl-16">
                <p className="tr">
                  <b className="sign">52% </b>
                  的使用者
                </p>
                <p className="tr">是使用行動裝置瀏覽我們網站</p>
                <p className="tr2">而且不斷增加中</p>
                <p className="tr3">資料來源 Google Analytics.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-20">
            <p className="text-3xl">您可以從下列地方追蹤我們的最新消息，</p>
            <p className="text-3xl">也歡迎您來信合作洽談。</p>
            <div className="flex justify-center mt-12">
              <Link href={"https://www.facebook.com/GameSmash/"}>
                <Image
                  className="mx-3"
                  src="/about/about_icon1.png"
                  alt="fb"
                  width={30}
                  height={30}
                />
              </Link>
              <Link
                href={
                  "https://www.youtube.com/channel/UCd4vjuRpRn8Ibd3OcPZHsuw"
                }>
                <Image
                  className="mx-3"
                  src="/about/about_icon2.png"
                  alt="yt"
                  width={30}
                  height={30}
                />
              </Link>
              <Link href={"https://www.facebook.com/messages/GameSmash"}>
                <Image
                  className="mx-3"
                  src="/about/about_icon3.png"
                  alt="email"
                  width={30}
                  height={30}
                />
              </Link>
              <Link href={"https://www.league-funny.com/advertise"}>
                <Image
                  className="mx-3"
                  src="/about/about_icon4.png"
                  alt="ad"
                  width={30}
                  height={30}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
