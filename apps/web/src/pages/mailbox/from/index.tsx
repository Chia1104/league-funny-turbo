import { MailboxCenter, MailboxDetail } from "@/components";
import mail from "@/shared/data/mail.json";

const MailboxFrom = () => {
  return (
    <article>
      <div className="top-0 left-0 mt-16 md:mt-28">
        <div className="flex flex-col justify-center mt-0 md:flex-row">
          <MailboxCenter />
          <div className="w-block p-3 md:w-3/5 md:p-5">
            <div className="hidden md:flex items-center justify-between mb-3">
              <p>收件匣 (0)</p>
              <button className="btn-styleB hover:btn-styleB-hover">
                標示全部已讀
              </button>
            </div>
            {mail.content.map((item, i) => (
              <MailboxDetail key={i} message={item} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default MailboxFrom;
