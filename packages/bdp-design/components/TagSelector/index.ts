import { withInstall } from '../_util/withInstall';
import TagSelector from './TagSelector.vue';

import type { SFCWithInstall } from '../_util/interface';

type TagSelectorType = SFCWithInstall<typeof TagSelector>;
export const BTagSelector = withInstall<TagSelectorType>(TagSelector as TagSelectorType);

export default BTagSelector;
