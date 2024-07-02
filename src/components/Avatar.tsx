import Image from "next/image";
import profilePicDefault from '/Users/Protomar/Desktop/link-sharing-app/public/prototyping-imgs/1024px-Malcolm-x.jpg';

const Component: React.FC<{ profilePic?: string }> = ({ profilePic = profilePicDefault }) => {
  return (
    <Image
      className="rounded-full object-cover ring-4 ring-purple-300"
      src={profilePic}
      alt="Profile picture"
      placeholder='blur'
      fill
      priority
    // width={500} automatically provided
    // height={500} automatically provided
    // blurDataURL="data:..." automatically provided
    // placeholder="blur" // Optional blur-up while loading
    />
  )
}

export default Component;