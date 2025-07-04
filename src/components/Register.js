import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import "../styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";

import { saveUserData } from "../firebase";

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("有効なメールアドレスを入力してください。");
      return;
    }

    if (!email || !password || !name) {
      setErrorMessage("すべてのフィールドを入力してください。");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("パスワードは6文字以上である必要があります。");
      return;
    }

    try {
      const userCredential=  await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      await saveUserData(user);

      alert(`${name} さん、登録が完了しました！`);
    } catch (error) {
      alert("登録失敗: " + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <img src="/logo.png" alt="Logo" className="logo" />
      <div className="form-container">
        <h2>登録</h2>
        <form onSubmit={handleRegister} className="login-form">
          <div className="input-group">
            <input name="name" type="text" placeholder="名前" required className="input-field" />
          </div>
          <div className="input-group">
            <input name="email" type="email" placeholder="メール" required className="input-field" />
          </div>
          <div className="input-group">
            <input
              name="password"
              placeholder="パスワード6文字以上"
              required
              type={passwordVisible ? "text" : "password"}
              className="input-field"
            />
            <span className="eye-icon" onClick={toggleVisibility}>
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit">サインアップ</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          すでにアカウントを持っています？<Link to="/login">ログイン</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
