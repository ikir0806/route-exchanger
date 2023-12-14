import { useState } from 'react';

interface Fields {
  login: string;
  password: string;
  secondPassword: string;
}

interface Errors {
  invalidLogin: boolean | undefined;
  invalidPassword: boolean | undefined;
  notEqualPasswords: boolean | undefined;
}

function Registration() {
  const [errors, setErrors] = useState<Errors>({
    invalidLogin: false,
    invalidPassword: false,
    notEqualPasswords: false,
  });

  const handleValidation = (fields: Fields) => {
    const tempErrors: Errors = {
      invalidLogin: fields.login.length <= 6 ? true : false,
      invalidPassword: fields.password.length <= 6 ? true : false,
      notEqualPasswords: fields.password !== fields.secondPassword ? true : false,
    };
    Object.values(tempErrors).some((error) => error) ? console.log('not ok') : console.log('ok');
    setErrors(tempErrors);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e?.preventDefault();
    const targetFields = e.target as typeof e.target & {
      login: { value: string };
      password: { value: string };
      secondPassword: { value: string };
    };

    const fields = {
      login: targetFields.login.value,
      password: targetFields.password.value,
      secondPassword: targetFields.secondPassword.value,
    };

    handleValidation(fields);
  };

  return (
    <div className='form-wrapper'>
      <h1 className='form-title'>Регистрация</h1>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Введите логин</h3>
        <input className='form-input' type='text' name='login' />
        {errors.invalidLogin && <span>Ошибка</span>}
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
