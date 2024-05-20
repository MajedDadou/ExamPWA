import React from 'react';

function Tab() {
  return (
    <>
      <div className="div">
        <div className="div-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9393ffa8a3fed2e7143d3fd1e64cb349e83b5aa7bea8c59bd96f8b9197b07e90?"
            className="img"
          />
          <div className="div-3">Information</div>
          <div className="div-4">Åbningstider</div>
          <div className="div-5">Billetter</div>
          <div className="div-6">Køb Årskort</div>
          <div className="div-7">Fodringstider</div>
          <div className="div-8">Dyrepassere</div>
        </div>
      </div>
      <style jsx>{`
        .div {
          background-color: #fff;
          display: flex;
          max-width: 360px;
          padding-top: 8px;
          flex-direction: column;
          font-size: 24px;
          color: #000;
          font-weight: 400;
        }
        .div-2 {
          disply: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          display: flex;
          aspect-ratio: 0.56;
          width: 100%;
          padding: 67px 65px;
        }
        .img {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .div-3 {
          position: relative;
          font: 40px Inter, sans-serif;
        }
        .div-4 {
          position: relative;
          font-family: Inter, sans-serif;
          background-color: #d9d9d9;
          margin-top: 34px;
          white-space: nowrap;
          justify-content: center;
          padding: 13px 42px;
        }
        .div-5 {
          position: relative;
          font-family: Inter, sans-serif;
          background-color: #d9d9d9;
          margin-top: 27px;
          align-items: center;
          white-space: nowrap;
          justify-content: center;
          padding: 18px 60px;
        }
        .div-6 {
          position: relative;
          font-family: Inter, sans-serif;
          background-color: #d9d9d9;
          margin-top: 24px;
          justify-content: center;
          padding: 15px 48px;
        }
        .div-7 {
          position: relative;
          font-family: Inter, sans-serif;
          background-color: #d9d9d9;
          margin-top: 15px;
          align-items: start;
          white-space: nowrap;
          justify-content: center;
          padding: 16px 48px;
        }
        .div-8 {
          position: relative;
          font-family: Inter, sans-serif;
          background-color: #d9d9d9;
          white-space: nowrap;
          justify-content: center;
          margin: 15px 0 58px;
          padding: 16px 48px;
        }
      `}</style>
    </>
  );
}

export default Tab;

