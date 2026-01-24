export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="h-16 w-16 text-white"
      >
        <rect width="256" height="256" fill="none" />

        <path
          d="M40 88
       a24 24 0 0 1 24-24
       h128
       a24 24 0 0 1 24 24
       v80
       a24 24 0 0 1-24 24
       h-128
       a24 24 0 0 1-24-24
       z"
          fill="none"
          stroke="currentColor"
          strokeWidth="18"
          strokeLinejoin="round"
        />

        <path
          d="M40 108h176"
          fill="none"
          stroke="currentColor"
          strokeWidth="18"
          strokeLinecap="round"
        />

        <circle cx="200" cy="108" r="8" fill="currentColor" />

        <path
          d="M72 168
       l28-22
       24 16
       36-40
       24 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-3xl font-black text-white">Walletrack</span>
    </div>
  );
};
