import React from 'react';

import Home from './home/Home';
import { trackPage } from '../src/common/tracking';

export default function MainHome() {
  trackPage('Home');
  return <Home/>;
}
