import { withInstall } from '../_util/withInstall';
import Dashboard from './Dashboard.vue';

import type { SFCWithInstall } from '../_util/interface';

type DashboardType = SFCWithInstall<typeof Dashboard>;
export const BDashboard = withInstall<DashboardType>(Dashboard as DashboardType);

export default BDashboard;
