import { useForm, useSignUp } from '@/hooks';
import { CommonButton, InputField } from '@components';
import { signUpInputFields } from '@constants/signUpInputFields.js';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.scss';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { handleSignUp, errors, loading } = useSignUp();
  const { form, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await handleSignUp(form);
  }

  const inputFields = signUpInputFields;

  return (
    <div className="sign-container">
      <h2 className="sign-title">회원가입</h2>
      <form className="sign-form" onSubmit={handleSubmit}>
        {inputFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
          />
        ))}
        <CommonButton
          type="submit"
          className="signUpPage-btn"
          onClick={() => navigate('/signup')}
        >
          {loading ? '가입 중....' : '회원가입'}
        </CommonButton>
      </form>
    </div>
  );
}
