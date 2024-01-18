import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../Services/firebase';

interface Fields {
  email: string;
  password: string;
  secondPassword: string;
}

interface Errors {
  invalidEmail: boolean | undefined;
  invalidPassword: boolean | undefined;
  notEqualPasswords: boolean | undefined;
}

function Registration() {
  const [errors, setErrors] = useState<Errors>({
    invalidEmail: false,
    invalidPassword: false,
    notEqualPasswords: false,
  });

  const navigate = useNavigate();

  const handleValidation = (fields: Fields) => {
    const tempErrors: Errors = {
      invalidEmail: fields.email.length < 6 ? true : false,
      invalidPassword: fields.password.length < 6 ? true : false,
      notEqualPasswords: fields.password !== fields.secondPassword ? true : false,
    };
    !Object.values(tempErrors).some((error) => error) &&
      signUp(fields.email, fields.password).then(() => navigate('/authorization'));
    setErrors(tempErrors);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e?.preventDefault();
    const targetFields = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      secondPassword: { value: string };
    };

    const fields = {
      email: targetFields.email.value,
      password: targetFields.password.value,
      secondPassword: targetFields.secondPassword.value,
    };

    handleValidation(fields);
  };

  return (
    <div className='form-wrapper'>
      <h1 className='form-title'>Регистрация</h1>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Введите почту</h3>
        <input className='form-input' type='text' name='email' />
        {errors.invalidEmail && <span>Ошибка</span>}
        <h3>Введите пароль</h3>
        <input className='form-input' type='password' name='password' />
        {errors.invalidPassword && <span>Ошибка</span>}
        <h3>Повторите пароль</h3>
        <input className='form-input' type='password' name='secondPassword' />
        {errors.notEqualPasswords && <span>Ошибка</span>}
        <button className='form-button' type='submit'>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Registration;
