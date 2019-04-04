import {StackActions,NavigationActions} from 'react-navigation'

export default class NavigatorUtil {
    /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation) {
        navigation.goBack();
    }

    /**
     * 跳转到仓库详情页
     */
    static goToRepositoryDetail(params) {
        const {navigation, projectModel, flag, theme, onUpdateFavorite} = params;
        navigation.navigate("RepositoryDetail", {
            navigation: navigation,
            projectModel: projectModel,
            flag: flag,
            theme: theme,
            onUpdateFavorite: onUpdateFavorite
        })
    }
    /**
     * 跳转引导页
     * @param {*} params 
     */
    static resetToGuidePage(params){
        const {navigation,theme}=params;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "GuidePage",
                    params: {
                        navigation:navigation,
                        theme:theme
                    }
                })
            ]
        });
        navigation.dispatch(resetAction);
    }

    /**
     * 跳转首页
     */
    static resetToHomePage(params) {
        const {navigation, theme, selectedTab,paramsFlag} = params;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "TabPage",
                    params: {
                        theme: theme,
                        selectedTab: selectedTab,
                        paramsFlag:paramsFlag
                    }
                })
            ]
        });
        navigation.dispatch(resetAction);
    }

    /**
     * 跳转到搜索页面
     * @param params
     */
    static goToSearchPage(params) {
        const {navigation, theme} = params;
        navigation.navigate("SearchPage", {
            navigation: navigation,
            theme: theme
        })
    }

    /**
     * 跳转到菜单详情页
     * @param params
     * @param routeName
     */
    static goToMenuPage(params, routeName) {
        const {navigation} = params;
        navigation.navigate(
            routeName,
            {
                ...params
            }
        )
    }
}