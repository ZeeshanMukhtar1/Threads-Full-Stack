import { atom } from 'recoil';

export const postsAtom = atom({
  key: 'postsAtom',
  default: [],
});

export default postsAtom;
