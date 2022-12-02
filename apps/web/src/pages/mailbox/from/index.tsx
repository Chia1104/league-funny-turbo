import { MailboxCenter, MailboxDetail } from "@/components";

const MailboxFrom = () => {
  return (
    <article>
      <div className="top-0 left-0 mt-16">
        <div className="w-full h-72 flex items-center justify-center w-bg-secondary">
          <div className="w-2/4 h-full bg-gray-300">
            <h3>AD</h3>
          </div>
        </div>
        <div className="flex justify-center mt-7">
          <MailboxCenter />
          <div className="w-block p-5 w-3/5">
            <div className="flex items-center justify-between mb-3">
              <p>收件匣 (0)</p>
              <button className="btn-styleB hover:btn-styleB-hover">
                標示全部已讀
              </button>
            </div>
            <MailboxDetail
              mid="1"
              user="Vivian"
              detail="Hi"
              isNew={true}
              time="12月02日 10:27"
            />
            <MailboxDetail
              mid="1"
              user="Vivian"
              detail="Hi"
              isNew={true}
              time="12月02日 10:27"
            />
            <MailboxDetail
              mid="1"
              user="Vivian"
              detail="Hidddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
              isNew={false}
              time="12月02日 10:27"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default MailboxFrom;
