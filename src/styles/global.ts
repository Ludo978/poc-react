import { css } from '@emotion/react';

const Medias = {
  large: 1679,
  desktop: 1439,
  medium: 1199,
  tablet: 991,
  mobile: 767,
  phone: 575,
};
export const media = (mix) => `@media all and (max-width: ${Medias[mix] || mix}px)`;

export const minMedia = (mix) => `@media all and (min-width: ${(Medias[mix] || mix) + 1}px)`;

const Variables = `
--color-black: #000000;
--color-brand-blue: #00C3D9;
--color-dark-green: #045863;
--color-footer-blue : #03B9CE;
--color-green : #32CD32;
--color-yellow : #FFD357;
--color-red : #FF776A;
--color-grey : #E6EDF0;
--color-white: #FFFFFF;

--xsmall: 4px;
--small: 8px;
--normal: 16px;
--large: 24px;
--xlarge: 32px;
`;

export default css`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline: 0;
  }
  html {
  min-height: 100%;
}
  body {
    -webkit-font-smoothing: antialiased;
    -webkit-overflow-scrolling: touch;
    min-height: 100%;
    overflow-x: hidden;
  }
  body, input, textarea, select, button {
    font-family: "Work Sans";
    transition: all .2s;
  }
  ul {
    list-style: none;
  }

  /* Variables */
  :root {
    ${Variables}
  }

   /* Color and Typography */
  body {
    color: var(--color-black);
    font-size: 14px;
    font-weight: normal;
  }
  
  h1 {
    font-size: 40px;
    font-weight: 400;
  }

  h2 {
    font-size: 20px;
    font-weight: bold;
  }

  h3 {
    font-size: 18px;
    font-weight: normal;
  }

  h4 {
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
  }

  h5 {
    font-size: 14px;
    line-height: 16px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.5);
  }
`;
