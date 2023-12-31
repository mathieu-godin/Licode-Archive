import * as React from 'react';
import { Button, Typography } from '@mui/material';
import ProductHeroLayout from './ProductHeroLayout';
import backgroundImage from '../images/CodeEditorPreview.png';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'bottom',
        backgroundSize: 'cover'
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="welcomeTitle">
        Adversarial Programming
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="welcomeSubtitle"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Skip test cases, get a sneak peak of your opponent's code and even slow them down!
      </Typography>
    </ProductHeroLayout>
  );
}