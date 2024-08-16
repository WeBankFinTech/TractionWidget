import { withInstall } from '../_util/withInstall';
import MetricTip from './MetricTip.vue';

import type { SFCWithInstall } from '../_util/interface';

type MetricTipType = SFCWithInstall<typeof MetricTip>;
export const BMetricTip = withInstall<MetricTipType>(MetricTip as MetricTipType);

export default BMetricTip;
