'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Quizly</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Eingeben zur Suche"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Los geht&#x27;s</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Übersicht
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Abhängigkeiten
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-8d692ec85f0eda3687cbb45d3addfdda"' : 'data-target="#xs-components-links-module-AppModule-8d692ec85f0eda3687cbb45d3addfdda"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-8d692ec85f0eda3687cbb45d3addfdda"' :
                                            'id="xs-components-links-module-AppModule-8d692ec85f0eda3687cbb45d3addfdda"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CreatorsPageModule.html" data-type="entity-link">CreatorsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CreatorsPageModule-24dffe69240fd7e8bf13b79df0fc723b"' : 'data-target="#xs-components-links-module-CreatorsPageModule-24dffe69240fd7e8bf13b79df0fc723b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CreatorsPageModule-24dffe69240fd7e8bf13b79df0fc723b"' :
                                            'id="xs-components-links-module-CreatorsPageModule-24dffe69240fd7e8bf13b79df0fc723b"' }>
                                            <li class="link">
                                                <a href="components/CreatorsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreatorsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreatorsPageRoutingModule.html" data-type="entity-link">CreatorsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DetailPageModule.html" data-type="entity-link">DetailPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DetailPageModule-5275da52ab5438703cf48371b01b2867"' : 'data-target="#xs-components-links-module-DetailPageModule-5275da52ab5438703cf48371b01b2867"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DetailPageModule-5275da52ab5438703cf48371b01b2867"' :
                                            'id="xs-components-links-module-DetailPageModule-5275da52ab5438703cf48371b01b2867"' }>
                                            <li class="link">
                                                <a href="components/DetailPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DetailPageModule.html" data-type="entity-link">DetailPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DetailPageModule-5275da52ab5438703cf48371b01b2867-1"' : 'data-target="#xs-components-links-module-DetailPageModule-5275da52ab5438703cf48371b01b2867-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DetailPageModule-5275da52ab5438703cf48371b01b2867-1"' :
                                            'id="xs-components-links-module-DetailPageModule-5275da52ab5438703cf48371b01b2867-1"' }>
                                            <li class="link">
                                                <a href="components/DetailPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DetailPageRoutingModule.html" data-type="entity-link">DetailPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DetailPageRoutingModule.html" data-type="entity-link">DetailPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EndPageModule.html" data-type="entity-link">EndPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EndPageModule-39a07cec057705a71489e7218074569a"' : 'data-target="#xs-components-links-module-EndPageModule-39a07cec057705a71489e7218074569a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EndPageModule-39a07cec057705a71489e7218074569a"' :
                                            'id="xs-components-links-module-EndPageModule-39a07cec057705a71489e7218074569a"' }>
                                            <li class="link">
                                                <a href="components/EndPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EndPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EndPageRoutingModule.html" data-type="entity-link">EndPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IndexPageModule.html" data-type="entity-link">IndexPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IndexPageModule-c5e496b799c3eb2bcc5be59ad6aac1e7"' : 'data-target="#xs-components-links-module-IndexPageModule-c5e496b799c3eb2bcc5be59ad6aac1e7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IndexPageModule-c5e496b799c3eb2bcc5be59ad6aac1e7"' :
                                            'id="xs-components-links-module-IndexPageModule-c5e496b799c3eb2bcc5be59ad6aac1e7"' }>
                                            <li class="link">
                                                <a href="components/IndexPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IndexPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndexPageModule.html" data-type="entity-link">IndexPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IndexPageModule-c5e496b799c3eb2bcc5be59ad6aac1e7-1"' : 'data-target="#xs-components-links-module-IndexPageModule-c5e496b799c3eb2bcc5be59ad6aac1e7-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IndexPageModule-c5e496b799c3eb2bcc5be59ad6aac1e7-1"' :
                                            'id="xs-components-links-module-IndexPageModule-c5e496b799c3eb2bcc5be59ad6aac1e7-1"' }>
                                            <li class="link">
                                                <a href="components/IndexPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IndexPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndexPageRoutingModule.html" data-type="entity-link">IndexPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IndexPageRoutingModule.html" data-type="entity-link">IndexPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link">LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-7eaa1484e3471e6cee0c029adf093ff3"' : 'data-target="#xs-components-links-module-LoginPageModule-7eaa1484e3471e6cee0c029adf093ff3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-7eaa1484e3471e6cee0c029adf093ff3"' :
                                            'id="xs-components-links-module-LoginPageModule-7eaa1484e3471e6cee0c029adf093ff3"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link">LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MemberRoutingModule.html" data-type="entity-link">MemberRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SigninPageModule.html" data-type="entity-link">SigninPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SigninPageModule-30afa4e76fbe93accd48f373aa42e7a1"' : 'data-target="#xs-components-links-module-SigninPageModule-30afa4e76fbe93accd48f373aa42e7a1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SigninPageModule-30afa4e76fbe93accd48f373aa42e7a1"' :
                                            'id="xs-components-links-module-SigninPageModule-30afa4e76fbe93accd48f373aa42e7a1"' }>
                                            <li class="link">
                                                <a href="components/SigninPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SigninPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SigninPageRoutingModule.html" data-type="entity-link">SigninPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link">TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsPageModule-366f646c0c44c8d629cc1542f7cbf4b3"' : 'data-target="#xs-components-links-module-TabsPageModule-366f646c0c44c8d629cc1542f7cbf4b3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-366f646c0c44c8d629cc1542f7cbf4b3"' :
                                            'id="xs-components-links-module-TabsPageModule-366f646c0c44c8d629cc1542f7cbf4b3"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link">TabsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/DetailPage-1.html" data-type="entity-link">DetailPage</a>
                            </li>
                            <li class="link">
                                <a href="components/IndexPage-1.html" data-type="entity-link">IndexPage</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Klassen</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link">MessageService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Verschiedenes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variablen</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Dokumentation Abdeckung</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Dokumentation generiert mit <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});