// import InputField from "components/fields/InputField";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ls from 'localstorage-slim';
import { message } from 'antd'
export default function SignIn() {
  // const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  const handelLoginSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/login', {
      email: email.current.value,
      password: password.current.value

    }).then(response => {
      // history('/admin')

      ls.set('token', response.data.token, { encrypt: true })
      ls.set('user', JSON.stringify(response.data.user), { encrypt: true })
      window.location.href = '/admin/dashboard';
    }
    ).catch(error => {
      console.log(error)
      message.error(error.response.data.error)
    })
  }

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />

          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        {/* Email */}
        <form onSubmit={handelLoginSubmit}>
          <div className="mb-3">
            <label className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium">
              Email
            </label>
            <input
              ref={email}
              type="email"
              placeholder="Please entre your email "
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"

            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium">
              Password
            </label>
            <input
              ref={password}
              type="password"
              placeholder="Please entre your password "
              className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${"!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(f,f,f,f)]"}`}
            />
          </div>
          <button
            htmlFor='submit'
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
        </form>


      </div>
    </div>
  );
}
