import { withInstall } from '../_util/withInstall';
import TableHeaderConfig from './TableHeaderConfig.vue';

import type { SFCWithInstall } from '../_util/interface';

type TableHeaderConfigType = SFCWithInstall<typeof TableHeaderConfig>;
export const BTableHeaderConfig = withInstall<TableHeaderConfigType>(TableHeaderConfig as TableHeaderConfigType);

export default BTableHeaderConfig;
