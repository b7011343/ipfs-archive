import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';


export const StyledLink = ({ to, colorHex, ...rest }) => {
  const LinkWithCss = styled(Link, {
    shouldForwardProp: true
  })({
    textDecoration: 'none',
    color: colorHex ? colorHex : 'initial',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
      color: colorHex ? colorHex : 'initial',
    }
  });

  return (
    <LinkWithCss {...rest} to={to} />
  );
};
