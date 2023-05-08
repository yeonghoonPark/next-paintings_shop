"use client";

import { useEffect, useState } from "react";
import { FaLock, FaReplyd } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ProductNotice({ _id, session }) {
  const [qnaList, setQnaList] = useState([]);

  const getQnaList = async () => {
    const res = await fetch(`/api/qna/get?_id=${_id}`);
    const json = await res.json();
    console.log(json.data);
    setQnaList(json.data);
  };

  useEffect(() => {
    getQnaList();
  }, []);

  const onHandleLi = (e, qna) => {
    const target = e.currentTarget.lastChild;

    if (qna.private_type === "public") {
      target.classList.toggle("show");
      return;
    }

    if (session?.user.role === "admin") {
      target.classList.toggle("show");
      return;
    }

    if (session?.user.email !== qna.email) {
      alert("작성자만 확인 가능합니다.");
      return;
    }

    target.classList.toggle("show");
  };

  const onHandleWriteBtn = () => {
    if (!session) {
      alert("로그인 후 이용할 수 있습니다.");
      return;
    }

    console.log("[onHandleWriteBtn]");
    window.open(
      `/test`,
      "_blank",
      "width=500, height=500, left=300, top=300, scrollbars=no, titlebar=no, status=no, resizable=no, fullscreen=no",
    );
  };

  const onHandleSearchBtn = () => {};

  return (
    <section className='product-notice' style={{ marginBottom: "10rem" }}>
      <h2>Product Notice</h2>
      <div className='btn-group'>
        <button type='text' className='btn' onClick={onHandleWriteBtn}>
          Write a Q&amp;A
        </button>
        <button type='text' className='btn' onClick={onHandleSearchBtn}>
          My Q&amp;A search
        </button>
      </div>

      <div className='qna'>
        <div className='qna-header'>
          <ul>
            <li>Answer status</li>
            <li>Title</li>
            <li>Author</li>
            <li>Created At</li>
          </ul>
        </div>

        <div className='qna-body'>
          <ul>
            {qnaList.map((cV) => {
              return (
                <li key={cV._id} onClick={(e) => onHandleLi(e, cV)}>
                  <div>
                    {cV.answer_status ? (
                      <div>Answered</div>
                    ) : (
                      <div>Unanswered</div>
                    )}
                    {cV.private_type === "public" ? (
                      <div>{cV.title}</div>
                    ) : (
                      <div className='secret-title'>
                        Secret post.
                        <FaLock className='fa-lock' />
                      </div>
                    )}
                    <div>{cV.author}</div>
                    <div>{cV.created_at}</div>
                  </div>
                  <div className='view'>
                    {cV.private_type === "public" ? (
                      <div>{cV.title}</div>
                    ) : session?.user.email !== cV.email ? (
                      session?.user.role !== "admin" ? null : (
                        <div>{cV.title}</div>
                      )
                    ) : (
                      <div>{cV.title}</div>
                    )}

                    {cV.reply === "" ? null : (
                      <>
                        <div>
                          <FaReplyd className='fa-replyd' />
                          <span>{cV.reply}</span>
                        </div>
                        <div style={{ paddingRight: "1.5rem" }}>Admin</div>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
