import { doc, getDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FIRESTORE_DB, logIn } from '../Services/firebase';
import { AuthContext } from '../utils/AuthContext';

function Authorization() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e?.preventDefault();
    const targetFields = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const fields = {
      email: targetFields.email.value,
      password: targetFields.password.value,
    };

    logIn(fields.email, fields.password).then(async (res) => {
      await getDoc(doc(FIRESTORE_DB, `users/${res.user.uid}`)).then(async (userData) => {
        const user = {
          email: userData.data()?.email,
          login: userData.data()?.login,
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      });
      navigate('/');
    });
  };

  return (
    <div className='form-wrapper'>
      <h1 className='form-title'>Авторизация</h1>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Введите почту</h3>
        <input className='form-input' type='text' name='email' />
        <h3>Введите пароль</h3>
        <input className='form-input' type='password' name='password' />
        <button className='form-button' type='submit'>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Authorization;
