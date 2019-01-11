import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { CATEGORY } from 'ui/vis/vis_category';
import { Schemas, VisSchemasProvider } from 'ui/vis/editors/default/schemas';

import { CohortVisualizationProvider } from './cohort_visualization';

import './cohort.less';
import optionsTemplate from './options_template.html'; // in leer aber kann man nicht löschen

export default function CohortTypeProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const _Schemas = Schemas || Private(VisSchemasProvider);

  return VisFactory.createBaseVisualization({
    name: 'cohort',
    title: 'Cohort Analysis',
    icon: 'fa-user',
    description: 'Cohort analysis plugin',
    category: CATEGORY.OTHER,
    visualization: Private(CohortVisualizationProvider),
    visConfig: {
      defaults: {
        index: 'user_study_5',
        sessionField: 'session.keyword',
        timeField: 'timestamp',
        geoField: 'map_center',
        scaleField: 'map_scale',
        actionField: 'message.keyword',
        actionValue: 'map-init CENTER_CHANGED',
        maxSessionLength: 100,
        maxSessionCount: 100
      },
    },
    hierarchicalData: true,
    responseHandler: 'none',
    editorConfig: {
      optionsTemplate: optionsTemplate,
      schemas: new _Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Total',
          max: 1,
          min: 1,
          aggFilter: ['count', 'sum', 'avg'],
          defaults: [
            { type: 'count', schema: 'metric' },
          ],
        }, {
          group: 'buckets',
          name: 'cohort_date',
          title: 'Cohort Date',
          min: 1,
          max: 1,
          aggFilter: ['date_histogram', 'terms'],
          defaults: [
            {
              type: 'date_histogram', schema: 'cohort_date', params: {
                interval: 'M',
                orderBy: '_term',
              },
            },
          ],
        }, {
          group: 'buckets',
          name: 'cohort_period',
          title: 'Cohort Period',
          min: 1,
          max: 1,
          aggFilter: 'histogram',
          defaults: [
            {
              type: 'histogram', schema: 'cohort_period', params: {
                interval: 1,
              },
            },
          ],
        },
      ]),
    },
  });
}

VisTypesRegistryProvider.register(CohortTypeProvider);
