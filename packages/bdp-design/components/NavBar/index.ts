import { withInstall } from '../_util/withInstall';
import NavBar from './NavBar.vue';

import type { SFCWithInstall } from '../_util/interface';

type NavBarType = SFCWithInstall<typeof NavBar>;
export const BNavBar = withInstall<NavBarType>(NavBar as NavBarType);

export default BNavBar;
