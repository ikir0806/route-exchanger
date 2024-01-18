import { useNavigate } from 'react-router-dom';
import { logIn } from '../Services/firebase';

function Authorization() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e?.preventDefault();
    const targetFields = e.target as typeof e.target & {
      email: { value: string };
      login: { value: string };
      password: { value: string };
    };

    const fields = {
      email: targetFields.email.value,
      login: targetFields.login.value,
      password: targetFields.password.value,
    };

    logIn(fields.email, fields.password).then((res) => {
      localStorage.setItem(
        'user',
        JSON.stringify({ uid: res.user.uid, email: fields.email, login: fields.login }),
      );
      navigate('/');
    });
  };

  return (
    <div className='form-wrapper'>
      <h1 className='form-title'>Авторизация</h1>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Введите логин</h3>
        <input className='form-input' type='text' name='login' />
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
