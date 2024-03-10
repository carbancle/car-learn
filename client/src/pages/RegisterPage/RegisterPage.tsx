import { useForm } from "react-hook-form"
import { useAppDispatch } from "../../store";
import { IRegisterInfo, registerUser } from "../../store/thunkFunction";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IRegisterInfo>({ mode: 'onChange' });

  const dispatch = useAppDispatch();

  const onSubmit = ({ email, password, confirmPassword }: IRegisterInfo) => {
    const body = {
      email,
      password,
      confirmPassword
    }

    dispatch(registerUser(body));

    reset();
  }

  const userEmail = {
    required: "이메일은 필수 입력값입니다."
  }
  const userPassword = {
    required: "비밀번호는 필수 입력값입니다."
  }
  const userConfirmPassword = {
    required: "비밀번호 확인은 필수 입력값입니다."
  }

  return (
    <main className="container">
      <section className="mt-[64px] m-auto w-[320px] h-[676px]">
        <article>
          <h1 className="text-center font-medium text-2xl mb-6">회원가입</h1>
        </article>
        <article>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email"
                className="leading-6 tracking-tight text-sm font-normal decoration-[#3e4042]"
              >
                이메일
              </label>
              <input id="email" type="email" placeholder="example@inflab.com"
                {...register('email', userEmail)}
                className="w-[320px] p-[13px_12px] h-12 leading-6 border border-[#dee2e6] tracking-tight rounded bg-white mt-1"
              />
              {
                errors?.email &&
                <div>
                  <span className="text-red-500">
                    {errors.email.message}
                  </span>
                </div>
              }
            </div>
            <div className="mb-4">
              <label htmlFor="password"
                className="leading-6 tracking-tight text-sm font-normal decoration-[#3e4042]"
              >
                비밀번호
              </label>
              <input id="password" type="password" autoComplete="off"
                {...register('password', userPassword)}
                className="w-[320px] p-[13px_12px] h-12 leading-6 border border-[#dee2e6] tracking-tight rounded bg-white mt-1"
              />
              {
                errors?.password &&
                <div>
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                </div>
              }
            </div>
            <div className="mb-4">
              <label htmlFor="confirm_password"
                className="leading-6 tracking-tight text-sm font-normal decoration-[#3e4042]"
              >
                비밀번호 확인
              </label>
              <input id="confirm_password" type="password" autoComplete="off"
                {...register('confirmPassword', userConfirmPassword)}
                className="w-[320px] p-[13px_12px] h-12 leading-6 border border-[#dee2e6] tracking-tight rounded bg-white mt-1"
              />
              {
                errors?.confirmPassword &&
                <div>
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                </div>
              }
            </div>
            <div>
              <button type="submit"
                className="border-[#00c471] bg-[#00c471] w-full font-bold mt-4 mb-3 px-4 h-12 text-white rounded"
              >회원가입</button>
            </div>
          </form>
        </article>
      </section>
    </main>
  )
}

export default RegisterPage