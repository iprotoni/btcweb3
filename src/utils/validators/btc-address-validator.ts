import validate, { getAddressInfo } from 'bitcoin-address-validation';
import * as yup from 'yup';

import { SUPPORTED_BTC_ADDRESS_FORMATS } from '@constants/app';

interface Args {
  network: string;

  /**
   * Whether the chain has moved on from Period 1, as described in
   * https://docs.hiro.so/stacks-2.1-upgrades#pox-2-periods
   */
  isPostPeriod1: boolean; // TODO
}
export function createBtcAddressSchema({ network /*, isPostPeriod1 */ }: Args) {
  return yup
    .string()
    .defined(`Enter the BTC address where you'd like to recieve your rewards`)
    .test({
      name: 'btc-address',
      message: `The BTC address you've entered is not valid`,
      test(value: unknown) {
        if (value === null || value === undefined) return false;
        if (typeof value !== 'string') return false;
        const isValid = validate(value);
        if (!isValid) return this.createError({ message: 'Invalid BTC address' });
        const validationReport = getAddressInfo(value);
        if (!validationReport) return this.createError({ message: 'Invalid BTC address' });
        if (network === 'mainnet' && validationReport.network === 'testnet') {
          return this.createError({
            message: 'Testnet addresses not supported on Mainnet',
          });
        }
        if (network === 'testnet' && validationReport.network === 'mainnet') {
          return this.createError({
            message: 'Mainnet addresses not supported on Testnet',
          });
        }
        if (
          !SUPPORTED_BTC_ADDRESS_FORMATS.includes(
            // TODO: check that all address types are properly supported
            validationReport.type as (typeof SUPPORTED_BTC_ADDRESS_FORMATS)[number]
          )
        ) {
          return this.createError({ message: 'Unsupported BTC address type' });
        }
        return true;
      },
    });
}
