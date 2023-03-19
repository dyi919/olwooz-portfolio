import { IconProps } from '@Icons/types';

export const PhoneIcon = ({ size, style }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width={size ?? 24} className={style}>
      <path d="M795 936q-122 0-242.5-60T336 720q-96-96-156-216.5T120 261q0-19 13-32t32-13h140q14 0 24.5 9.5T343 251l27 126q2 14-.5 25.5T359 422L259 523q56 93 125.5 162T542 802l95-98q10-11 23-15.5t26-1.5l119 26q15 3 25 15t10 28v135q0 19-13 32t-32 13Z" />
    </svg>
  );
};
