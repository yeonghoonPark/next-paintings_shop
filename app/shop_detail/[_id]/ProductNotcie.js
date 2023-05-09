"use client";

import { useEffect, useState, useRef } from "react";
import { FaLock, FaReplyd, FaExclamationCircle } from "react-icons/fa";
import { myTimeStamp } from "@/app/functions/common";
import Pagination from "@/app/components/base/Pagination";

export default function ProductNotice({ _id, session }) {
  const CLASS_NAME_SHOW = "show";
  const [qnaList, setQnaList] = useState([]);
  const [myQnaList, setMyQnaList] = useState([]);

  const [btnVal, setBtnVal] = useState("list");

  const [radioVal, setRadioVal] = useState("personal");
  const [textareaVal, setTextareaVal] = useState("");
  const textareaRef = useRef();

  const replyRef = useRef();
  const [replyVal, setReplyVal] = useState("");

  /* pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const perPageItems = 5;
  const lastIndexOfPerPageItem = currentPage * perPageItems;
  const firstIndexOfPerPageItem = lastIndexOfPerPageItem - perPageItems;
  const [maxNumOfBtnLimit, setMaxNumOfBtnLimit] = useState(5);
  const [minNumOfBtnLimit, setMinNumOfBtnLimit] = useState(0);

  const getQnaList = async () => {
    const res = await fetch(`/api/qna/get?_id=${_id}`);
    const json = await res.json();
    setQnaList(json.data.reverse());
  };

  useEffect(() => {
    getQnaList();
  }, []);

  const onHandleLi = (e, qna) => {
    const target = e.currentTarget.lastChild;

    if (qna.private_type === "public") {
      target.classList.toggle(CLASS_NAME_SHOW);
      return;
    }

    if (session?.user.role === "admin") {
      target.classList.toggle(CLASS_NAME_SHOW);
      return;
    }

    if (session?.user.email !== qna.email) {
      alert("작성자만 확인 가능합니다.");
      return;
    }

    target.classList.toggle(CLASS_NAME_SHOW);
  };

  const onHandleListBtn = () => {
    setCurrentPage(1);
    setQnaList([...qnaList]);
    setBtnVal("list");
  };

  const onHandleSearchBtn = () => {
    if (!session) {
      alert("로그인 후 이용할 수 있습니다.");
      return;
    }

    setCurrentPage(1);
    setMyQnaList(
      [...qnaList].filter((cV) => cV.email === session?.user?.email),
    );
    setBtnVal("search");
  };

  const onHandleWriteBtn = async () => {
    if (!session) {
      alert("로그인 후 이용할 수 있습니다.");
      return;
    }

    await setBtnVal("write");
    textareaRef.current.focus();
  };

  const onHandleWriteSubmit = () => {
    if (textareaVal === "") {
      alert("Please fill out the contents");
      textareaRef.current.focus();
      return;
    }

    fetch("/api/qna/insert", {
      method: "POST",
      body: JSON.stringify({
        title: textareaVal,
        answer_status: false,
        created_at: myTimeStamp(),
        product_id: _id,
        private_type: radioVal,
        reply: "",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        setTextareaVal("");
        setRadioVal("personal");
        getQnaList();
      })
      .then(() => setBtnVal("list"))
      .catch((err) => console.error(err));
  };

  const onHandleReplySubmit = (_id) => {
    if (replyVal === "") {
      alert("Please enter reply");
      return;
    }

    fetch("/api/qna/reply/update", {
      method: "PUT",
      body: JSON.stringify({
        _id: _id,
        reply: replyVal,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.data);
        setReplyVal("");
        getQnaList();
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className='product-notice' style={{ marginBottom: "5rem" }}>
      <h2>Product Notice</h2>
      <div className='btn-group'>
        <button
          type='text'
          className={btnVal === "list" ? "btn checked" : "btn"}
          onClick={onHandleListBtn}
        >
          Q&amp;A List
        </button>
        <button
          type='text'
          className={btnVal === "search" ? "btn checked" : "btn"}
          onClick={onHandleSearchBtn}
        >
          My Q&amp;A search
        </button>
        <button
          type='text'
          className={btnVal === "write" ? "btn checked" : "btn"}
          onClick={onHandleWriteBtn}
        >
          Write a Q&amp;A
        </button>
      </div>

      {btnVal === "list" && (
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
              {[...qnaList].length < 1 && (
                <div className='qna-nonexistent'>
                  <FaExclamationCircle className='fa-exclamation-circle' />
                  <span>There is no product Q&amp;A post</span>
                </div>
              )}
              {[...qnaList]
                .slice(firstIndexOfPerPageItem, lastIndexOfPerPageItem)
                .map((cV) => {
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
                              <div>{cV.reply}</div>
                            </div>
                            <div>by Admin</div>
                          </>
                        )}

                        {session?.user?.role === "admin" && (
                          <div
                            className='reply-box'
                            onClick={(e) => {
                              e.stopPropagation();
                              replyRef.current.focus();
                            }}
                          >
                            <label htmlFor='reply'>Reply</label>
                            <textarea
                              ref={replyRef}
                              type='text'
                              id='reply'
                              value={replyVal}
                              onChange={(e) =>
                                setReplyVal(e.currentTarget.value)
                              }
                            />
                            <button
                              type='text'
                              className='btn'
                              onClick={() => onHandleReplySubmit(cV._id)}
                            >
                              Submit
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          {[...qnaList].length >= 1 && (
            <Pagination
              currentPage={currentPage}
              totalLength={[...qnaList].length}
              perPageItems={perPageItems}
              setCurrentPage={setCurrentPage}
              maxNumOfBtnLimit={maxNumOfBtnLimit}
              setMaxNumOfBtnLimit={setMaxNumOfBtnLimit}
              minNumOfBtnLimit={minNumOfBtnLimit}
              setMinNumOfBtnLimit={setMinNumOfBtnLimit}
            />
          )}
        </div>
      )}

      {btnVal === "search" && (
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
              {[...myQnaList].length < 1 && (
                <div className='qna-nonexistent'>
                  <FaExclamationCircle className='fa-exclamation-circle' />
                  <span>There is no my Q&amp;A of that product</span>
                </div>
              )}
              {[...myQnaList]
                .slice(firstIndexOfPerPageItem, lastIndexOfPerPageItem)
                .map((cV) => {
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
                              <div>{cV.reply}</div>
                            </div>
                            <div>by Admin</div>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          {[...myQnaList].length >= 1 && (
            <Pagination
              currentPage={currentPage}
              totalLength={[...myQnaList].length}
              perPageItems={perPageItems}
              setCurrentPage={setCurrentPage}
              maxNumOfBtnLimit={maxNumOfBtnLimit}
              setMaxNumOfBtnLimit={setMaxNumOfBtnLimit}
              minNumOfBtnLimit={minNumOfBtnLimit}
              setMinNumOfBtnLimit={setMinNumOfBtnLimit}
            />
          )}
        </div>
      )}

      {btnVal === "write" && (
        <div className='qna-write'>
          <div className='radio-group'>
            <input
              type='radio'
              id='personal'
              name='private_type'
              value={radioVal}
              checked={radioVal === "personal"}
              onChange={() => setRadioVal("personal")}
            />
            <label htmlFor='personal'>Personal</label>
            <input
              type='radio'
              id='public'
              name='private_type'
              value={radioVal}
              checked={radioVal === "public"}
              onChange={() => setRadioVal("public")}
            />
            <label htmlFor='public'>Public</label>
          </div>

          <div className='textarea-box'>
            <textarea
              ref={textareaRef}
              value={textareaVal}
              maxLength={300}
              onChange={(e) => setTextareaVal(e.currentTarget.value)}
            />
          </div>

          <div className='btn-group'>
            <button
              type='text'
              className='btn btn-md'
              onClick={onHandleWriteSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
