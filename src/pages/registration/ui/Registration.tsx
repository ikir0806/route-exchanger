import { FC, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { AuthContext } from '@app/providers/AuthContext';
import { auth } from '@entities';
import { AuthChecker } from '@shared/lib';
import axios from 'axios';
import { setCookie } from 'nookies';
import { IErrors } from '../model/errors.model';
import { IFields } from '../model/fields.model';

export const Registration: FC = () => {
  const { setUser } = useContext(AuthContext);
  const [errors, setErrors] = useState<IErrors>({
    invalidEmail: false,
    invalidLogin: false,
    invalidPassword: false,
    notEqualPasswords: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleValidation = async (fields: IFields) => {
    const tempErrors: IErrors = {
      invalidEmail: fields.email.length < 6 ? true : false,
      invalidLogin: fields.login.length < 6 ? true : false,
      invalidPassword: fields.password.length < 6 ? true : false,
      notEqualPasswords: fields.password !== fields.secondPassword ? true : false,
    };
    if (!Object.values(tempErrors).some((error) => error)) {
      try {
        const { token } = await auth.register(fields);

        setCookie(null, '_token', token, {
          path: '/',
        });

        localStorage.setItem('userToken', token);
        AuthChecker.checkAuth()
          .then((data) => data && setUser(data))
          .catch((e) => console.error(e));
        setLoading(false);
        navigate('/');
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          switch (error.message) {
            case 'Request failed with status code 400':
              return setError('Пользователь с такими почтой или логином уже зарегестрирован');
            case 'Network Error':
              return setError('Ошибка сети. Проверьте подключение к интернету');
            default:
              return setError('Ошибка регистрации');
          }
        } else {
          return setError('Ошибка регистрации');
        }
      }
    } else {
      setErrors(tempErrors);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    setLoading(true);
    e?.preventDefault();
    const targetFields = e.target as typeof e.target & {
      email: { value: string };
      login: { value: string };
      password: { value: string };
      secondPassword: { value: string };
    };

    const fields = {
      email: targetFields.email.value,
      login: targetFields.login.value,
      password: targetFields.password.value,
      secondPassword: targetFields.secondPassword.value,
    };

    handleValidation(fields);
  };

  const clearError = (errorField: keyof IErrors) =>
    errors[errorField] &&
    setErrors({
      ...errors,
      [errorField]: false,
    });

  return (
    <div className='form-wrapper'>
      <h1 className='form-title'>Регистрация</h1>
      <form className='form' onSubmit={handleSubmit}>
        <h3 className='form-text'>Введите почту</h3>
        <input
          onChange={() => clearError('invalidEmail')}
          className='form-input'
          type='text'
          name='email'
        />
        {errors.invalidEmail && <span className='error-text'>Некорректный email</span>}
        <h3 className='form-text'>Введите логин</h3>
        <input
          onChange={() => clearError('invalidLogin')}
          className='form-input'
          type='text'
          name='login'
        />
        {errors.invalidLogin && (
          <span className='error-text'>Логин должен быть не менее 7 символов в длину</span>
        )}
        <h3 className='form-text'>Введите пароль</h3>
        <input
          onChange={() => clearError('invalidPassword')}
          className='form-input'
          type='password'
          name='password'
        />
        {errors.invalidPassword && (
          <span className='error-text'>Пароль должен быть не менее 7 символов в длину</span>
        )}
        <h3 className='form-text'>Повторите пароль</h3>
        <input
          onChange={() => clearError('notEqualPasswords')}
          className='form-input'
          type='password'
          name='secondPassword'
        />
        {errors.notEqualPasswords && <span className='error-text'>Пароли не совпадают</span>}
        {loading ? (
          <div className='spinner'>
            <PuffLoader color='#006d4e' />
          </div>
        ) : (
          <button className='form-button' type='submit'>
            Зарегистрироваться
          </button>
        )}
        {error && <span className='error-text'>{error}</span>}
        <Link to='/authorization'>Уже есть аккаунт? Авторизуйтесь</Link>
      </form>
    </div>
  );
};
