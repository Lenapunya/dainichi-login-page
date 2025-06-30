
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles.css";

function Login() {
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("ログイン成功！");
    // Redirect to your Google Sites page
    window.location.href = "https://sites.google.com/view/dainichi-portal/%E3%83%9B%E3%83%BC%E3%83%A0"; // Replace with your actual URL
  } catch (error) {
    alert("ログイン失敗: " + error.message);
  }
};


  return (
    <div className="login-wrapper">
            <img src="/logo.png" alt="Logo" className="logo" />
      <div className="form-container">
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="メールアドレス" required />
        <input name="password" type="password" placeholder="パスワード" required />
        <button type="submit">ログイン</button>
      </form>
      <p>
        新規で登録はこちら <a href="/register">登録</a>
      </p>
    </div>
    </div>
  );
}

export default Login;
