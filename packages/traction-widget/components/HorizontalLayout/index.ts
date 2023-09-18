import { withInstall } from '../_util/withInstall';
import HorizontalLayout from './HorizontalLayout.vue';

import type { SFCWithInstall } from '../_util/interface';

type HorizontalLayoutType = SFCWithInstall<typeof HorizontalLayout>;
export const BHorizontalLayout = withInstall<HorizontalLayoutType>(HorizontalLayout as HorizontalLayoutType);

export default BHorizontalLayout;
