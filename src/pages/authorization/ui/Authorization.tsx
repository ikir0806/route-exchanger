import { FC, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { AuthContext } from '@app/providers/AuthContext';
import { useLoginMutation } from '@entities';
import { AuthChecker } from '@shared/lib/auth-checker/auth-checker';
import axios from 'axios';
import { setCookie } from 'nookies';

export const Authorization: FC = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.SyntheticEvent) => {
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

    try {
      const { data } = await login(fields);
      setCookie(null, '_token', data.token, {
        path: '/',
      });
      localStorage.setItem('userToken', data.token);

      AuthChecker.checkAuth()
        .then((data) => data && setUser(data))
        .catch((e) => console.error(e));
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        switch (error.code) {
          case 'ERR_BAD_REQUEST':
            return setError('Неверный логин или пароль');
          case 'ERR_NETWORK':
            return setError('Ошибка сети. Проверьте подключение к интернету');
          default:
            return setError('Ошибка авторизации');
        }
      } else {
        return setError('Ошибка авторизации');
      }
    }
  };

  return (
    <div className='form-wrapper'>
      <h1 className='form-title'>Авторизация</h1>
      <form className='form' onSubmit={handleSubmit}>
        <h3 className='form-text'>Введите почту</h3>
        <input
          onChange={() => error && setError(null)}
          className='form-input'
          type='text'
          name='email'
        />
        <h3 className='form-text'>Введите пароль</h3>
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
        <Link to='/registration'>Нет аккаунта? Зарегистрируйтесь</Link>
      </form>
    </div>
  );
};
