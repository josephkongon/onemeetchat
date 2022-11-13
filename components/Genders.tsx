import React, { FC } from 'react';
import {
  BsGenderMale,
  BsGenderFemale,
  BsGenderAmbiguous,
} from 'react-icons/bs';

const Genders: FC<typeGender> = ({ gender }) => {
  if (gender === 'Male') return <BsGenderMale size={20} color='blue' />;
  if (gender === 'Female') return <BsGenderFemale size={20} color='pink' />;
  if (gender === 'Couple')
    return <BsGenderAmbiguous size={20} color='orange' />;
  return <></>;
};
export { Genders };

interface typeGender {
  gender: string;
}
