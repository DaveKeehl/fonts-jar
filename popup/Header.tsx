import logo from "data-base64:~assets/logo/logo.svg"

export const Header = () => {
  return (
    <header className="flex flex-row items-center bg-header px-6 py-5 font-poppins">
      <img
        src={logo}
        alt="Fonts Jar Logo"
        className="mr-4 aspect-square w-10 drop-shadow-logo saturate-150"
      />
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold leading-[100%] text-greyscale-100">Fonts Jar</h1>
        <p className="mt-[2px] text-[12px] leading-[18px] tracking-wide text-blue-200">
          Never forget your favorite fonts!
        </p>
      </div>
    </header>
  )
}
