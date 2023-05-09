"use client";

export default function Pagination({
  totalLength,
  perPageItems,
  currentPage,
  setCurrentPage,
  maxNumOfBtnLimit,
  setMaxNumOfBtnLimit,
  minNumOfBtnLimit,
  setMinNumOfBtnLimit,
}) {
  const totalBtnNum = Math.ceil(totalLength / perPageItems);
  const btnLimit = 5;

  const createHTMLBtns = () => {
    const result = [];
    for (let i = 1; i <= totalBtnNum; i++) {
      if (i < maxNumOfBtnLimit + 1 && i > minNumOfBtnLimit) {
        result.push(
          <button
            className='page-button'
            key={i + 1}
            aria-current={currentPage === i ? "page" : null}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>,
        );
      }
    }
    return result;
  };

  const onHandlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % btnLimit === 0) {
      setMaxNumOfBtnLimit(maxNumOfBtnLimit - btnLimit);
      setMinNumOfBtnLimit(minNumOfBtnLimit - btnLimit);
    }
  };

  const onHandleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxNumOfBtnLimit) {
      setMaxNumOfBtnLimit(maxNumOfBtnLimit + btnLimit);
      setMinNumOfBtnLimit(minNumOfBtnLimit + btnLimit);
    }
  };

  return (
    <div className='pagination-box'>
      <button
        type='text'
        className='page-button'
        onClick={onHandlePrevBtn}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {createHTMLBtns()}

      <button
        type='text'
        className='page-button'
        onClick={onHandleNextBtn}
        disabled={currentPage === totalBtnNum}
      >
        &gt;
      </button>
    </div>
  );
}
