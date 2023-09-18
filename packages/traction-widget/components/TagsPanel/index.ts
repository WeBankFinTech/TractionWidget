import { withInstall } from '../_util/withInstall';
import TagsPanel from './TagsPanel.vue';

import type { SFCWithInstall } from '../_util/interface';

type TagsPanelType = SFCWithInstall<typeof TagsPanel>;
export const BTagsPanel = withInstall<TagsPanelType>(TagsPanel as TagsPanelType);

export default BTagsPanel;
