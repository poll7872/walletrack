export const Logo = () => {
    return (
        <div className="flex items-center gap-4">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 text-white"
                viewBox="0 0 256 256"
            >
                <rect width="256" height="256" fill="none"/>
                <path 
                    d="M32,72V56A16,16,0,0,1,48,40H224a8,8,0,0,1,8,8V192a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V96" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="24"
                />
                <path 
                    d="M232,80H48a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16H232" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="24"
                />
            </svg>
            <span className="text-3xl font-black text-white">Walletrack</span>
        </div>
    )
}
