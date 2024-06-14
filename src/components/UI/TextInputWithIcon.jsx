/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import LinkIcon from '../icons/LinkIcon';

export default function Example() {
  return (
    <div>
      {/* <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900"> */}

      <label htmlFor="link">
        Link
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {/* <span className="text-gray-500 sm:text-sm">$</span> */}
          <LinkIcon />
        </div>
        <input
          type="url"
          name="link"
          id="link"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="e.g. https://www.github.com/j"
        />
      </div>
    </div>
  )
}
