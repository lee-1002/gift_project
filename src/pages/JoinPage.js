import React, { useState } from "react";

const JoinPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("회원가입 실패: 이미 존재하는 이메일이거나 서버 오류입니다.");
        return;
      }

      setSuccess("회원가입이 완료되었습니다. 로그인해주세요.");
      setError("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setError("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <style>
        {`
          .join-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #e8f5e9;
            font-family: "Arial", sans-serif;
          }

          .join-form {
            background-color: #ffffff;
            padding: 60px;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            width: 90%;
            text-align: center;
          }

          .join-form h2 {
            color: #4caf50;
            margin-bottom: 36px;
            font-weight: bold;
            font-size: 2em;
          }

          .join-form label {
            display: block;
            text-align: left;
            color: #4caf50;
            font-weight: bold;
            font-size: 1.1em;
            margin-bottom: 10px;
          }

          .join-form input[type="email"],
          .join-form input[type="password"] {
            width: 100%;
            padding: 14px 12px;
            border: 1px solid #a5d6a7;
            border-radius: 8px;
            font-size: 1.1em;
            margin-bottom: 24px;
            transition: border-color 0.3s ease;
          }

          .join-form input:focus {
            border-color: #4caf50;
            outline: none;
          }

          .join-form button {
            width: 100%;
            padding: 14px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.2em;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
            margin-top: 10px;
          }

          .join-form button:hover {
            background-color: #388e3c;
            transform: translateY(-2px);
          }

          .join-form p {
            margin-top: 12px;
            font-size: 1em;
          }

          .join-form p.error {
            color: #e53935;
            font-weight: bold;
          }

          .join-form p.success {
            color: #43a047;
            font-weight: bold;
          }
        `}
      </style>

      <div className="join-container">
        <form className="join-form" onSubmit={handleSubmit}>
          <h2>회원가입</h2>

          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit">회원가입</button>
        </form>
      </div>
    </>
  );
};

export default JoinPage;
