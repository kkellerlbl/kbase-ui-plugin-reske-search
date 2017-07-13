define([
    'knockout-plus',
    'kb_common/html',
    '../common',
    'bootstrap',
    'css!font_awesome'
], function (
    ko,
    html,
    common
) {
    'use strict';

    var t = html.tag,
        a = t('a'),
        span = t('span'),
        div = t('div'),
        table = t('table'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    function viewModel(params) {
        function doOpenNarrative(data) {
            var url = '/narrative/' + data.item.meta.narrativeId;
            window.open(url, '_blank');
        }

        function doOpenDataview(data) {
            var url = '#dataview/' + data.item.meta.ids.dataviewId;
            window.open(url, '_blank');
        }

        function doKeep(data) {
            console.log('keeping...', data);
        }

        return {
            item: params.item,
            doOpenNarrative: doOpenNarrative,
            doOpenDataview: doOpenDataview,
            doKeep: doKeep
        };
    }

    function template() {
        return div({
            class: 'component-reske-genome-browse -row'
        }, [
            div([
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '5%',
                    },
                    class: '-field -resultNumber'
                }, span({
                    dataBind: {
                        text: 'item.meta.resultNumber'
                    }
                })),
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '70%'
                    }
                }, [
                    div({
                        class: '-title'
                    }, [
                        common.buildTypeIcon(),
                        a({
                            dataBind: {
                                attr: {
                                    href: '"#dataview/" + item.meta.ids.dataviewId'
                                },
                                text: 'item.genome.title'
                            },
                            target: '_blank',
                            style: {
                                verticalAlign: 'middle',
                                marginLeft: '4px'
                            }
                        })
                    ]),
                    common.buildMetaInfo(),
                    table({
                        class: '-table '
                    }, [
                        tr([
                            th('Scientific name'),
                            td({
                                dataBind: {
                                    text: 'item.genome.scientificName'
                                },
                                class: '-scientific-name'
                            })
                        ]),
                        tr([
                            th('Taxonomy'),
                            td(div({
                                class: '-taxonomy',
                                dataBind: {
                                    foreach: 'item.genome.taxonomy'
                                }
                            }, span([
                                span({
                                    dataBind: {
                                        text: '$data'
                                    }
                                }),
                                '<!-- ko if: $index() < $parent.item.genome.taxonomy.length - 1 -->',
                                span({
                                    class: 'fa fa-angle-right',
                                    style: {
                                        margin: '0 4px'
                                    }
                                }),
                                '<!-- /ko -->'
                            ])))
                        ]),
                        tr([
                            th('Features '),
                            td(div({
                                dataBind: {
                                    html: 'item.genome.featureCount.formatted'
                                },
                                class: '-feature-count'
                            }))
                        ])
                    ])
                ]),
                div({
                    style: {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        width: '25%',
                        textAlign: 'right'
                    }
                }, div({
                    class: '-features'
                }, [
                    common.buildSharingInfo(),
                    common.buildActions()
                ]))
            ])
        ]);
    }

    function component() {
        return {
            viewModel: viewModel,
            template: template()
        };
    }

    ko.components.register('reske/genome/browse', component());
});