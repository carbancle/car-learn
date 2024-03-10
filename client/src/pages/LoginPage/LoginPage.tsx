import { useForm } from "react-hook-form"
import { useAppDispatch } from "../../store"
import { ILoginInfo, loginUser } from "../../store/thunkFunction";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ILoginInfo>({ mode: 'onChange' })

  const dispatch = useAppDispatch();

  const onSubmit = ({ email, password }: ILoginInfo) => {
    const body = {
      email,
      password,
    }

    dispatch(loginUser(body));

    reset();
  }

  const userEmail = {
    required: "이메일은 필수 입력값입니다"
  }
  const userPassword = {
    required: "비밀번호는 필수 입력값입니다",
    minLength: {
      value: 6,
      message: "비밀번호는 최소 6자 이상이여야 합니다"
    }
  }

  return (
    <main className="container">
      <section className="mt-[64px] m-auto w-[320px] h-[676px]">
        <article>
          <h1 className="text-center font-medium text-2xl mb-6">로그인</h1>
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
                className="w-[320px] p-[13px_12px] h-12 leading-6 border border-[#dee2e6] tracking-tight rounded bg-white mt-1"
                {...register('email', userEmail)}
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
                className="w-[320px] p-[13px_12px] h-12 leading-6 border border-[#dee2e6] tracking-tight rounded bg-white mt-1"
                {...register('password', userPassword)}
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
            <div>
              <button type="submit"
                className="border-[#00c471] bg-[#00c471] w-full font-bold mt-4 mb-3 px-4 h-12 text-white rounded"
              >
                로그인
              </button>
            </div>
          </form>
        </article>
      </section>
    </main>
  )
}

export default LoginPage