function Registration() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    console.log(e);
    e?.preventDefault();
  };

  return (
    <div className='form-wrapper'>
      <h1 className='form-title'>Регистрация</h1>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Введите логин</h3>
        <input className='form-input' type='text' />
        <h3>Введите пароль</h3>
        <input className='form-input' type='password' />
        <h3>Повторите пароль</h3>
        <input className='form-input' type='password' />
        <button className='form-button' type='submit'>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Registration;
