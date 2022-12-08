import { NextPage } from "next";
import Image from "next/image";

const PrivacyPage: NextPage = () => {
  return (
    <article>
      <div className="privacy">
        <div className="banner-bg">
          <Image
            className="banner-logo"
            src="/about/about_top2.png"
            alt="/about/about_top2"
            width={300}
            height={300}
          />
        </div>
        <div className="privacy-content">
          <div className="title">
            <h1 className="title-logo">“遊戲大亂鬥”免責聲明</h1>
            <hr className="title-hr"></hr>
          </div>
          <div className="privacy-content-txt">
            <p>● 總則</p>
            <p className="pt-2 pb-5">
              在您使用本網站（遊戲大亂鬥，https://www.league-funny.com/）前，請閱讀本網站免則聲明。若不接受煩請您停止使用，否則將視為接受全部條款。
              據此，在您瀏覽或使用本網站時，視同已接受並瞭解本聲明條款、中華民國之法律，以及國際網路規定及使用慣例。
            </p>
            <p>● 使用方式</p>
            <p className="pt-2 pb-5">
              在您使用本網站各種服務或內容之過程中，不得利用任何方式、直接或間接從事任何非法行為，或有礙我國一般公共秩序及善良風俗之行為。
              您在本網站發表的任何內容，僅係表明個人見解，而不代表本網站之立場或觀點。若因此所致之糾紛或損失，您應自行對所發表內容承擔法律上責任。
            </p>
            <p>● 網站連結</p>
            <p className="pt-2 pb-5">
              本網站內之任何內容均為使用者所發布，應由使用者自行擔保擁有著作權或取得授權，本網站內向外所連結網站，其著作權係屬於原該網站建構，或維護單位所有。
              本網站之相關連結，僅為使用者之便利，而非本網站所控制，故無法對所顯示的內容為任何保證，或承擔任何責任。如您涉及該連結內容之使用行為，本網站不負責任。
            </p>
            <p>● 本站管理</p>
            <p className="pt-2 pb-5">
              本網站已盡善良管理人之注意義務，做好網頁管理安全，以確保本網站網頁資料在刊登時之準確與完整。但本網站對於任何使用，或引用本網站網頁資料引致之損失或損害，概不負責。
              本網站有權隨時刪除、暫停或編輯本網站所登載之各項資料，以維護本網站之權利。
              本網站對於使用者所發布之內容，如發現有違反使用方式或有侵權疑慮時，有權採取刪除、暫停或對該使用者予以停權等措施。
            </p>
            <p>● 免責聲明之更新</p>
            <p className="pt-2 pb-5">
              對於免責聲明，本網站保留隨時更新之權利，該更新於本站發佈時即立即生效。因此，請您在本網站之每次瀏覽前，均務必詳細查看。
            </p>
            <p>● 不可抗力</p>
            <p className="pt-2 pb-5">
              對於因網路傳輸故障及其他不可抗力導致的後果，本網站不承擔任何責任。
            </p>
            <p>● 管轄法律</p>
            <p className="pt-2 pb-5">
              如有訴訟，雙方均同意以台灣台北地方法院為管轄法院。
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PrivacyPage;
