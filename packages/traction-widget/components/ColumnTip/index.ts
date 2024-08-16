import { withInstall } from '../_util/withInstall';
import ColumnTip from './ColumnTip.vue';

import type { SFCWithInstall } from '../_util/interface';

type ColumnTipType = SFCWithInstall<typeof ColumnTip>;
export const BColumnTip = withInstall<ColumnTipType>(ColumnTip as ColumnTipType);

export default BColumnTip;
