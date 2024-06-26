interface LogoProps {
  fill?: string;
  width?: number;
  height?: number;
  className?: string;
}

const Component: React.FC< LogoProps > = ({
  fill = "#633CFF",
  width = 32,
  height = 32,
  className
}
) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width={width} height={height} fill="none" viewBox="0 0 32 32"><path fill={fill} fillRule="evenodd" d="M4.619 27.38c1.954 1.953 5.095 1.953 11.38 1.953 6.286 0 9.429 0 11.38-1.953 1.954-1.95 1.954-5.095 1.954-11.38 0-6.286 0-9.428-1.953-11.381C25.43 2.667 22.285 2.667 16 2.667c-6.286 0-9.428 0-11.381 1.952-1.952 1.954-1.952 5.095-1.952 11.38 0 6.286 0 9.429 1.952 11.38Zm8.047-15.713A4.333 4.333 0 1 0 17 16a1 1 0 0 1 2 0 6.333 6.333 0 1 1-6.334-6.334 1 1 0 1 1 0 2Zm11 4.333a4.333 4.333 0 0 1-4.333 4.333 1 1 0 1 0 0 2A6.333 6.333 0 1 0 13 16a1 1 0 1 0 2 0 4.334 4.334 0 0 1 8.666 0Z" clipRule="evenodd" /></svg>
  )
}

export default Component;