import { type FC } from "react";
import { MailboxCenter, MailReceive } from "@/components";
import Link from "next/link";
import mail from "@/shared/data/mail.json";
import comment from "@/shared/data/mail-comment.json";
import { useRouter } from "next/router";

const MailboxDetailPage: FC = () => {
  const router = useRouter();
  const mid = router.query.mid;
  return (
    <article>
      <div className="top-0 left-0 mt-16 md:mt-28">
        <div className="flex flex-col justify-center mt-0 md:flex-row">
          <MailboxCenter />
          <div className="w-block p-5 md:w-3/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 break-all">
                {mail.content.map((item) => {
                  if (item.m_id === "") return;
                  if (item.m_id === mid) {
                    return (
                      <p className="text-2xl font-semibold">{item.m_title}</p>
                    );
                  }
                })}
              </div>
              <div className="hidden md:flex items-center ml-4">
                <button className="btn-styleB text-sm mr-2 hover:btn-styleB-hover">
                  回覆
                </button>
                <Link href={"/mailbox"}>
                  <div className="flex">
                    <button className="flex btn-styleB text-sm hover:btn-styleB-hover">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                        />
                      </svg>
                      <span>回上頁</span>
                    </button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="border-t w-full">
              <MailReceive message={mail.content[0]} />
              {comment.content.map((item, i) => (
                <MailReceive key={i} message={item} />
              ))}
            </div>
            <div className="flex items-center justify-center mt-5">
              <Link href={"/mailbox"}>
                <div className="flex mr-2">
                  <button className="flex btn-styleB text-sm hover:btn-styleB-hover">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                      />
                    </svg>
                    <span>回上頁</span>
                  </button>
                </div>
              </Link>
              <button className="btn-styleB text-sm hover:btn-styleB-hover">
                回覆
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MailboxDetailPage;
