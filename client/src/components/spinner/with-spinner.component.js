import React from 'react';
import Spinner from './spinner.component';

const WithSpinner = (WrappedComponent) => ({isLoading, ...otherProps} ) =
  isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;

export default WithSpinner;
