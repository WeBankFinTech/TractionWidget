import { withInstall } from '../_util/withInstall';
import VerticalLayout from './VerticalLayout.vue';

import type { SFCWithInstall } from '../_util/interface';

type VerticalLayoutType = SFCWithInstall<typeof VerticalLayout>;
export const BVerticalLayout = withInstall<VerticalLayoutType>(VerticalLayout as VerticalLayoutType);

export default BVerticalLayout;
