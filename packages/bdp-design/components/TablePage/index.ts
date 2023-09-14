import { withInstall } from '../_util/withInstall';
import TablePage from './TablePage.vue';

import type { SFCWithInstall } from '../_util/interface';

type TablePageType = SFCWithInstall<typeof TablePage>;
export const BTablePage = withInstall<TablePageType>(TablePage as TablePageType);

export default BTablePage;
