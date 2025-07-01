
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {

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

    
if (!email || !password) {
      setErrorMessage("すべてのフィールドを入力してください。");
      return;
    }

if (password.length < 6) {
  setErrorMessage("パスワードは6文字以上である必要があります。");
 return;
}
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
      <form onSubmit={handleRegister}>
        <input name="name" type="text" placeholder="名前" required />
        <input name="email" type="email" placeholder="メール" required />
        <input name="password" type="password" placeholder="パスワード6文字以上" required />
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
