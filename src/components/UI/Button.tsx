const Component: React.FC<{ id?: string, children?: any, variant?: string, type?: "submit" | "reset" | "button", disabled?: boolean }> = ({ id, children, variant, type, ...props }) => {
  return (
    <>
      {variant === 'secondary' ?
        <button
          id={id}
          type={type}
          className="w-full rounded-lg bg-white px-7 py-3 font-semibold text-purple-300 outline outline-1 outline-purple-300 hover:bg-purple-100 active:bg-purple-100 disabled:opacity-25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
          {...props}
        >
          {children}
        </button> :
        <button
          type={type}
          className="w-full rounded-lg bg-purple-300 px-7 py-3 font-semibold text-white hover:bg-purple-200 active:bg-purple-200 disabled:opacity-25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
          {...props}
        >
          {children}
        </button>
      }    
    </>
  )
}

export default Component;