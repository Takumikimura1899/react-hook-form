import { useForm } from 'react-hook-form';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  gender: GenderEnum;
}

const App = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <input
          id='firstName'
          type='text'
          // 文字列が1~20以外だった場合エラーがでる
          {...register('firstName', { required: true, maxLength: 20 })}
        />
        {/* フィールドに登録されているfirstNameでエラーが出た場合文字が出る */}
        {errors.firstName && 'FirstName is required'}
      </div>
      <div>
        <label htmlFor='lastName'>Last Name</label>
        <input
          type='text'
          id='lastName'
          // アルファベットならよし
          {...register('lastName', { required: true, pattern: /^[A-Za-z]+$/i })}
        />
        {errors.lastName && 'LastName is required'}
      </div>
      <div>
        <label htmlFor='age'>Age</label>
        <input
          id='age'
          type='number'
          // 18以上99以下ならよし
          {...register('age', { required: true, min: 18, max: 99 })}
        />
        {errors.age && 'Age is required'}
      </div>
      <div>
        <label htmlFor='gender'>Gender Selection</label>
        <select
          id='gender'
          // 入力しないとエラーが出るが、入力されていないことがないはずなので意味なし
          {...register('gender', { required: true })}
        >
          <option value='female'>female</option>
          <option value='male'>male</option>
          <option value='other'>other</option>
        </select>
      </div>
      <input type='submit' />
    </form>
  );
};

export default App;
