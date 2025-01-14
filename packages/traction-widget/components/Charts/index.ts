import { withInstall } from '../_util/withInstall';
import Charts from './Charts.vue';

import type { SFCWithInstall } from '../_util/interface';

type ChartsType = SFCWithInstall<typeof Charts>;
export const BCharts = withInstall<ChartsType>(Charts as ChartsType);

export default BCharts;
