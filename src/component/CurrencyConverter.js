import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [krwRate, setKrwRate] = useState(null); // 환율 값
  const [krw, setKrw] = useState(""); // 한화 입력값
  const [usd, setUsd] = useState(null); // 변환된 미화 값
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        // API 요청
        const response = await axios.get("https://open.er-api.com/v6/latest/USD");
        setKrwRate(response.data.rates.KRW);
      } catch (err) {
        setError("환율 데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false); // 로딩 상태 갱신
      }
    };

    fetchExchangeRate();
  }, []); // 빈 배열로 한 번만 실행

  const handleConvert = () => {
    if (krwRate && krw) {
      setUsd((parseFloat(krw) / krwRate).toFixed(2)); // 변환
    }
  };

  return (
    <div>
      {loading ? (
        <p>환율 데이터를 가져오는 중입니다...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <div>
            <input
              type="number"
              value={krw}
              onChange={(e) => setKrw(e.target.value)}
              placeholder="한화(KRW)를 입력하세요"
            />
            <button onClick={handleConvert}>변환</button>
          </div>

          <div style={{ marginTop: "20px" }}>
            <p>현재 환율: 1 USD = {krwRate.toFixed(2)} KRW</p>
            {usd !== null && <p>{krw} KRW는 약 {usd} USD 입니다.</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencyConverter;
