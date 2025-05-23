import { BTagsPanel } from './TagsPanel';
import { BTableHeaderConfig } from './TableHeaderConfig';
import { BPageLoading } from './PageLoading';
import { BTagSelector } from './TagSelector';
import { getUrlParams, formatterEmptyValue, isIE, validate, dynamicFormOperate, format } from './utils';
import { BHorizontalLayout } from './HorizontalLayout';
import { BVerticalLayout } from './VerticalLayout';
import { BSearch } from './Search';
import { BTablePage } from './TablePage';
import { BNavBar } from './NavBar';
import { BNavHeader } from './NavHeader';
import { BMetricTip } from './MetricTip';
import { BCharts } from './Charts';
import { BDashboard } from './Dashboard';

const components = [
    BTagsPanel,
    BTableHeaderConfig,
    BTagSelector,
    BHorizontalLayout,
    BVerticalLayout,
    BSearch,
    BTablePage,
    BNavBar,
    BNavHeader,
    BMetricTip,
    BCharts,
    BDashboard
];

const install = (app: any): any => {
    components.forEach((component) => {
        app.use(component);
    });
    return app;
};

export {
    install,
    isIE,
    getUrlParams,
    formatterEmptyValue,
    validate,
    format,
    dynamicFormOperate,
    BTagsPanel,
    BTableHeaderConfig,
    BTagSelector,
    BPageLoading,
    BHorizontalLayout,
    BVerticalLayout,
    BSearch,
    BTablePage,
    BNavBar,
    BNavHeader,
    BMetricTip,
    BCharts,
    BDashboard
};

export default {
    install,
    isIE,
    getUrlParams,
    formatterEmptyValue,
    validate,
    format,
    dynamicFormOperate,
    BTagsPanel,
    BTableHeaderConfig,
    BTagSelector,
    BPageLoading,
    BHorizontalLayout,
    BVerticalLayout,
    BSearch,
    BTablePage,
    BNavBar,
    BNavHeader,
    BMetricTip,
    BCharts,
    BDashboard
};
