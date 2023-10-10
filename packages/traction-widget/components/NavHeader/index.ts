import { withInstall } from '../_util/withInstall';
import NavHeader from './NavHeader.vue';

import type { SFCWithInstall } from '../_util/interface';

type NavHeaderType = SFCWithInstall<typeof NavHeader>;
export const BNavHeader = withInstall<NavHeaderType>(NavHeader as NavHeaderType);

export default BNavHeader;
