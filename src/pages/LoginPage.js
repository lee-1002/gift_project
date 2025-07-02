import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("로그인 실패: 이메일과 비밀번호를 확인하세요.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      window.location.href = "/";
    } catch (err) {
      setError("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <style>
        {`
          .test-login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #e8f5e9;
            font-family: "Arial", sans-serif;
          }

          .login-box {
            background-color: #ffffff;
            padding: 60px;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 600px;
            width: 90%;
          }

          .input-group {
            margin-bottom: 24px;
            text-align: left;
          }

          .input-group label {
            display: block;
            margin-bottom: 10px;
            color: #4caf50;
            font-weight: bold;
            font-size: 1.1em;
          }

          .input-group input[type="email"],
          .input-group input[type="password"] {
            width: 100%;
            padding: 14px 12px;
            border: 1px solid #a5d6a7;
            border-radius: 8px;
            font-size: 1.1em;
            transition: border-color 0.3s ease;
          }

          .input-group input:focus {
            border-color: #4caf50;
            outline: none;
          }

          .login-button,
          .join-button,
          .social-buttons button {
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 8px;
            font-size: 1.2em;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
            margin-bottom: 14px;
            font-weight: bold;
          }

          .login-button {
            background-color: #4caf50;
            color: white;
          }

          .login-button:hover {
            background-color: #388e3c;
            transform: translateY(-2px);
          }

          .join-button {
            background-color: #81c784;
            color: white;
          }

          .join-button:hover {
            background-color: #66bb6a;
            transform: translateY(-2px);
          }

          .social-login-section {
            margin-top: 40px;
            border-top: 1px solid #e0e0e0;
            padding-top: 24px;
          }

          .social-login-section p {
            color: #757575;
            margin-bottom: 18px;
            font-size: 1em;
          }

          .social-buttons {
            display: flex;
            justify-content: space-between;
            gap: 12px;
          }

          .social-buttons button {
            flex: 1;
            padding: 12px;
            font-size: 1em;
          }

          .social-kakao {
            background-color: #f7e600;
            color: #3c1e1e;
            font-weight: bold;
          }

          .social-kakao:hover {
            background-color: #e5d400;
          }
        `}
      </style>

      <div className="test-login-container">
        <div className="login-box">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="login-button">
              로그인
            </button>
          </form>

          <Link to="/join">
            <button className="join-button">회원가입</button>
          </Link>

          <div className="social-login-section">
            <p>또는 소셜 계정으로 로그인</p>
            <div className="social-buttons">
              <button className="social-kakao">Kakao</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
