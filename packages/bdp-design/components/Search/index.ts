import { withInstall } from '../_util/withInstall';
import Search from './Search.vue';

import type { SFCWithInstall } from '../_util/interface';

type SearchType = SFCWithInstall<typeof Search>;
export const BSearch = withInstall<SearchType>(Search as SearchType);

export default BSearch;
