import optionsTemplate from './options_template.html';
import Timeline_hotels_without_indicators_Visualization from './Timeline_hotels_without_indicators_Visualization';
import { RequestHandlerProvider } from './RequestHandlerProvider';
import { handleResponse } from './ResponseHandlerProvider';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

function Timeline_hotels_without_indicators_Provider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const requestHandler = Private(RequestHandlerProvider);

  return VisFactory.createBaseVisualization({
    name: 'Timeline_hotels_without_indicators_',
    title: 'Timeline_hotels_without_indicators_',
    icon: 'fa fa-clock-o',
    description: 'Timeline_hotels_without_indicators_',
    category: CATEGORY.OTHER,
    visualization: Timeline_hotels_without_indicators_Visualization,
    responseHandler: handleResponse,
    requestHandler: requestHandler.handle,
    visConfig: {
      defaults: {
        sessionField: 'session.keyword',
        actionField: 'message',
        timeField: 'timestamp',
        maxSessionCount: 10,
        maxSessionLength: 20,
        index: 'user_study_5'
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate
    }
  });
}
VisTypesRegistryProvider.register(Timeline_hotels_without_indicators_Provider);