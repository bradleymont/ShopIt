import Logo from '../assets/logo_filled.png';

function Signup() {
  return (
    <>
      <img src={Logo} className="img" alt="ShopIt" />
      <div className="header">Welcome to ShopIt!</div>
      <div className="container">
        <form>
            <input className="input" type="text" id="username" placeholder="username..."/>
        </form>
        <form>
            <input className="input" type="password" id="password" placeholder="password..." />
        </form>
        <button className="button"
            type="button"
            onClick={(e) => {
                e.preventDefault();
                var user = document.getElementById('username').value
                var pass = document.getElementById('password').value
                fetch('http://localhost:5000/users/signup', {
                  credentials: 'include',
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({username: user, password: pass}),
                }).then((response) => {
                  if(!response.ok) {
                    throw response.json()
                  }
                  return response.json()
                })
                .then((responseData) => {
                  window.location.href='/';
                })
                .catch(error => error.then(errorMsg => alert(errorMsg.msg)));
                }}
        >Sign Up</button>
      </div>
    </>
  );
}

export default Signup;
