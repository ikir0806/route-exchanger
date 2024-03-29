import { doc, getDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { FIRESTORE_DB, logIn } from '../Services/firebase';
import { AuthContext } from '../utils/AuthContext';

function Authorization() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    setLoading(true);
    e?.preventDefault();
    const targetFields = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const fields = {
      email: targetFields.email.value,
      password: targetFields.password.value,
    };

    logIn(fields.email, fields.password)
      .then(async (res) => {
        await getDoc(doc(FIRESTORE_DB, `users/${res.user.uid}`)).then(async (userData) => {
          const user = {
            email: userData.data()?.email,
            login: userData.data()?.login,
          };
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        });
        navigate('/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-credential':
            return setError('Неверный логин или пароль');
          case 'auth/network-request-failed':
            return setError('Ошибка сети. Проверьте подключение к интернету');
          default:
            return setError('Ошибка авторизации');
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className='form-wrapper'>
      <h1 className='form-title'>Авторизация</h1>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Введите почту</h3>
        <input
          onChange={() => error && setError(null)}
          className='form-input'
          type='text'
          name='email'
        />
        <h3>Введите пароль</h3>
        <input
          onChange={() => error && setError(null)}
          className='form-input'
          type='password'
          name='password'
        />
        {loading ? (
          <div className='spinner'>
            <PuffLoader color='#006d4e' />
          </div>
        ) : (
          <button className='form-button' type='submit'>
            Войти
          </button>
        )}
        {error && <span className='error-text'>{error}</span>}
      </form>
    </div>
  );
}

export default Authorization;
