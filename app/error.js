"use client";

export default function ErrorPage({ reset }) {
  return (
    <div className='error-page'>
      <h3 className='page-title'>Failed to load page due to network error.</h3>

      <button type='text' onClick={() => reset()}>
        Reset
      </button>
    </div>
  );
}
