import { IconEdit } from '@tabler/icons-react';

import { MIN_DELEGATED_STACKING_AMOUNT_USTX } from '@constants/app';

import { PayoutMethod, Pool, PoolName, Pox2Contracts } from '../types-preset-pools';
import { PoolIcon } from './pool-icon';

export const pools: { [key in PoolName]: Pool } = {
  'FAST Pool': {
    name: PoolName.FastPool,
    description:
      'Enjoy automatic pool operations.' +
      ' ' +
      'You can increase the locking amount for the next cycle.' +
      ' ' +
      'Locked STX will unlock 1 day after the end of the cycle.',
    duration: 1,
    website: 'https://pool.friedger.de',
    payoutMethod: PayoutMethod.STX,
    poolAddress: Pox2Contracts.WrapperFastPool, // pool address is the same as pool contract
    poxContract: Pox2Contracts.WrapperFastPool,
    minimumDelegationAmount: 40_000_000,
    icon: <PoolIcon src="/32x32_FastPool.png" />,
    allowCustomRewardAddress: false,
  },

  PlanBetter: {
    name: PoolName.PlanBetter,
    description: 'Earn non-custodial Bitcoin yield. No wrapped tokens. Native BTC.',
    duration: 1,
    website: 'https://planbetter.org',
    payoutMethod: PayoutMethod.BTC,
    poolAddress: 'SP3TDKYYRTYFE32N19484838WEJ25GX40Z24GECPZ',
    poxContract: Pox2Contracts.WrapperOneCycle,
    minimumDelegationAmount: 200_000_000,
    icon: <PoolIcon src="/32x32_PlanBetter.png" />,
    allowCustomRewardAddress: false, // only for ledger users
  },

  Xverse: {
    name: PoolName.Xverse,
    description:
      'Xverse pool is a non-custodial stacking pool service from the makers of Xverse wallet.',
    duration: 1,
    website: 'https://pool.xverse.app/',
    payoutMethod: PayoutMethod.BTC,
    poolAddress: 'SPXVRSEH2BKSXAEJ00F1BY562P45D5ERPSKR4Q33',
    poxContract: Pox2Contracts.WrapperOneCycle,
    minimumDelegationAmount: 100_000_000,
    icon: <PoolIcon src="/32x32_Xverse.png" />,
    allowCustomRewardAddress: true,
  },
  'Custom Pool': {
    name: PoolName.CustomPool,
    description:
      'Enter the STX address of the pool with which you’d like to Stack without your STX leaving your wallet.',
    duration: -1,
    website: 'https://www.stacks.co/learn/stacking',
    payoutMethod: PayoutMethod.OTHER,
    poolAddress: undefined,
    poxContract: Pox2Contracts.PoX2,
    minimumDelegationAmount: MIN_DELEGATED_STACKING_AMOUNT_USTX,
    icon: <IconEdit />,
    allowCustomRewardAddress: false,
  },
};
