import { withInstall } from '../_util/withInstall';
import PageLoading from './pageLoading.vue';

import type { SFCWithInstall } from '../_util/interface';

type PageLoadingType = SFCWithInstall<typeof PageLoading>;
export const BPageLoading = withInstall<PageLoadingType>(PageLoading as PageLoadingType);

export default BPageLoading;
