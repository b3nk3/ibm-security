/**
 * @file Important Content Area (ICA).
 * @copyright IBM Security 2019
 */

import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import 'numeral/locales';

import isDevelopment from '../../globals/env';
import { getComponentNamespace } from '../../globals/namespace';

export const namespace = getComponentNamespace('ica');

/**
 * @type {string[]} Array of accepted locales by Numeral.js.
 */
export const Locales = Object.keys(numeral.locales);

/**
 * Ensure that the format string includes a decimal space only for values that
 * are 1000 and above.
 * @param {number} value The value to evaluate.
 * @returns {string} Format string for numeral.
 */
const getFormat = value => (Math.round(value) > 999 ? '0.0a' : '0a');

/**
 * Ensure that the value includes a percentage if specified by prop,
 * or otherwise the value is properly formatted.
 * @param {boolean} percentage Whether a percent sign should be included.
 * @param {number|null} value The value to be formatted.
 * @returns {string} Formatted string.
 */
const truncateValue = (percentage, value) => {
  if (percentage)
    return (
      <div className={`${namespace}__percentage`}>
        {value}
        <sup className={`${namespace}__percentage-mark`}>%</sup>
      </div>
    );

  return value === null ? '-' : numeral(value).format(getFormat(value));
};

const ICA = ({
  label,
  total,
  value,
  className,
  locale,
  percentage,
  forceShowTotal,
  ...other
}) => {
  if (Locales.includes(locale)) {
    numeral.locale(locale);
  } else {
    if (isDevelopment()) {
      console.warn(
        `Locale "${locale}" for ICA component is not recognized. Using fallback locale "${ICA.defaultProps.locale}. For list of supported locales go to: https://github.com/carbon-design-system/ibm-security/tree/master/src/components/ICA`
      );
    }
    numeral.locale(ICA.defaultProps.locale);
  }

  const truncatedValue = truncateValue(percentage, value);
  const truncatedTotal = numeral(total).format(getFormat(total));
  const shouldDisplayof =
    (!percentage && total > value && truncatedValue !== truncatedTotal) ||
    (forceShowTotal && truncatedTotal > 0);

  return (
    <div className={`${namespace} ${className}`} {...other}>
      <h4 className={`${namespace}__label`}>{label} </h4>
      <span className={`${namespace}__value`}>{truncatedValue}</span>
      {shouldDisplayof ? (
        <span className={`${namespace}__total`}> / {truncatedTotal}</span>
      ) : null}
    </div>
  );
};

ICA.propTypes = {
  /**
   * Text label for ICA.
   * @type string
   */
  label: PropTypes.string.isRequired,

  /**
   * The main ICA value to display
   * @type number
   */
  value: PropTypes.number,

  /**
   * Total value that the main ICA value is a subset of.
   * @type number
   */
  total: PropTypes.number,

  /**
   * Optional class name.
   * @type number
   */
  className: PropTypes.string,

  /**
   * Locale value to determine approach to formatting numbers.
   * @type string
   */
  locale: PropTypes.oneOf(Locales),

  /**
   * Format number to percentage when `percentage` prop is true.
   * @type bool
   */
  percentage: PropTypes.bool,

  /**
   * Display the `total` even when the `value` is equal to
   * the `total` when `forceShowTotal` prop is true on the
   * condition that the `total` is greater than 0.
   * @type bool
   */
  forceShowTotal: PropTypes.bool,
};

ICA.defaultProps = {
  total: 0,
  className: '',
  locale: 'en',
  percentage: false,
  value: null,
  forceShowTotal: false,
};

export default ICA;
