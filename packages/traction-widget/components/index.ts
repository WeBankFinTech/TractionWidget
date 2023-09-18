import { BTagsPanel } from './TagsPanel';
import { BTableHeaderConfig } from './TableHeaderConfig';
import { BPageLoading } from './PageLoading';
import { BTagSelector } from './TagSelector';
import { getUrlParams, formatterEmptyValue, isIE, validate, dynamicFormOperate } from './utils';
import { BHorizontalLayout } from './HorizontalLayout';
import { BVerticalLayout } from './VerticalLayout';
import { BSearch } from './Search';
import { BTablePage } from './TablePage';
import { BNavBar } from './NavBar';

const components = [
    BTagsPanel,
    BTableHeaderConfig,
    BTagSelector,
    BHorizontalLayout,
    BVerticalLayout,
    BSearch,
    BTablePage,
    BNavBar
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
    dynamicFormOperate,
    BTagsPanel,
    BTableHeaderConfig,
    BTagSelector,
    BPageLoading,
    BHorizontalLayout,
    BVerticalLayout,
    BSearch,
    BTablePage,
    BNavBar
};

export default {
    install,
    isIE,
    getUrlParams,
    formatterEmptyValue,
    validate,
    dynamicFormOperate,
    BTagsPanel,
    BTableHeaderConfig,
    BTagSelector,
    BPageLoading,
    BHorizontalLayout,
    BVerticalLayout,
    BSearch,
    BTablePage,
    BNavBar
};
